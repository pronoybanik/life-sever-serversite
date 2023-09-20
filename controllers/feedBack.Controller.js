const { getFeedBackService, createFeedBackService } = require("../service/feedBack.Service");

exports.getFeedBack = async (req, res, next) => {
    try {
        const Appointments = await getFeedBackService();

        res.status(200).json({
            statusbar:200,
            status: "success",
            data: Appointments
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Couldn't get the Appointments",
            error: error.message
        });
    }
};

exports.createFeedBack = async (req, res, next) => {
    try {
        const result = await createFeedBackService(req.body);

        res.status(200).json({
            statusbar: 201,
            status: "success",
            message: "Successfully created the Appointment"
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Couldn't create the Appointment",
            error: error.message
        })
    }
};