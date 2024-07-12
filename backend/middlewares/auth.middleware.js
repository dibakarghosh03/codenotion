const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req,res,next) => {
    try {
        const token = req.cookies.token 
                    || req.header("Authorization").replace("Bearer ","") 
                    || req.body.token;


        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Please login to continue"
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while validating the token"
        });
    }
}


exports.isStudent = async (req,res,next) => {
    try {
        if(req.user.accountType === "student") {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students only"
            })
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "User role cannot be verified, please try again"
        })
    }
}


exports.isInstructor = async (req,res,next) => {
    try {
        if(req.user.accountType === "instructor") {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for instructor only"
            })
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "User role cannot be verified, please try again"
        })
    }
}


exports.isAdmin = async (req,res,next) => {
    try {
        if(req.user.accountType === "admin") {
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for admin only"
            })
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "User role cannot be verified, please try again"
        })
    }
}