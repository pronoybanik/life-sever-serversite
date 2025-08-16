const DoctorProfiles = require("../Models/DoctorProfiles");
const User = require("../Models/user");

exports.getDoctorProfileService = async (filtering, queries) => {
    const result = await DoctorProfiles.find(filtering)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)
    // const totalProfile = await DoctorProfiles.countDocuments(filtering)
    // return { totalProfile, result };
    return result;

};

exports.createDoctorProfileService = async (data) => {
    const result = await DoctorProfiles.create(data);
    const { _id: DoctorProfileId, userId } = result;

    const res = await User.updateOne(
        { _id: userId },
        { $push: { doctorId: DoctorProfileId } },
        { runValidators: true }
    );
    return result;
};

exports.getDoctorDetails = async (id) => {
    const result = await DoctorProfiles.findById(id);
    return result;
};

exports.deleteUserProfileById = async (id) => {
    const result = await DoctorProfiles.findOneAndDelete({ _id: id });
    return result;
};

exports.setDoctorRole = async (id, data) => {
    const result = await DoctorProfiles.updateOne({ _id: id }, { $set: data }, { runValidators: true })
    return result;
};
