const validators = {
  isValidEmail: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  message: (input) => `${input.value} is not a valid user email`,
  isValidPhoneNo: (value) => /^\d{10}$/.test(value),
  isValidAge: (value) => value > 0 && value < 120,
  isValidPassword: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.text(value),
};

module.exports = validators;
