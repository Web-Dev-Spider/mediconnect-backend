const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    useId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    doctorId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    
})