const express = require("express");
const { authUser } = require("../configuration/auth");
const { processPayment, sendStripeApiKey } = require("../Controls/paymentControl");
const router = express.Router();

router.route("/payment/process").post(authUser, processPayment);
router.route("/stripeApiKey").get(authUser, sendStripeApiKey);
module.exports = router;