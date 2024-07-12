const express = require("express");
const app = express();

const userRoute = require("./routes/user.routes");
const profileRoute = require("./routes/profile.routes");
const courseRoute = require("./routes/course.routes");
const paymentRoute = require("./routes/payments.routes");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 8000;

database.connectDB();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(   
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/payment", paymentRoute);

// default route
app.get("/", (req,res) => {
    return res.json({
        success: true,
        message: "Your server is up and running.."
    })
});

app.listen(PORT, () => {
    console.log("Server is running at Port : " + PORT);
})