const express = require("express");
const appointment = require("../controllers/appointmentBooking.Controllers");

const router = express.Router();

router.route("/")
    .post(appointment.createAppointment)
    .get(appointment.getAppointments);

router.route("/:id")
    .get(appointment.getAppointmentById)
    .patch(appointment.updateAppointment)
    .delete(appointment.deleteAppointmentById)

module.exports = router;