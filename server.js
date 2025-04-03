//Main important modules
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { PORT, NODE_ENV } = require("./config/envConfig");

const errorHandler = require("./middlewares/errorMiddleware");
const connectToDatabase = require("./config/database");

const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const adminRouter = require("./routes/adminRouter");
// const doctorRouter = require("./routes/doctorRouter");

const app = express();

app.use(express.json());
app.use(cookieParser());

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
// app.use("/api/doctors", doctorRouter);

app.use((req, res, next) => {
  const error = new Error(`⚠️! 404! Not found ${req.originalUrl}`);
  const statusCode = 404;
  next(error);
});

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`App started working at PORT ${PORT}`);
  await connectToDatabase();
});
