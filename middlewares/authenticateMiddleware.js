const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/envConfig");

const authenticate = async (req, res, next) => {
  try {
    console.log("Passed through auth middleware");
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "No token found.. Access denied." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log("\nrequest received in authenticate\n", req);

    // console.log("\n decoded data: ", decoded);
    req.user = decoded; // attached the token payload/to the request.

    console.log("\n req.user", req.user);
    next();
  } catch (error) {
    console.log("Authentication Middlware error", error);
    // next(error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

const authorize = (roles) => {
  console.log("Roles received", roles);
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: "false", message: "Access denied, Insufficient Permission." });
    }
    next();
  };
};
module.exports = { authenticate, authorize };
