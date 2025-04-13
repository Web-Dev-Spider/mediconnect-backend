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

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(403).json({ success: false, message: `User with id ${userId} does not found` });
    }
    res.status(200).json({ succes: true, message: `User with id ${userId} found`, data: user });
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  const { userId } = req.params;
  const updates = req.body;
  const user = await User.findByIdAndUpdate();
  if (!user) {
    console.log(`User found, ${user}`);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({ success: false, message: `User with id ${userId} does not exist`, data: user });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: `User with id ${userId} deleted successfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, deleteUser, getUser, editUser };
