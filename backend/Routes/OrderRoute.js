const express = require("express");
const { authUser, authRole } = require("../configuration/auth");
const { newOrder, getSingleOrder, getMyOrders, getAllOrders, updateOrder, deleteorder } = require("../Controls/OrderControl")
const router = express.Router();

router.route("/order/new").post(authUser, newOrder);

router.route("/order/me").get(authUser, getMyOrders);

router.route("/order/:id").get(authUser, getSingleOrder);

router.route("/admin/order").get(authUser, authRole("admin"), getAllOrders);

router.route("/admin/order/:id").put(authUser, authRole("admin"), updateOrder).delete(authUser, authRole("admin"), deleteorder);


module.exports = router;