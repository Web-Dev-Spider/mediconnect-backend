const { getAllUsers, deleteUser, getUser, editUser } = require("../controllers/adminController");
const { authenticate, authorize } = require("../middlewares/authenticateMiddleware");

const adminRouter = require("express").Router();

adminRouter.get("/users", authenticate, authorize(["admin"]), getAllUsers);
adminRouter.get("/users/:userId", authenticate, authorize(["admin"]), getUser);
adminRouter.patch("/users/:userId", authenticate, authorize(["admin"]), editUser);
adminRouter.delete("/users/:userId", authenticate, authorize(["admin"]), deleteUser);

module.exports = adminRouter;
