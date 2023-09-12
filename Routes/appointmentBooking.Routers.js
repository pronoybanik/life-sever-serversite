const express = require("express");
const appointment = require("../controllers/appointmentBooking.Controllers");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");



const router = express.Router();

router.route("/")
    .post(verifyToken, authorization('Doctor'), appointment.createAppointment)
    .get(appointment.getAppointments);

router.route('/userId/:id')
    .get(verifyToken, authorization('Doctor'), appointment.getAppointmentByUserId);

router.route('/doctorId/:id')
    .get(appointment.getAppointmentByDoctorDetailsId);

router.route("/:id")
    .get(appointment.getAppointmentById)
    .patch(appointment.updateAppointment)
    .delete(appointment.deleteAppointmentById);

// router.route('/userId/:id').get(appointment.getAppointmentByUserId)

module.exports = router;