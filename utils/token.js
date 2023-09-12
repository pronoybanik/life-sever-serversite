const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) => {
    const payload = {
        email: userInfo.email,
        Role: userInfo.Role,
    };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "12h"
    });

    return token;
};