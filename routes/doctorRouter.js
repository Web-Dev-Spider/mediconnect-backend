const { getAllPatients } = require("../controllers/doctorController");
const { authenticate, authorize } = require("../middlewares/authenticateMiddleware");

const doctorRouter = require("express").Router();

doctorRouter.get("/patients", authenticate, authorize(["doctor"]), getAllPatients);

module.exports = doctorRouter;
