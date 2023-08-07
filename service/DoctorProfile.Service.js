const DoctorProfileDetails = require("../Models/DoctorProfileDetails");

exports.getDoctorProfileService = async (filtering, queries) => {
    const result = await DoctorProfileDetails.find(filtering)
        // .select(queries.fields)
        .sort(queries.sortBy)
    return result;
};

exports.createDoctorProfileService = async (data) => {
    const result = await DoctorProfileDetails.create(data);
    return result;
};

exports.getDoctorDetails = async (id) => {
    const result = await DoctorProfileDetails.findById(id);
    return result;
};
exports.deleteUserProfileById = async (id) => {
    const result = await DoctorProfileDetails.findOneAndDelete({ _id: id });
    return result;
};

exports.setDoctorRole = async (id, data) => {
    const result = await DoctorProfileDetails.updateOne({ _id: id }, { $set: data }, { runValidators: true })
    return result;
};
