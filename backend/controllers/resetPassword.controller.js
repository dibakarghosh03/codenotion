const User = require("../models/User.model");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({email});
    
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    
        const token = crypto.randomUUID();
    
        const updatedDetails = await User.findOneAndUpdate(
                                    {email:email},
                                    {
                                        token: token,
                                        resetPasswordExpires: Date.now() + 5*60*1000,
                                    },
                                    {new:true});
    
        const url = `http://localhost:3000/resetPassword/${token}`;
    
        await mailSender(email, "Password Reset", `Password reset link : ${url}`);
    
        return res.status(200).json({
            success: true,
            message: "Email sent successfully, please check your email to continue further"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending email"
        });
    }

}


exports.resetPassword = async (req,res) => {
    try {
        const {password, confirmPassword, token} = req.body;
        if(password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password and ConfirmPassword values don't match, Please try again"
            });
        }
    
        const userDetails = await User.findOne({token: token});
    
        if(!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    
        if(userDetails.resetPasswordExpires && userDetails.resetPasswordExpires < Date.now()) {
            return res.status(401).json({
                success: false,
                message: "Link Expired, Please try again"
            });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        await User.findOneAndUpdate({token: token},
                                    {
                                        password: hashedPassword,
                                        token: "",
                                        resetPasswordExpires: Date.now() + 2*60*1000
                                    },
                                    {new:true}
        );
    
        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting password"
        });
    }
}