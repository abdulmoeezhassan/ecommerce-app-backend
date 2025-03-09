const express = require("express");
const productController = require("../controllers/products.controller");
const router = express.Router();
const upload = require('../config/multer.config');

router.post("/create-product", upload.array('images', 5), productController.createProduct);
router.get("/get-all-products", productController.getAllProducts);
router.get("/get-products-by-supplier", productController.getProductsBySupplier);

module.exports = router;