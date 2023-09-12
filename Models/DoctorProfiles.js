const mongoose = require('mongoose');

const doctorProfileSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    LoginUserEmail: {
        type: String,
        required: true,
        unique: true,
    },
    About: String,
    StreetAddress: String,
    City: String,
    Region: String,
    PushNotifications: Boolean,
    PostalCode: String,
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    MobileNumber: String,
    Country: String,
    DoctorProfileImage: String, // You may want to store the image URL here
    Role: {
        type: String,
        enum: ['Doctor', "Null"], // Assuming this is a doctor-specific schema
        default: "Null"
    },
    status: {
        type: String,
        enum: ['Active', "inActive", "Blocked"], // Assuming this is a doctor-specific schema
        default: "Active"
    },
    DoctorType: String,
    WorkingHour: String,
    PerHourCharge: Number,
    PushNotifications: String,
});

const DoctorProfile = mongoose.model('DoctorProfile', doctorProfileSchema);

module.exports = DoctorProfile;
