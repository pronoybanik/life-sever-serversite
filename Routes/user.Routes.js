const express = require("express");
const userController = require("../controllers/user.Controller");
const router = express.Router();


router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/:id", userController.userId);

module.exports = router;
