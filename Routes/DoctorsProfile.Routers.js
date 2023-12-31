const express = require("express");
const router = express.Router();
const DoctorProfileControllers = require("../controllers/DoctorsProfile.Controllers");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");


router.route("/")
    .get(DoctorProfileControllers.getDoctorDetails)
    .post(verifyToken, authorization('Patient'), DoctorProfileControllers.createDoctorDetails);

router.route("/details/:id")
    .get(DoctorProfileControllers.getDoctorDetailsId)
    .delete(verifyToken, authorization("Admin"), DoctorProfileControllers.deleteDoctorById)
    .patch(verifyToken, authorization("Admin"), DoctorProfileControllers.setRole);

module.exports = router;