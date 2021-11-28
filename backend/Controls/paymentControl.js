const asyncErrorHandler = require("../configuration/asyncErrorHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.processPayment = asyncErrorHandler(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "ShopZone",
        },
    });
    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
    })
})


exports.sendStripeApiKey = asyncErrorHandler(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
})


