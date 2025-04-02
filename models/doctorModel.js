const { maxLength } = require("cookieparser");
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    fullName: {
      type: String,
      required: [true, "Full name of Doctor is required"],
      trim: true,
      minlength: 3,
      maxlength: 20,
    },

    department: {
      type: String,
      required: [true, "Doctor specialization is required"],
    },
    specialization: {
      type: String,
      required: [true, "Doctor specialization is required"],
    },
    experience: {
      type: Number,
      required: [true, "No of years of service is required"],
    },
    fees: {
      type: Number,
      required: [true, "Fees is required"],
    },
    availability: {
      type: String,
      required: [true, "Doctor availability is required"],
      enum: { values: ["Sunday", "Monday", "Tuesday"], message: "Avalability should be selected" },
    },
  },
  { timestamps: true }
);

const DoctorProfile = mongoose.model("Doctor", doctorSchema);

module.exports = DoctorProfile;
