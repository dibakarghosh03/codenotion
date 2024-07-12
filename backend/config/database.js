const mongoose = require('mongoose');
require("dotenv").config();

exports.connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.log("Database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    })
}