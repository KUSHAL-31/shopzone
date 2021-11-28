const app = require("./app");
const cloudinary = require("cloudinary")
const connectDB = require("./configuration/db");

//handling uncaught error
process.on("uncaughtException", (err) => {
    console.log("Error: ", err.message);
    console.log("Shutting down the server due to uncaught error");
    process.exit(1);
})


//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/configuration/config.env" });
}

//db connection
connectDB();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
})


//unhandled promise rejection
process.on("unhandledRejection", err => {
    console.log("Error: ", err.message);
    console.log("Shutting down the server due to unhandled promisse rejection");

    server.close(() => {
        process.exit(1);
    })
})