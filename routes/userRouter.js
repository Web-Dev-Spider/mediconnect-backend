const userRouter = require("express").Router();

// const authenticate = require("../middlewares/authenticateMiddleware");
const { authenticate, authorize } = require("../middlewares/authenticateMiddleware");

const { profile, updateProfile, updateAddress } = require("../controllers/userController");
const authRouter = require("./authRouter");

//Only admins can access this
// userRouter.post("/profile", authenticate, profile);

userRouter.get("/admin", authenticate, authorize(["admin"]), (req, res, next) => {
  res.send("Welcome admin");
});
userRouter.get("/doctor", authenticate, authorize(["doctor", "admin"]), (req, res, next) => {
  res.send("Welcome doctor");
});
userRouter.get("/patient", authenticate, authorize(["patient"]), (req, res, next) => {
  res.send("Welcome patient");
});

// userRouter.post("/profile", authenticate, authorize(["admin", "doctor", "patient"]), updateProfile);
// userRouter.post("/address", authenticate, authorize(["admin", "doctor", "patient"]), updateAddress);

module.exports = userRouter;
