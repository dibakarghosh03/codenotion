const mongoose = require('mongoose');
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 15*60*1000,
    }
});

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification Email from CodeNotion", emailTemplate(otp));
    } catch (error) {
        console.log("Error occured while sending email -> ",error.message);
        throw error;
    }
}

otpSchema.pre("save",async function(next) {
    
    if(this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    
    next();
});

module.exports = mongoose.model("OTP", otpSchema)