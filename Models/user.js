const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");
const bcrypt = require("bcryptjs");
// const crypto = require("crypto");


const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            validate: [validator.isEmail, "Provide a valid Email"],
            trim: true,
            lowercase: true,
            unique: true,
            required: [true, "Email address is required"],
        },
        firstName: {
            type: String,
            required: [true, "Please provide a first name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters."],
            maxLength: [100, "Name is too large"],
        },
        lastName: {
            type: String,
            required: [true, "Please provide a last name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters."],
            maxLength: [100, "Name is too large"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            validate: {
                validator: (value) =>
                    validator.isStrongPassword(value, {
                        minLength: 6,
                        minLowercase: 3,
                        minNumbers: 1,
                        minUppercase: 1,
                        minSymbols: 1,
                    }),
                message: "Password {VALUE} is not strong enough.",
            },
        },
        confirmPassword: {
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                validator: function (value) {
                    return value === this.password;
                },
                message: "Passwords don't match!",
            },
        },
        doctorId: [{
            type: ObjectId,
            ref: "DoctorProfile"
        }],
        Role: {
            type: String,
            enum: ["Patient", "Doctor", "Admin"],
            default: "Patient",
        },
        status: {
            type: String,
            default: "active",
            enum: ["active", "inactive", "blocked"],
        },

        contact: {
            number: {
                type: String,
                validate: [validator.isMobilePhone, "Please provide a valid contact number"],
            },
            address: {
                type: String,
            }
        },
        imageURL: {
            type: String,
            validate: [validator.isURL, "Please provide a valid url"],
        },

    }
);

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        //  only run if password is modified, otherwise it will change every time we save the user!
        return next();
    }
    const password = this.password;

    const hashedPassword = bcrypt.hashSync(password);

    this.password = hashedPassword;
    this.confirmPassword = undefined;

    next();
});

userSchema.methods.comparePassword = function (password, hash) {
    const isPasswordValid = bcrypt.compareSync(password, hash);
    return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

/*

{
    "email": "mezba1@test.com",
    "password": "mezba123456#A",
    "confirmPassword": "mezba123456#A",
    "firstName": "Mezbaul Abedin",
    "lastName": "Forhan",
    "shippingAddress": "944 osthir Street",
    "presentAddress": "944 osthir Street",
    "permanentAddress": "944 Russell Street",
    "imageURL": "https://i.ibb.co/WnFSs9Y/unnamed.webp"
}


//for manager
/*
"name":"Manager",
"email":"managerctg@test.com",
"password":"mezba123456##",
"confirmPassword":"mezba123456##",
"firtsName":"Manager of",
"lastName":"CTG",
"contactNumber":"11111111111",
"shippingAddress:"944 osthir Street",
"division":"chattogram",
"imageURL":"https://i.ibb.co/WnFSs9Y/unnamed.webp",
"status":"active",
"emergencyContactNumber":"01712345678",
"presentAddress":"944 osthir Street",
"permanentAddress":"944 Russell Street",
"nationalIdImageURL":"https://i.ibb.co/WnFSs9Y/unnamed.webp",



*/
