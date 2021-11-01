const httpException = require('../../api/exception/http-exception');
const { BAD_REQUEST } = require('../../api/constants/http-exception.constant');
const getStatusAndErrorMessage = require('../../api/utils/getStatusAndMessageError');

describe('Error status code and error message are processed correctly ', () => {
  it('Error with message and status code', () => {
    const ERROR = getStatusAndErrorMessage(httpException(BAD_REQUEST));

    expect(ERROR.status).toBe(400);
    expect(ERROR.message).toBe('Bad Request');
  });

  it('Error without message', () => {
    const ERROR = getStatusAndErrorMessage(httpException({ code: 409 }));

    expect(ERROR.status).toBe(409);
  });

  it('Error without status code', () => {
    const ERROR = getStatusAndErrorMessage(httpException({ message: 'Conflict error' }));

    expect(ERROR.status).toBe(500);
    expect(ERROR.message).toBe('Internal Server Error!');
  });

  it('Error without status code and message', () => {
    const ERROR = getStatusAndErrorMessage(httpException());

    expect(ERROR.status).toBe(500);
    expect(ERROR.message).toBe('Internal Server Error!');
  });
});
