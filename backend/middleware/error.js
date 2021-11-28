const HandleError = require("../configuration/handleError");

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    if (err.name === "CastError") {
        const message = "Resource not found";
        err = new HandleError(message, 400);
    }

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new HandleError(message, 400);
    }

    if (err.name === "JsonWebToken") {
        const message = "Json web token is invalid , try again please...";
        err = new HandleError(message, 400);
    }

    res.status(err.statusCode).json({ success: false, message: err.message });

}