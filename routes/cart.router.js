const express = require("express");

const {saveCartController} = require("../controllers/cart.controller");
const router = express.Router();

router.post("/save", saveCartController);

module.exports = router;
