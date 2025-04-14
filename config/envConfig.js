require("dotenv").config();

const PORT = process.env.PORT || 3000;
//ENVIRONMENT
const NODE_ENV = "development";

//Database
const DB_URI = process.env.DB_URI;

//JWT
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const FRONTEND_URL = process.env.FRONTEND_URL;

module.exports = { PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN, FRONTEND_URL };
