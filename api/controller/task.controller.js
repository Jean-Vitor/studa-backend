const {
  findAllService,
  findAllCompletedService,
  createService,
  removeService,
  updateService,
  findByPkService,
} = require('../service/task.service');

const getStatusAndMessageError = require('../utils/getStatusAndMessageError')

exports.create = async (req, res) => {
  const {
    body,
  } = req;

  try {
    const response = await createService(body);
    res.status(201).send(response);
  } catch (err) {
    const {status, message} = getStatusAndMessageError(err)
    res.status(status).send({
      message,
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const response = await findAllService();
    res.send(response);
  } catch (err) {
    const {status, message} = getStatusAndMessageError(err)
    res.status(status).send({
      message,
    });
  }
};

exports.findAllCompleted = async (req, res) => {
  try {
    const response = await findAllCompletedService();
    res.send(response);
  } catch (err) {
    const {status, message} = getStatusAndMessageError(err)
    res.status(status).send({
      message,
    });
  }
};

exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await findByPkService(id);
    res.send(response);
  } catch (err) {
    const {status, message} = getStatusAndMessageError(err)
    res.status(status).send({
      message,
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const {
    body,
  } = req;

  try {
    const response = await updateService(id, body);
    res.send(response);
  } catch (err) {
    const {status, message} = getStatusAndMessageError(err)
    res.status(status).send({
      message,
    });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    await removeService(id);
    res.status(200).send();
  } catch (err) {
    const {status, message} = getStatusAndMessageError(err)
    res.status(status).send({
      message,
    });
  }
};
