const User = require("../Models/user")

exports.signupService = async (userInfo) => {
    const user = await User.create(userInfo);
    return user;
};

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
};
exports.findUserById = async (userId) => {
    return await User.findOne({ _id: userId }).populate("doctorId");
};

exports.getAllUserService = async () => {
    return await User.find({});
};

exports.setUserRole = async (id, data) => {
    const result = await User.updateOne({ _id: id }, { $set: data }, { runValidators: true })
    return result;
};
exports.deleteUserById = async (id) => {
    const result = await User.findOneAndDelete({ _id: id });
    return result;
};

