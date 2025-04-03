const { maxLength } = require("cookieparser");
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  fullName: {
    type: String,
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    default: null,
  },
  emergencyContact: {
    name: {
      type: String,
    },
    relation: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
});

const PatientProfile = mongoose.model("Patient", patientSchema);

module.exports = PatientProfile;
