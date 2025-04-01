const profile = (req, res, next) => {
  console.log("In the profile ");
  res.status(200).json({ success: true, message: "Hitted the profile page" });
};

module.exports = { profile };
