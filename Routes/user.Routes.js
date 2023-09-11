const express = require("express");
const userController = require("../controllers/user.Controller");
const router = express.Router();


router.get("/", userController.getAllUser);
router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.route("/:id")
    .get(userController.userId)
    .patch(userController.userSetRole);

module.exports = router;
