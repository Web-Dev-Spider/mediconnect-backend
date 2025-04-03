const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const restrictedUserNames = ["system", "root", "superuser", "admin", "test"];
const validators = require("../utilities/validators");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Minimum 3 characters needed"],
    maxlength: [20, "Name can not exceed more than 20 characters"],
    validate: {
      validator: function (value) {
        return !restrictedUserNames.includes(value.toLowerCase());
      },
      message: (props) => `'${props.value}' is not allowed as a user name.`,
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: [true, "Email already taken"],
    validate: {
      validator: validators.isValidEmail,
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: { values: ["admin", "doctor", "patient"], message: "Invalid role! must be a 'patient', 'doctor' or 'admin'" },
    default: "patient",
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "roleProfile",
    default: null,
  },
  roleProfile: {
    type: String,
    enum: ["AdminProfile", "DoctorProfile", "PatientProfile"],
    default: null,
  },
});

userSchema.methods.hashPassword = async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    // const salt = await bcrypt.genSalt(10);
    // this.password = await bcrypt.hash(this.password, salt);
    await this.hashPassword();
    next();
  } catch (error) {
    next(error);
  }
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
