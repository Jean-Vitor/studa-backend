const {
  registerService,
  loginService,
} = require('../service/user.service');

const getStatusAndMessageError = require('../utils/getStatusAndMessageError')

exports.register = async (req, res) => {
  const {
    body,
  } = req;

  try {
    const response = await registerService(body);
    res.status(201).send(response);
  } catch (err) {
    const {status, message} = getStatusAndMessageError(err)
    res.status(status).send({
      message,
    });
  }
};

exports.login = async (req, res) => {
  const {
    body,
  } = req;

  try {
    const response = await loginService(body);
    res.status(200).send({
      message: 'Successfully authenticated user',
      token: response,
    });
  } catch (err) {
    const {status, message} = getStatusAndMessageError(err)
    res.status(status).send({
      message,
    });
  }
};
