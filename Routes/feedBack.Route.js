const express = require("express");
const FeedBackController = require("../controllers/feedBack.Controller");
const router = express.Router();


router.route("")
    .get(FeedBackController.getFeedBack)
    .post(FeedBackController.createFeedBack);


module.exports = router;
