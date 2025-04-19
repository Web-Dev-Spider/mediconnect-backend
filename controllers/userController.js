const userRouter = require("../routes/userRouter");

const signUp = (req, res, next) => {
  console.log(req.body);
  console.log("Hitted signup");
};
const signIn = (req, res, next) => {
  try {
    console.log("Hitted signIn");
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (!name || !email) res.status(200).json({ success: true, message: "signing-in" });
  } catch (error) {
    next(error);
  }
};
const signOut = (req, res, next) => {
  console.log("Hitted signOUT");
};

module.exports = { signUp, signIn, signOut };
