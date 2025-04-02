const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  houseName: String,
  street: String,
  city: String,
  district: String,
  pincode: String,
  country: String,
});

const Address = mongoose.model("Adress", addressSchema);

module.exports = Address;
