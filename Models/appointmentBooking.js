
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


// Define the schema
const appointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  patientName: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
    required: true,
  },
  doctorDetails: {
    name: {
      type: String,
      required: true,
    },
    doctorId: {
      type: ObjectId,
      ref: "doctorProfile"
    }
  },

  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  appointmentType: {
    type: String,
    enum: ['onLine', 'onHospital'],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  appointmentStatus: {
    type: String,
    enum: ['NewPatient', 'ReturningPatients'],
    required: true,
  },
  appointmentDate: {
    type: String,
    required: true,
  },
  durationTime: {
    type: Number, // Duration in minutes
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  // You can add more fields as needed, such as status, notes, etc.
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Done'],
    default: 'Pending',
  },
  patientProfileImage: String,
  notes: {
    type: String,
  },
});

// Create a model from the schema
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Export the model
module.exports = Appointment;
