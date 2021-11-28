const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail, productReview, getAllProductReviews, deleteReview, getAllProductsAdmin } = require("../Controls/productControl");
const { authUser, authRole } = require("../configuration/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products").get(authUser, authRole("admin"), getAllProductsAdmin);
router.route("/admin/product/new").post(authUser, authRole("admin"), createProduct);
router.route("/admin/product/:id").put(authUser, authRole("admin"), updateProduct).delete(authUser, authRole("admin"), deleteProduct)
router.route("/product/:id").get(getProductDetail);
router.route("/review").put(authUser, productReview);
router.route("/reviews").get(getAllProductReviews).delete(authUser, deleteReview);

module.exports = router;