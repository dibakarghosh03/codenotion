const SubSection = require("../models/SubSection.model");
const Section = require("../models/Section.model");
const {uploadToCloudinary} = require("../utils/imageUploader");
const {deleteFromCloudinary} = require("../utils/deleteImage");
require("dotenv").config();

exports.createSubSection = async (req, res) => {
    try {
        const {title, description, sectionId} = req.body;
        const video = req.files.video;

        if(!title || !sectionId || !video || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const uploadDetails = await uploadToCloudinary(video, process.env.FOLDER_NAME);

        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration}s`,
            description: description,
            videoUrl: uploadDetails.secure_url
        });

        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},
            {
                $push: {
                    subSection: subSectionDetails._id,
                }
            },
            {new: true}
        ).populate("subSection").exec();

        return res.status(200).json({
            success: true,
            message: "Subsection created successfully",
            updatedSection,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating subsection",
            error: error.message
        });
    }
}


exports.updateSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId, title, description } = req.body
        const subSection = await SubSection.findById(subSectionId)
    
        if (!subSection) {
            return res.status(404).json({
            success: false,
            message: "SubSection not found",
            })
        }
    
        if (title !== undefined) {
            subSection.title = title
        }
    
        if (description !== undefined) {
            subSection.description = description
        }
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            await deleteFromCloudinary(subSection.videoUrl)
            const uploadDetails = await uploadToCloudinary(
            video,
            process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}s`
        }
    
        await subSection.save();
        const section = await Section.findById(sectionId).populate("subSection").exec()

    
        return res.json({
            success: true,
            message: "Section updated successfully",
            data: section
        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section",
        });
    }
}


exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body
        const section = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            },
            { new: true }
        ).populate("subSection").exec();
        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
        await deleteFromCloudinary(subSection.videoUrl)
    
        if (!subSection) {
            return res
            .status(404)
            .json({ success: false, message: "SubSection not found" })
        }
    
        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
            data: section
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the SubSection",
        })
    }
}