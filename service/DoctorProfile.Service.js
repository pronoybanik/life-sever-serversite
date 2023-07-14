const DoctorProfileDetails = require("../Models/DoctorProfileDetails");

exports.createDoctorProfileService = async (data) => {
    const result = await DoctorProfileDetails.create(data);
    return result;
};

exports.getDoctorProfileService = async () => {
    const result = await DoctorProfileDetails.find();
    return result;
};