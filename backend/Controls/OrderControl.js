const Order = require("../models/Orders");
const Product = require("../models/Products");
const asyncErrorHandler = require("../configuration/asyncErrorHandler");
const HandleError = require("../configuration/handleError");

exports.newOrder = asyncErrorHandler(async (req, res, next) => {

    const {
        shipInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shipPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shipInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shipPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({ success: true, order });
});

// Single order info
exports.getSingleOrder = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "username email");

    if (!order) {
        return next(new HandleError("Order not found with the given id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    })
})

// get login user's order

exports.getMyOrders = asyncErrorHandler(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id });

    if (!orders) {
        return next(new HandleError("Order not found with the given ID", 404));
    }

    res.status(200).json({
        success: true,
        orders,
    })
})


// Get all orders for admin
exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    })
})

// Update order +++ Admin
exports.updateOrder = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new HandleError("Order not found with the given ID", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next("You have already delivered this product", 400);
    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (order) => {
            await updateStock(order.product, order.quantity);
        });
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
})

async function updateStock(id, quantity) {

    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

// Delete Order ==== Admin
exports.deleteorder = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new HandleError("Order not found with the given ID", 404));
    }

    order.remove();

    res.status(200).json({
        success: true,
    })
})


