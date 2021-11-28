const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the product name"],
    },
    description: {
        type: String,
        required: [true, "Please enter the product description"],
    },
    price: {
        type: Number,
        required: [true, "Please enter the product price"],
        maxlength: [5, "Maximum price upto 5 digits"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter the product category"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter the product stock"],
        maxlength: [4, "Stock cannot be more than 1000"],
        default: 1,
    },
    reviewCount: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
    }
})


module.exports = mongoose.model("Product", productSchema);