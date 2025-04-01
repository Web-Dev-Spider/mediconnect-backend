const userRouter = require("express").Router();

// const authenticate = require("../middlewares/authenticateMiddleware");
const { authenticate, authorize } = require("../middlewares/authenticateMiddleware");

const { profile } = require("../controllers/userController");
const authRouter = require("./authRouter");

//Only admins can access this
// userRouter.post("/profile", authenticate, profile);

userRouter.get("/admin", authenticate, authorize(["admin"]), (req, res, next) => {
  res.send("Welcome admin");
});
userRouter.get("/doctor", authenticate, authorize(["doctor"]), (req, res, next) => {
  res.send("Welcome doctor");
});
userRouter.get("/patient", authenticate, authorize(["patient"]), (req, res, next) => {
  res.send("Welcome patient");
});

module.exports = userRouter;
