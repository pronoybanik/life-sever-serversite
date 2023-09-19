const mongoose = require("mongoose");
const validator = require("validator");


const feedBackSchema = mongoose.Schema(
    {
        email: {
            type: String,
            validate: [validator.isEmail, "Provide a valid Email"],
            trim: true,
            lowercase: true,
            unique: true,
            required: [true, "Email address is required"],
        },
        userName: {
            type: String,
            required: [true, "Please provide a  name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters."],
            maxLength: [100, "Name is too large"],
        },
        message: {
            type: String,
            required: [true, "Please provide a last name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters."],
            maxLength: [150, "Name is too large"],
        },
    },
    {
        timestamps: true,
    }
);


const feedBack = mongoose.model("feedBack", feedBackSchema);

module.exports = feedBack;

