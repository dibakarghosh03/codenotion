const cloudinary = require('cloudinary').v2;

exports.uploadToCloudinary = async (file, folder, height, quality) => {
    console.log("File : ",file);
    console.log("File path : ",file.tempFilePath);
    try {
        const options = {folder};
        if(height) {
            options.height = height;
        }
        if(quality) {
            options.quality = quality;
        }
        options.resource_type = "auto";
    
        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        console.log(error);
        
    }
}