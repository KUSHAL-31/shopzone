const Product = require("../models/Products");
const asyncErrorHandler = require("../configuration/asyncErrorHandler");
const Features = require("../Utility/features");
const HandleError = require("../configuration/handleError");
const cloudinary = require("cloudinary");

// create a product === Admin
exports.createProduct = asyncErrorHandler(async (req, res, next) => {

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        })
    }

    req.body.images = imagesLink,
        req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product })
})

// Get all products
exports.getAllProducts = asyncErrorHandler(async (req, res) => {

    const productPerPage = 6;
    const productsCount = await Product.countDocuments();

    const feature = new Features(Product.find(), req.query).search().filter();

    let products = await feature.query

    let filteredProductCount = products.length;

    feature.pagination(productPerPage);

    products = await feature.query.clone();
    // const products = await feature.query;

    res.status(200).json({
        success: true,
        products,
        productsCount,
        productPerPage,
        filteredProductCount,
    });
})


//Admin == Get all Products
exports.getAllProductsAdmin = asyncErrorHandler(async (req, res) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
})


// Get product detail
exports.getProductDetail = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new HandleError("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        product,
    })
})

// Update a product === admin
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new HandleError("Product not found", 404));
    }

    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        for (let i = 0; i < images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
        const imagesLink = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            })
        }
        req.body.images = imagesLink;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({ success: true, product });
}
)
//Delete a product
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new HandleError("Product not found", 404));
    }

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
})


// Review for product ( create / update )
exports.productReview = asyncErrorHandler(async (req, res, next) => {
    const review = {
        user: req.user._id,
        username: req.user.username,
        rating: Number(req.body.rating),
        comment: req.body.comment,
    }

    const product = await Product.findById(req.body.productId);

    const isReviewed = product.reviews.find(rview => rview.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach(rview => {
            if (rview.user.toString() === req.user._id.toString()) {
                rview.rating = req.body.rating;
                rview.comment = req.body.comment;
            }
        })
    } else {
        product.reviews.push(review);
        product.reviewCount = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach(rview => {
        avg = avg + rview.rating;
    })

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, review });
})


// Get all reviews of a single product
exports.getAllProductReviews = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new HandleError("Product not found", 404));
    }

    res.status(200).json(
        {
            success: true,
            reviews: product.reviews,
        }
    )
})

// Delete a review
exports.deleteReview = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new HandleError("Product not found", 404));
    }

    const reviews = product.reviews.filter(rview => rview._id.toString() !== req.query.id.toString());

    let avg = 0;

    reviews.forEach(rview => {
        avg += rview.rating;
    })

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const reviewCount = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        reviewCount,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json(
        {
            success: true,
        }
    )
})


