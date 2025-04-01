const authRouter = require("express").Router();

const { signIn, signOut, signUp } = require("../controllers/authController");

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", signOut);

module.exports = authRouter;
