const DoctorProfile = require("../models/doctorModel");
const PatientProfile = require("../models/patientModel");
const AdminProfile = require("../models/adminModel");
const Address = require("../models/addressModel");

const User = require("../models/userModel");

const updateProfile = async (req, res, next) => {
  try {
    console.log(req.user);
    const { userId, role } = req.user;
    const updates = req.body;

    //Find the user and profile id of the user
    const user = await User.findById(userId).select("-password");
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

    let updatedProfile = await profile.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true, runValidators: true, upsert: true }
    );

    return res.status(200).json({ success: true, message: "Profile updation successful", user, updatedProfile });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const { userId, role } = req.user;
    const updates = req.body;

    //find which profile to update based on the role
    const ProfileModel =
      role === "doctor" ? DoctorProfile : role === "patient" ? PatientProfile : role === "admin" ? AdminProfile : null;

    // if no valid role.. then exit with message
    if (!ProfileModel) {
      return res.status(403).json({ success: false, message: "Invalid role" });
    }
    console.log("finding profile");
    let profile = await ProfileModel.findOne({ userId });

    // let user = await profileModel.findOne({ userId });
    console.log(profile);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found!" });
    }

    let address;

    if (profile.address) {
      console.log("address is there", profile.address);

      //If address found update it
      address = await Address.findByIdAndUpdate(profile.address, { $set: updates }, { new: true, runValidators: true });
      await address.save();
      console.log(address);
    } else {
      console.log("address is  not there");
      address = new Address(updates);
      console.log("Address", address);
      await address.save();
      profile.address = address._id;
      await profile.save();
    }
    res.status(200).json({ success: true, message: "Address updated successfully", profile, address });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = { updateProfile, updateAddress };
