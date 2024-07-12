
const express = require("express")
const router = express.Router()
const {
    capturePayment,
    verifyPayment,
    sendPaymentSuccessEmail,
} = require("../controllers/payments.controller")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth.middleware")


router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment", auth, isStudent, verifyPayment)
router.post(
    "/sendPaymentSuccessEmail",
    auth,
    isStudent,
    sendPaymentSuccessEmail
)


module.exports = router
