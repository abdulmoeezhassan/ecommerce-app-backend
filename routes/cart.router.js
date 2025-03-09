const express = require("express");
const cartController = require("../controllers/cart.controller");

const router = express.Router();

router.post("/create-user-cart", cartController.createUserCart);
router.get("/get-cart-by-user/:id", cartController.getCartByUser);

module.exports = router;
