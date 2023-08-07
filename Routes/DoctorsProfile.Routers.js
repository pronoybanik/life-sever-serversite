const express = require("express");
const router = express.Router();
const DoctorProfileControllers = require("../controllers/DoctorsProfile.Controllers")


router.route("/")
    .get(DoctorProfileControllers.getDoctorDetails)
    .post(DoctorProfileControllers.createDoctorDetails);

router.route("/details/:id")
    .get(DoctorProfileControllers.getDoctorDetailsId)
    .delete(DoctorProfileControllers.deleteDoctorById)
    .patch(DoctorProfileControllers.setRole);

module.exports = router;