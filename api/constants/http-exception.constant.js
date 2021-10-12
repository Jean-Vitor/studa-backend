const EXCEPTIONS = {
  NOT_FOUND: {
    code: 404,
    message: 'Not Found',
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Internal Server Error',
  },
  UNAUTHORIZED: {
    code: 401,
    message: 'Authentication failed.',
  },
  BAD_REQUEST: {
    code: 400,
    message: 'Bad Request',
  },
};

module.exports = EXCEPTIONS;
