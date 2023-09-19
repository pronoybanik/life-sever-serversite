const FeedBack = require("../Models/feedBack");

exports.createFeedBackService = async (data) => {
    const result = await FeedBack.create(data);
    return result;
};

exports.getFeedBackService = async () => {
    const Appointment = await FeedBack.find({}).sort({ createdAt: -1 }).limit(4);
    return Appointment;
};