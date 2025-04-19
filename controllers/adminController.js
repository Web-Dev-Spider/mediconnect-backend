const User = require("../models/userModel");

const getAllUsers = async (req, res, next) => {
  try {
    let query = {};
    console.log("req.query", req.query);
    //Filter user by query params, like role, email
    let { role, email } = req.query;
    if (role) query.role = role;
    if (email) query.email = email;
    const users = await User.find(query).select("-password -__v");
    res.status(200).json({ success: true, message: `List of all ${role ? role : "user"}s`, data: users });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findBy;
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, deleteUser };
