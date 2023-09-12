const { createAppointmentService, getAppointmentsService, getAppointmentByIdService, updateAppointmentService, deleteAppointmentByIdService, getAppointmentDoctorByIdService, getAppointmentByUserIdService } = require("../service/appointmentBooking.Service");

exports.createAppointment = async (req, res, next) => {
    try {
        const result = await createAppointmentService(req.body);

        res.status(200).json({
            statusbar: 200,
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

exports.getAppointments = async (req, res, next) => {
    try {
        const Appointments = await getAppointmentsService();

        res.status(200).json({
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

exports.getAppointmentByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const Appointment = await getAppointmentByUserIdService(id);

        if (!Appointment) {
            return res.status(400).json({
                status: "Fail",
                error: "Couldn't find a Appointment with this id"
            })
        }

        res.status(200).json({
            statusbar: 200,
            status: "success",
            data: Appointment,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "Fail",
            message: "Couldn't get the Appointments",
            error: error.message
        });
    }
};
exports.getAppointmentByDoctorDetailsId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const Appointment = await getAppointmentDoctorByIdService(id);

        if (!Appointment) {
            return res.status(400).json({
                status: "Fail",
                error: "Couldn't find a Appointment with this id"
            })
        }

        res.status(200).json({
            status: "success",
            data: Appointment,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "Fail",
            message: "Couldn't get the Appointments",
            error: error.message
        });
    }
};

exports.getAppointmentById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const Appointment = await getAppointmentByIdService(id);

        if (!Appointment) {
            return res.status(400).json({
                status: "Fail",
                error: "Couldn't find a Appointment with this id"
            })
        }

        res.status(200).json({
            status: "success",
            data: Appointment,
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Couldn't get the Appointments",
            error: error.message
        });
    }
};

exports.deleteAppointmentById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await deleteAppointmentByIdService(id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: "Fail",
                error: "Couldn't delete the product"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully deleted the Appointment",
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: "Couldn't delete the Appointment",
            error: error.message,
        });
    }
};


exports.updateAppointment = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await updateAppointmentService(id, req.body);



        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "Fail",
                error: "Couldn't update the Appointment with this id",
            });
        }

        res.status(200).json({
            statusbar: 200,
            status: "success",
            message: "Successfully updated the Appointment"
        });
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            error: "Couldn't update the Appointment",
        });
    }
};