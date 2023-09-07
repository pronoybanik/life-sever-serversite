const User = require("../Models/user")

exports.signupService = async (userInfo) => {
    const user = await User.create(userInfo);
    return user;
};

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};
exports.findUserById = async (userId) => {
    return await User.findOne({ _id: userId });
};
