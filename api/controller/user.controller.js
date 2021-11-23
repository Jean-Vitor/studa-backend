const {
  registerService,
  loginService,
  removeUserService,
  updateUserService,
  updatePasswordUserService,
} = require('../service/user.service');

const getStatusAndMessageError = require('../utils/getStatusAndMessageError');

exports.register = async (req, res) => {
  const {
    body,
  } = req;

  try {
    const response = await registerService(body);
    res.status(201).send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
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
      token: response.token,
      user: response.user
    });
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.removeUser = async (req, res) => {
  const { id } = req.user;
  try {
    await removeUserService(id);
    res.status(200).send();
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const {
    body,
    user,
  } = req;

  try {
    const response = await updateUserService(user.id, body);
    res.send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.updatePasswordUser = async (req, res) => {
  const {
    body,
    user,
  } = req;

  try {
    const response = await updatePasswordUserService(user.id, body);
    res.send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.getUser = async (req, res) => {
  const {
    user,
  } = req;

  try {
    res.send(user);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};
