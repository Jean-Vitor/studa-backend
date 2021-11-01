const EXCEPTIONS = require('../constants/http-exception.constant');

const { INTERNAL_SERVER_ERROR } = EXCEPTIONS;

const httpException = (error) => {
  const newError = new Error();
  const isError = error instanceof Error;

  const errorStatus = error?.status;

  if (isError && errorStatus) {
    return error;
  }

  const code = error?.code;
  const errorMessage = error?.message;

  if (!errorStatus && !errorMessage && code) {
    newError.status = code;
    return newError;
  }

  if (!errorStatus && errorMessage && code) {
    newError.status = code;
    newError.message = errorMessage;
    return newError;
  }

  newError.status = INTERNAL_SERVER_ERROR.STATUS;
  newError.message = INTERNAL_SERVER_ERROR.MESSAGE;
  return newError;
};

module.exports = httpException;
