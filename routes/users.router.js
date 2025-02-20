const express = require("express");
const { authenticateUser } = require("../middlewares/auth.middleware");
const userController = require("../controllers/users.controller");
const router = express.Router();

router.get("/", userController.getAllUsers);

module.exports = router;
