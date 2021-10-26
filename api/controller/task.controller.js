const {
  findAllTasksService,
  findAllCompletedTasksService,
  createTaskService,
  removeTaskService,
  updateTaskService,
  completeTaskService,
  findOneTaskService,
} = require('../service/task.service');

const getStatusAndMessageError = require('../utils/getStatusAndMessageError');
const { findOneTask } = require('./task.controller');

exports.createTask = async (req, res) => {
  const {
    body,
    user,
  } = req;

  try {
    const response = await createTaskService(body, user.id);
    res.status(201).send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.findAllTasks = async (req, res) => {
  const {
    user,
  } = req;
  console.log('lalalalala');
  console.log(user);

  try {
    const response = await findAllTasksService(user.id);
    res.send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.findAllCompletedTasks = async (req, res) => {
  const {
    user,
  } = req;

  try {
    const response = await findAllCompletedTasksService(user.id);
    console.log(response);
    res.send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.findOneTask = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const response = await findOneTaskService(id, userId);
    res.send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const {
    body,
  } = req;

  try {
    const response = await updateTaskService(id, body, userId);
    res.send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.removeTask = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    await removeTaskService(id, userId);
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
