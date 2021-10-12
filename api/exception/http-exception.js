const EXCEPTIONS = require('../constants/http-exception.constant');

const { INTERNAL_SERVER_ERROR } = EXCEPTIONS;

const httpException = (error) => {
  const newError = new Error();
  const {
    code,
    message: objMessage,
    status: errorStatus,
  } = error;
  const isError = error instanceof Error;

  if (isError && errorStatus) {
    return error;
  }

  if (code && objMessage) {
    newError.status = code;
    newError.message = objMessage;
    return newError;
  }

  newError.status = INTERNAL_SERVER_ERROR.STATUS;
  newError.message = INTERNAL_SERVER_ERROR.MESSAGE;
  return newError;
};

module.exports = httpException;
