const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const DoctorProfile = require("../models/doctorModel");
const PatientProfile = require("../models/patientModel");
const AdminProfile = require("../models/adminModel");

const generateJwtToken = require("../utilities/generateJWT");
const { JWT_SECRET } = require("../config/envConfig");

//Signup / Register funcion
const signUp = async (req, res, next) => {
  try {
    // console.log("\n ***********authController->Signup**********");
    //Validations are done in the user schama and schema.pre function
    const { userName, email, phone, password, role } = req.body;
    const newUser = new User({ userName, email, phone, password, role });

    // console.log("New user just after created using the User instance", newUser);

    //**************This logic has changed */

    // let profile;

    // if (role === "admin") {
    //   profile = new AdminProfile({ userId: newUser._id });
    // } else if (role === "doctor") {
    //   profile = new DoctorProfile({ userId: newUser._id });
    // } else if (role === "patient") {
    //   profile = new PatientProfile({ userId: useUser._id });
    // } else {
    //   console.log("Role is invalid");
    //   return res.status(403).json({ success: false, message: "Role is invalid" });
    // }

    // await profile.save();

    //**************This logic has changed */

    await newUser.save({ new: true });

    // console.log(`\n Parameters for creating tokens \n userId: ${newUser._id} \n Role: ${newUser.role}`);
    const token = generateJwtToken(newUser._id, newUser.role);

    const decode = jwt.verify(token, JWT_SECRET);
    // console.log("\n Decoded token \n ", decode);
    res.cookie("token", token);

    res.status(200).json({ success: true, message: "User created successfully", user: newUser });
  } catch (error) {
    // console.log("Error found at SignUp", error);
    next(error);
  }
};

//Login/SignIn
const signIn = async (req, res, next) => {
  try {
    console.log("\n ***********authController->SignIn**********");

    //Get all fields
    const { userName, email, password } = req.body;
    if ((!userName || email) && !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    //Check whether the user exists or not
    const userExists = await User.findOne({ $or: [{ userName }, { email }] });
    // console.log(existUser);
    if (!userExists) {
      return res.status(404).json({ success: false, message: "User does not exist." });
    }

    //Check the password
    const validPassword = await bcrypt.compare(password, userExists.password);
    if (!validPassword) {
      return res.status(404).json({ success: false, message: "Invalid login credentials" });
    }

    //Generate jwt token
    const token = generateJwtToken(userExists._id, userExists.role);

    //Save it to cookies
    res.cookie("token", token);
    const decode = jwt.verify(token, JWT_SECRET);
    console.log("Token ", decode);

    res.status(200).json({ success: true, message: "User signed in successfully", userExists });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};
const signOut = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "User signed out successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { signUp, signIn, signOut };
