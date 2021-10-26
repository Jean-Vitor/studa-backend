const {
  findAllEventsService,
  findAllCompletedEventsService,
  createEventService,
  removeEventService,
  updateEventService,
  findOneEventService,
  completeEventService,
} = require('../service/event.service');

const getStatusAndMessageError = require('../utils/getStatusAndMessageError');

exports.createEvent = async (req, res) => {
  const {
    body,
    user,
  } = req;

  try {
    const response = await createEventService(body, user.id);
    res.status(201).send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.findAllEvents = async (req, res) => {
  const {
    user,
  } = req;

  try {
    const response = await findAllEventsService(user.id);
    res.send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.findAllCompletedEvents = async (req, res) => {
  const {
    user,
  } = req;

  try {
    const response = await findAllCompletedEventsService(user.id);
    res.send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.findOneEvent = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    const response = await findOneEventService(id, userId);
    res.send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const {
    body,
  } = req;

  try {
    const response = await updateEventService(id, body, userId);
    res.send(response);
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.removeEvent = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    await removeEventService(id, userId);
    res.status(200).send();
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};

exports.completeEvent = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  try {
    await completeEventService(id, userId);
    res.status(200).send();
  } catch (err) {
    const { status, message } = getStatusAndMessageError(err);
    res.status(status).send({
      message,
    });
  }
};
