const authenticate = (req, res, next) => {
  try {
    console.log("Passed through auth middleware");

    next();
  } catch (error) {
    console.log(error);
    console.log(typeof error);
    next(error);
  }
};

module.exports = authenticate;
