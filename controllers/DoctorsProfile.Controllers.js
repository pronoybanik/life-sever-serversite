const {
  createDoctorProfileService,
  getDoctorProfileService,
  getDoctorDetails,
  deleteUserProfileById,
  setDoctorRole,
} = require("../service/DoctorProfile.Service");

exports.getDoctorDetails = async (req, res, next) => {
  try {
    let filtering = { ...req.query };

    // sort , ppage, limit -> exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filtering[field]);


    // gt, lt, get, lte
    let filtersString = JSON.stringify(filtering)
    filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
    filtering = JSON.parse(filtersString);

    const queriesData = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queriesData.sortBy = sortBy;
    }

    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   queriesData.fields = fields;
    //   console.log("fields 1",fields);
    // }

    const details = await getDoctorProfileService(filtering, queriesData);

    res.status(200).json({
      status: "success",
      data: details,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is note defind",
      error: error.message,
    });
  }
};

exports.getDoctorDetailsId = async (req, res, next) => {
  try {
    const paramsId = req.params.id;
    const details = await getDoctorDetails(paramsId);
    res.status(200).json({
      status: "success",
      data: details,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is note defind",
      error: error.message,
    });
  }
};

exports.createDoctorDetails = async (req, res, next) => {
  // save and create method
  try {
    // create method..
    const result = await createDoctorProfileService(req.body);
    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is note inserted",
      error: error.message,
    });
  }
};

exports.deleteDoctorById = async (req, res, next) => {
  try {
    const paramsId = req.params.id;
    const result = await deleteUserProfileById(paramsId);
    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is note inserted",
      error: error.message,
    });
  }
};

exports.setRole = async (req, res, next) => {
  try {
    const paramsId = req.params.id;
    const result = await setDoctorRole(paramsId, req.body);
    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is note inserted",
      error: error.message,
    });
  }
};
