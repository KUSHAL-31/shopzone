const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const path = require("path");

const errMiddleware = require("./middleware/error");


//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/configuration/config.env" });
}

//importing all routes 
const product = require("./Routes/productRoute");
const user = require("./Routes/userRoute");
const order = require("./Routes/OrderRoute");
const payment = require("./Routes/paymentRoute")


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
})

app.use(errMiddleware);

module.exports = app;