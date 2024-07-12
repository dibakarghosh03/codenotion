const Profile = require("../models/Profile.model");
const User = require("../models/User.model");
const Course = require("../models/Course.model");
const CourseProgress = require("../models/CourseProgress.model");
const {uploadToCloudinary} = require("../utils/imageUploader");
const { deleteFromCloudinary } = require("../utils/deleteImage");
const _ = require("lodash");
const { convertSecondsToDuration } = require("../utils/secToDuration")

exports.updateProfile = async (req, res) => {
    try {
        let {DOB="", about="", contactNumber, gender, firstName, lastName} = req.body;
        const id = req.user.id;

        if(!id || !contactNumber || !gender) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const userDetails = await User.findById(id).populate("additionalDetails");
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        profileDetails.DOB = DOB;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;

        if(firstName && lastName){
            userDetails.firstName = firstName;
            userDetails.lastName = lastName;

            await userDetails.save();
        }

        await profileDetails.save();

        const modifiedProfile = _.omit(profileDetails, ["contactNumber", "DOB"]);
        userImage = userDetails.image;

        const user = userDetails;
        user.password = undefined;

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
            userImage,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating profile",
            error: error.message
        })
    }
}


exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id);

        if(!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await Profile.findByIdAndDelete({_id : userDetails.additionalDetails});
        const user = await User.findByIdAndDelete({_id : id});
        await deleteFromCloudinary(user.image);

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting account",
            error: error.message
        });
    }
}


exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        if(!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            userDetails
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching profile",
        });
    }
}


exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        const image = await uploadToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )

        let updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        updatedProfile.password = undefined

        return res.status(200).json({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};


exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        let userDetails = await User.findOne({
            _id: userId,
        }).populate({
            path:"courses",
            populate: {
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            }
        }).exec();

        if (!userDetails) {
            return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userDetails}`,
            })
        }

        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0
            SubsectionLength = 0
            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[
                j
                ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
                userDetails.courses[i].totalDuration = convertSecondsToDuration(
                totalDurationInSeconds
                )
                SubsectionLength +=
                userDetails.courses[i].courseContent[j].subSection.length
            }
            let courseProgressCount = await CourseProgress.findOne({
                courseId: userDetails.courses[i]._id,
                userId: userId,
            })
            courseProgressCount = courseProgressCount?.completedVideos.length
            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                Math.round(
                    (courseProgressCount / SubsectionLength) * 100 * multiplier
                ) / multiplier
            }
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.instructorDashboard = async (req, res) => {
    try {
        const userId = req.user.id;
        const courseDetails = await Course.find({instructor : userId});
        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            totalAmountEarned = totalStudentsEnrolled * course.price;

            // create a new object with additional fields
            const courseStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountEarned,
            }
            return courseStats;
        })

        return res.status(200).json({
            success: true,
            courses: courseData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}