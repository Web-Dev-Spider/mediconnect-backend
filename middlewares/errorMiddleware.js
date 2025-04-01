const errorHandler = (err, req, res, next) => {
  console.log("Error received at Error handler", err);
  //handling error wich have no status code and messages...//all unhandled errors
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server error";

  //Handling mongoose errors

  //Handling mongoose bad objectID
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resourse ID";
  }

  //Handling mongoose validation errors
  if (err.name === "ValidatorError") {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.join("\n"));
  }

  //Handling mongoose duplicate key error
  if (err.code === "11000") {
    statusCode = 400;
    message = "Duplicate field values";
  }

  res.status(400).json({ success: false, message });
  next();
};

module.exports = errorHandler;
