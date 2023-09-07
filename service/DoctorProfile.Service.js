const DoctorProfileDetails = require("../Models/DoctorProfiles");

exports.getDoctorProfileService = async (filtering, queries) => {
    // console.log("fields2", queries);
    const result = await DoctorProfileDetails.find(filtering)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
    // const totalProfile = await DoctorProfileDetails.countDocuments(filtering)
    // return { totalProfile, result };
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
