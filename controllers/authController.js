const bcrypt = require("bcryptjs");
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
    console.log(req.body);
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

    // const decode = jwt.verify(token, JWT_SECRET);
    // console.log("Token ", decode);

    let redirectTo;

    if (userExists.role === "admin") {
      redirectTo = "/admin/dashboard";
    } else if ((userExists.role = "doctor")) {
      redirectTo = "/doctor/dashboard";
    } else if (userExists.role === "patient") {
      redirectTo = "/patient/dashboard";
    } else {
      redirectTo = "/";
    }

    res.status(200).json({ success: true, message: "User signed in successfully", userExists, redirectTo });
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
