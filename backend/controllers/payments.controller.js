const {instance} = require("../config/razorpay");
const Course = require("../models/Course.model");
const User = require("../models/User.model");
const CourseProgress = require("../models/CourseProgress.model");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const mongoose = require("mongoose");
const crypto = require("crypto");

const enrollStudent = async (userId, courses, res) => {
    if(!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide data for course and user"
        })
    }

    for (const courseId of courses) {
        try {
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {
                    $push: {
                        studentsEnrolled: userId
                    }
                },
                { new: true }
            )
    
            if(!enrolledCourse){
                return res.status(404).json({
                    success: false,
                    message: "Course not found"
                })
            }

            const courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completedVideos: [],
            })
    
            const enrolledStudent = await User.findOneAndUpdate(
                {_id: userId},
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    }
                },
                { new: true }
            )
    
            // send mail to student
            const mailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully enrolled in ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
            )
            
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    return res.status(200).json({
        success: true,
        message: "Student enrolled successfully"
    })

}

exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if(courses.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide course ID"
        });
    }

    let totalAmount = 0;

    for (const course_id of courses) {
        let course;
        try {
            
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(400).json({
                    success: false,
                    message: "Could not find course"
                });
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(400).json({
                    success: false,
                    message: "Student is already enrolled"
                })
            }

            totalAmount += course.price;
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString()
    }

    try{
        const paymentResponse = await instance.orders.create(options)
        res.json({
            success: true,
            message: paymentResponse,
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.verifyPayment = async (req,res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;

    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Payment failed"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if(expectedSignature === razorpay_signature) {
        await enrollStudent(userId, courses, res);
        return res
    }
    return res.status(400).json({
        success: false,
        message: "Payment Failed"
    })
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body

    const userId = req.user.id

    if (!orderId || !paymentId || !amount || !userId) {
        return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }

    try {
        const enrolledStudent = await User.findById(userId)
    
        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
            amount / 100,
            orderId,
            paymentId
            )
        )
    } catch (error) {
        console.log("error in sending mail", error)
        return res
            .status(400)
            .json({ success: false, message: "Could not send email" })
    }
}