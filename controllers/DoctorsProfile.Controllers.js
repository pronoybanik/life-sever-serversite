const { createDoctorProfileService, getDoctorProfileService } = require('../service/DoctorProfile.Service');


exports.getDoctorDetails = async (req, res, next) => {
  try {
    const details = await getDoctorProfileService();
    res.status(200).json({
      status: "success",
      data: details
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Data is note defind',
      error: error.message
    })
  }
};

exports.createDoctorDetails = async (req, res, next) => {
  // save and create method
  try {
    // create method..
    const result = await createDoctorProfileService(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Data inserted successfully',
      data: result
    });

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Data is note inserted',
      error: error.message
    })
  }
};