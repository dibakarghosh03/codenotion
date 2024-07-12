const Course = require("../models/Course.model");
const Category = require("../models/Category.model");
const User = require("../models/User.model");
const CourseProgress = require("../models/CourseProgress.model")
const {uploadToCloudinary} = require("../utils/imageUploader");
const {deleteFromCloudinary} = require("../utils/deleteImage");
const {deleteSection} = require("./utility.controller");
const { convertSecondsToDuration } = require("../utils/secToDuration")
require("dotenv").config();


exports.createCourse = async (req, res) => {
	try {
		// Get user ID from request object
		const userId = req.user.id;

		// Get all required fields from request body
		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
		} = req.body;

		// Get thumbnail image from request files
		const thumbnail = req.files.thumbnailImage;

		// Check if any of the required fields are missing
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail ||
			!category
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		if (!status || status === undefined) {
			status = "Draft";
		}
		// Check if the user is an instructor
		const instructorDetails = await User.findById(userId, {
			accountType: "instructor",
		});

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}

		// Check if the tag given is valid
		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}
		// Upload the Thumbnail to Cloudinary
		const thumbnailImage = await uploadToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);
		// Create a new course with the given details
		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});

		// Add the new course to the User Schema of the Instructor
		await User.findByIdAndUpdate(
			{
				_id: instructorDetails._id,
			},
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		// Add the new course to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		// Return the new course and a success message
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
	} catch (error) {
		// Handle any errors that occur during the creation of the course
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
	}
};


exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({},{
            courseName: true,
            price: true,
            instructor: true,
            thumbnail: true
        }).populate("instructor").exec();

        return res.status(200).json({
            success: true,
            message: "All courses fetched successfully",
            data: allCourses
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch all courses"
        });
    }
}


exports.getCourseDetails = async (req, res) => {
    try {
            //get id
            const {courseId} = req.body;
            //find course details
            const courseDetails = await Course.findOne(
                                        {_id:courseId})
                                        .populate(
                                            {
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails",
                                                },
                                            }
                                        )
                                        .populate("category")
                                        .populate({
											path:"courseContent",
											populate: {
												path:"subSection",
												select:"-videoUrl",
											}
										})
										.populate("ratingAndReview")
                                        .exec();


                //validation
                if(!courseDetails) {
                    return res.status(400).json({
                        success:false,
                        message:`Could not find the course with ${courseId}`,
                    });
                }


				let totalDurationInSeconds = 0
				courseDetails.courseContent.forEach((content) => {
				content.subSection.forEach((subSection) => {
					const timeDurationInSeconds = parseInt(subSection.timeDuration)
					totalDurationInSeconds += timeDurationInSeconds
				})
				})

    			const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

                //return response
                return res.status(200).json({
                    success:true,
                    message:"Course Details fetched successfully",
                    data:{
						courseDetails,
						timeDuration:totalDuration
					},
                });

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.getFullCourseDetails = async (req, res) => {
	try {
		const { courseId } = req.body
		const userId = req.user.id
		const courseDetails = await Course.findOne({
			_id: courseId,
		})
		.populate({
			path: "instructor",
			populate: {
				path: "additionalDetails",
			},
		})
		.populate("category")
		.populate("ratingAndReview")
		.populate({
			path: "courseContent",
			populate: {
				path: "subSection",
			},
		})
		.exec()
  
		let courseProgressCount = await CourseProgress.findOne({
			courseId: courseId,
			userId: userId,
		})
  
	
		if (!courseDetails) {
			return res.status(400).json({
			success: false,
			message: `Could not find course with id: ${courseId}`,
			})
		}
  
	  // if (courseDetails.status === "Draft") {
	  //   return res.status(403).json({
	  //     success: false,
	  //     message: `Accessing a draft course is forbidden`,
	  //   });
	  // }
  
		let totalDurationInSeconds = 0
		courseDetails.courseContent.forEach((content) => {
			content.subSection.forEach((subSection) => {
			const timeDurationInSeconds = parseInt(subSection.timeDuration)
			totalDurationInSeconds += timeDurationInSeconds
			})
		})
  
		const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
	
		return res.status(200).json({
			success: true,
			data: {
			courseDetails,
			totalDuration,
			completedVideos: courseProgressCount?.completedVideos
				? courseProgressCount?.completedVideos
				: [],
			},
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

exports.getInstructorCourses = async (req, res) => {
	try {
	  // Get the instructor ID from the authenticated user or request body
		const instructorId = req.user.id

	  // Find all courses belonging to the instructor
		const instructorCourses = await Course.find({
			instructor: instructorId,
		}).sort({ createdAt: -1 }).populate({
			path: "courseContent",
			populate: {
				path: "subSection"
			}
		})

	  // Return the instructor's courses
		res.status(200).json({
			success: true,
			data: instructorCourses,
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({
			success: false,
			message: "Failed to retrieve instructor courses",
			error: error.message,
		})
	}
}


exports.editCourseDetails = async (req, res) => {
	try {
		const {courseId, courseName, courseDescription, price, tag, status} = req.body;
		const thumbnail = req.files?.thumbnailImage;
		const id = req.user.id;
	
		const courseDetails = await Course.findById(courseId);
		if(!courseDetails){
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}
	
		// Check if the user is an instructor
		const userDetails = await User.findById(id);
		if(!userDetails){
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		if(userDetails.accountType !== "instructor") {
			return res.status(403).json({
				success: false,
				message: "User is an Instructor"
			});
		}
		if(courseDetails.instructor.toString() !== userDetails._id.toString()) {
			return res.status(403).json({
				success: false,
				message: "User is not authorized to edit this course"
			});
		}
	
		if(courseName) {
			courseDetails.courseName = courseName;
		}
	
		if(courseDescription) {
			courseDetails.courseDescription = courseDescription;
		}
	
		if(tag) {
			courseDetails.tag.push(tag);
		}
	
		if(price) {
			courseDetails.price = price;
		}
	
		if(thumbnail) {
			const response = await uploadToCloudinary(
				thumbnail,
				process.env.FOLDER_NAME
			);
			courseDetails.thumbnail = response.secure_url;
		}
	
		if(status === "Published" || status === "Draft") {
			courseDetails.status = status;
		}
	
		await courseDetails.save();
		return res.status(200).json({
			success: true,
			message: "Course details updated successfully",
			
		});

	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to update course details",
			error: error.message
		})
	}

}


exports.deleteCourse = async (req, res) => {
	try {
		const {courseId} = req.body;
		const id = req.user.id;

		const courseDetails = await Course.findById(courseId);
		const userDetails = await User.findById(id);

		if(!courseDetails){
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}
		if(!userDetails) {
			return res.status(403).json({
				success: false,
				message: "Not authorized",
			});
		}

		if(courseDetails.instructor.toString() !== userDetails._id.toString()) {
			return res.status(403).json({
				success: false,
				message: "User is not authorized to delete this course"
			});
		}

		const cloudinaryImageUrl = courseDetails.thumbnail;
		const sections = courseDetails.courseContent;

		if(cloudinaryImageUrl) {
			await deleteFromCloudinary(cloudinaryImageUrl);
		}

		for(const section of sections) {
			await deleteSection(section);
		}

		await Course.findOneAndDelete({_id: courseId});
		await CourseProgress.find({courseId: courseId}).deleteMany();
		await User.findByIdAndUpdate(userDetails._id, {
			$pull: {
				courses: courseId
			}
		});
		

		return res.status(200).json({
			success: true,
			message: "Course deleted successfully",
		})

	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Something went wrong while deleting the course",
			error: error.message
		});
	}
}