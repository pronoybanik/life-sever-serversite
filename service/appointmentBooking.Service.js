const Appointment = require("../Models/appointmentBooking");


exports.getAppointmentsService = async () => {
    const Appointments = await Appointment.find({});
    return Appointments;
};

exports.createAppointmentService = async (data) => {
    const result = await Appointment.create(data);
    return result;
};

exports.getAppointmentByIdService = async (id) => {
    const Appointment = await Appointment.findOne({ _id: id });
    return Appointment;
};

exports.deleteAppointmentByIdService = async (id) => {
    const result = await Appointment.deleteOne({ _id: id });
    return result;
};

exports.updateAppointmentService = async (id, data) => {
    const result = await Appointment.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
};