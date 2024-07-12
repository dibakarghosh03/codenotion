const Section = require("../models/Section.model");
const Course = require("../models/Course.model");
const {deleteSubSection} = require("./utility.controller")

exports.createSection = async (req, res) => {
    try {
        const {sectionName, courseId} = req.body;

        if(!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newSection = await Section.create({sectionName});

        const updatedCourse = await Course.findByIdAndUpdate(courseId,
            {
                $push: {
                    courseContent: newSection._id,
                }
            },
            {new: true}
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            data: updatedCourse
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating section",
            error: error.message
        });
    }
}


exports.updateSection = async (req, res) => {
    try {
        const {sectionName, sectionId, courseId} = req.body;

        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new: true});
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate:{
                path: "subSection",
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            data:course,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating section",
            error: error.message
        })
    }
}


exports.deleteSection = async (req, res) => {
    try {
        const {sectionId, courseId} = req.body;
        
        const section = await Section.findOneAndDelete({_id: sectionId});
        
        const subSections = section.subSection;

        if(!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }

        for(const subSection of subSections) {
            await deleteSubSection(subSection);
        }
        const course = await Course.findByIdAndUpdate(courseId,
            {
                $pull: {
                    courseContent: sectionId
                }
            }).populate({
                path:"courseContent",
                populate: {
                    path: "subSection"
                }
            }).exec();

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            data: course
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting section",
            error: error.message
        });
    }
}