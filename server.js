//Main important modules
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { PORT, NODE_ENV, FRONTEND_URL } = require("./config/envConfig");

const errorHandler = require("./middlewares/errorMiddleware");
const connectToDatabase = require("./config/database");

const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const adminRouter = require("./routes/adminRouter");
const doctorRouter = require("./routes/doctorRouter");
// const doctorRouter = require("./routes/doctorRouter");

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.options("*", cors()); // handles preflight requests
app.use(
  cors({
    origin: "https://mediconnect-zeta.vercel.app/",

    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to MediConnect" });
});

app.use((req, res, next) => {
  console.log("in the last route");
  const error = new Error(`⚠️! 404! Not found ${req.originalUrl}`);
  error.statusCode = 404;
  console.log("This is the error>", error.message);

  console.log("before sending error to the error handler");
  next(error);
});

app.use(errorHandler);

app.listen(PORT, async () => {
  await connectToDatabase();
  try {
    console.log(`App started working at PORT ${PORT}`);
  } catch (error) {
    console.log("Something went wrong", error.message);
  }
});
