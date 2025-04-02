const DoctorProfile = require("../models/doctorModel");
const PatientProfile = require("../models/patientModel");
const AdminProfile = require("../models/adminModel");

const User = require("../models/userModel");

const updateProfile = async (req, res, next) => {
  try {
    console.log(req.user);
    const { userId, role } = req.user;
    const updates = req.body;

    //Find the user and profile id of the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log(`Profile id of the user ${user}`);

    //Find which profile to update based on role in the cookie.
    let profile;
    if (role === "doctor") profile = DoctorProfile;
    else if (role === "patient") profile = PatientProfile;
    else if (role === "admin") profile = AdminProfile;
    else return res.status(403).json({ success: false, message: "Invalid role" });

    //Check if the profile already exists for the user with the userId in the cookie

    let updateProfile = await profile.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true, runValidators: true, upsert: true }
    );

    return res.status(200).json({ success: true, message: "Profile updation successful", updateProfile });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { updateProfile };
