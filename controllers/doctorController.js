const DoctorProfile = require("../models/doctorModel");
const PatientProfile = require("../models/patientModel");
const User = require("../models/userModel");

const getAllPatients = async (req, res, next) => {
  try {
    const patients = await PatientProfile.find().select("-password");

    if (!patients) {
      return res.status(403).json({ success: false, message: `Patients couldn't find/There are no patients for you` });
    }
    res.status(200).json({ success: true, message: `Patients found`, data: patients });
  } catch (error) {
    next(error);
  }
};

const getPatient = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllPatients };
