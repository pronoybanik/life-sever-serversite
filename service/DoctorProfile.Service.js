const DoctorProfileDetails = require("../Models/DoctorProfileDetails");

exports.createDoctorProfileService = async (data) => {
    const result = await DoctorProfileDetails.create(data);
    return result;
};

exports.getDoctorProfileService = async () => {
    const result = await DoctorProfileDetails.find();
    return result;
};

exports.getDoctorDetails = async (id) => {
    const result = await DoctorProfileDetails.findById(id);
    return result;
};
exports.deleteUserProfileById = async (ids) => {
    const result = await DoctorProfileDetails.findOneAndDelete({ _id: ids });
    return result;
};