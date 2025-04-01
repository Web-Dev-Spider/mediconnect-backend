const mongoose = require("mongoose");

const { DB_URI } = require("./envConfig");

//
if (!DB_URI) {
  throw new Error("DB URI is not available for database connection");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connected Successfully");
  } catch (error) {
    console.log("Error connecting database", error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
