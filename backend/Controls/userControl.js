const User = require("../models/Users");
const asyncErrorHandler = require("../configuration/asyncErrorHandler");
const sendToken = require("../Utility/jwtToken");
const HandleError = require("../configuration/handleError");
const cloudinary = require("cloudinary")

//Register a user
exports.registerUser = asyncErrorHandler(async (req, res, next) => {

    let user;
    const { username, email, password } = req.body;
    user = await User.create({
        username, email, password
    })
    sendToken(user, 201, res);
});

//Login for user
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new HandleError("Please enter both email and password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new HandleError("Invalid email or password", 401));
    }
    const isPasswordTrue = await user.comparePassword(password);

    if (!isPasswordTrue) {
        return next(new HandleError("Invalid email or password", 401));
    }
    sendToken(user, 200, res);
});

// Logout for user
exports.logoutUser = asyncErrorHandler(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({ success: true, message: "Logout successfully" });
})


//Get user(own) details
exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
})

// update user Profile
exports.updateUserProfile = asyncErrorHandler(async (req, res, next) => {
    const newData = {
        username: req.body.username,
        email: req.body.email,
    }

    await User.findByIdAndUpdate(req.user.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({ success: true })
})


//Get all users ( ADMIN )
exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({ success: true, users });
})


//Get single user detail ( ADMIN )
exports.getUserDetailForAdmin = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new HandleError("User does not exist", 400));
    }
    res.status(200).json({ success: true, user });
})


// update user Profile by admin for role
exports.updateUserRole = asyncErrorHandler(async (req, res, next) => {
    const newData = {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
    }

    let user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400));
    }

    await User.findByIdAndUpdate(req.params.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({ success: true })
})


// Delete user by ADMIN
exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});
