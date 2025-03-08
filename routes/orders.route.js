const express = require("express");
const orderController = require("../controllers/orders.controller");
const router = express.Router();

router.post("/save", orderController.createOrder);
router.get("/supplier/:id", orderController.getOrdersBySupplier);

module.exports = router;