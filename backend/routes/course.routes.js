// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    editCourseDetails,
    deleteCourse,
    getInstructorCourses
} = require("../controllers/course.controller")


// Categories Controllers Import
const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
    deleteCategory
} = require("../controllers/category.controller")

// Sections Controllers Import
const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/section.controller")

// Sub-Sections Controllers Import
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/subSection.controller")

// Rating Controllers Import
const {
    createRating,
    getAverageRating,
    getAllRating,
} = require("../controllers/ratingAndReview.controller")

// Course Progress Controllers Import
const { updateCourseProgress } = require("../controllers/courseProgress.controller")

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth.middleware")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
// Edit Course Details
router.put("/editCourseDetails",auth,isInstructor, editCourseDetails)
// Delete a Course
router.delete("/deleteCourse",auth,isInstructor, deleteCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.put("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.put("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// To Update Course Progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin

router.post("/createCategory", auth, isAdmin, createCategory)
router.post("/deleteCategory", auth, isAdmin, deleteCategory)
router.get("/showAllCategories", showAllCategories)
router.get("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router