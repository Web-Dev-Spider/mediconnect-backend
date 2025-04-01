const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, 'User Id is required'] 
    },
    
    specialization: {
        type: String,
        required:[true, "Doctor specialization is required"]
    },
    experience :{
        type: Number,
        required: [true, 'No of years of service is required'],
    } 
    ,
    fees : {
        type: Number,
        required:[true, 'Fees is required']
    },
    availability: {
        type: String,
        required:[true, 'Doctor availability is required'],
        enum: {values:['Sunday', 'Monday', 'Tuesday'], message: 'Avalability should be selected' },
    }
  
  },
  { timestamps: true }
);

const Doctor = new mongoose.Schema("doctors", doctorSchema);

module.exports = Doctor;
