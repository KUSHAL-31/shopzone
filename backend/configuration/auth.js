const asyncErrorHandler = require("./asyncErrorHandler");
const jwt = require("jsonwebtoken")
const User = require("../models/Users");
const HandleError = require("./handleError");

exports.authUser = asyncErrorHandler(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new HandleError("Please login to access this feature", 401));
    }

    const decodeInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decodeInfo.id);

    next();
});

exports.authRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new HandleError(`${req.user.role} is denied the access`, 403));
        }
        next();
    }
}