const userRouter = require("express").Router();

// const authenticate = require("../middlewares/authenticateMiddleware");
const authenticate = require("../middlewares/authenticateMiddleware");

const { profile } = require("../controllers/userController");

userRouter.post("/profile", authenticate, profile);

module.exports = userRouter;
