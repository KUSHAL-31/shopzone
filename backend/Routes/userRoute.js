const express = require("express");
const { registerUser, loginUser, logoutUser, getUserDetails, updateUserProfile, getAllUsers, getUserDetailForAdmin, updateUserRole, deleteUser } = require("../Controls/userControl");
const { authUser, authRole } = require("../configuration/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(authUser, getUserDetails);
router.route("/me/update").put(authUser, updateUserProfile);
router.route("/admin/users").get(authUser, authRole("admin"), getAllUsers);
router.route("/admin/user/:id").get(authUser, authRole("admin"), getUserDetailForAdmin).put(authUser, authRole("admin"), updateUserRole).delete(authUser, authRole("admin"), deleteUser);

module.exports = router;