const VALIDATION_EXCEPTION = {
  INVALID_EMAIL: { code: 409, message: 'Validation error: email already exist' },
  INVALID_USER: { code: 409, message: 'Validation error: user does not exist' },
  INVALID_PASSWORD: { code: 400, message: 'Validation error: password is not valid' },
};

module.exports = VALIDATION_EXCEPTION;
