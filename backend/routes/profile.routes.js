const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middlewares/auth.middleware")
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
    instructorDashboard,
} = require("../controllers/profile.controller")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteAccount",auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
// Get instructor dashboard
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router