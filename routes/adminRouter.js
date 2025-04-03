const adminRouter = require("express").Router();

adminRouter.get("/", (req, res, next) => {
  res.send("Admin router hitted");
});

module.exports = adminRouter;
