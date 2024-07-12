const cloudinary = require('cloudinary').v2;
require("dotenv").config();

exports.deleteFromCloudinary = async (url) => {
    const publicId = process.env.FOLDER_NAME + "/" + url.split("/").pop().split(".")[0];
    const fileType = url.split(".").pop();
    try {
        if(fileType === "mp4" || fileType === "mov" || fileType === "avi") {
            return await cloudinary.uploader.destroy(publicId, {resource_type: "video"});
        }
        else {
            return await cloudinary.uploader.destroy(publicId);
        }
    } catch (error) {
        console.log(error.message);
    }
}