const express = require("express");
const userController = require("../controllers/user.Controller");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");
const router = express.Router();


router.get("/", userController.getAllUser);
router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.route("/:id")
    .get(userController.userId)
    .patch(verifyToken, authorization('Admin'), userController.userSetRole);

module.exports = router;
