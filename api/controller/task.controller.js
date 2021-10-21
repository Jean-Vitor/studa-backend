const {
  findAllService,
  findAllCompletedService,
  createService,
  removeService,
  updateService,
  findByPkService,
  completeTaskService,
} = require('../service/task.service');

const getStatusAndMessageError = require('../utils/getStatusAndMessageError');

exports.create = async (req, res) => {
  const {
    body,
    user,
  } = req;

  try {
    const response = await createService(body, user.id);
    res.status(201).send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.findAll = async (req, res) => {
  const {
    user,
  } = req;
  console.log('lalalalala');
  console.log(user);

  try {
    const response = await findAllService(user.id);
    res.send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.findAllCompleted = async (req, res) => {
  const {
    user,
  } = req;

  try {
    const response = await findAllCompletedService(user.id);
    console.log(response);
    res.send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.findOne = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const response = await findByPkService(id, userId);
    res.send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const {
    body,
  } = req;

  try {
    const response = await updateService(id, body, userId);
    res.send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    await removeService(id, userId);
    res.status(200).send();
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.completeTask = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    await completeTaskService(id, userId);
    res.status(200).send();
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};
