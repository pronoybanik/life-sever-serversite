const mongoose = require("mongoose");


// 1.  schema design
const DoctorProfileDetailsSchema = new mongoose.Schema({
    LoginUserEmail: {
        type: String,
        require: true,
    },
    About: {
        type: String,
        require: true
    },
    DoctorImage: {
        type: String,
        require: true
    },
    FirstName: {
        type: String,
        require: true
    },
    LastName: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        require: true
    },
    Role: {
        type: String,
        require: true
    },
    MobileNumber: {
        type: Number,
        require: true,
        min: [0, "price can't br negative"]
    },
    Country: {
        type: String,
        require: true
    },
    StreetAddress: {
        type: String,
        require: true
    },
    City: {
        type: String,
        require: true
    },
    Region: {
        type: String,
        require: true
    },
    PostalCode: {
        type: String,
        require: true
    },
    PushNotifications: {
        type: String,
        require: true
    },
},{
  timestamps: true
});

// 2. Model
const DoctorProfileDetails = mongoose.model("DoctorProfileDetails", DoctorProfileDetailsSchema);

module.exports = DoctorProfileDetails;