const httpException = require('../exception/http-exception');
const { NOT_FOUND, BAD_REQUEST, UNAUTHORIZED } = require('../constants/http-exception.constant');
const {
  createEventRepository, removeEventRepository,
  findAllEventsRepository, findAllCompletedEventsRepository,
  findEventByPkRepository, updateEventRepository,
  findOneEventRepository, completeEventRepository,
} = require('../repository/event.repository');
const isEmptyBody = require('../utils/isEmptyBody');

exports.createEventService = (body, userId) => {
  if (isEmptyBody(body)) throw httpException(BAD_REQUEST);

  const {

  } = body;

  const newEvent = {

    userId,
  };

  return createEventRepository(newEvent);
};

exports.findAllEventsService = (userId) => findAllEventsRepository(userId);

exports.findAllCompletedEventsService = (userId) => findAllCompletedEventsRepository(userId);

exports.findOneEventService = async (id, userId) => {
  const isEventOwner = await findOneEventRepository({ where: { id, userId } });
  if (!isEventOwner) throw httpException(UNAUTHORIZED);

  const data = await findEventByPkRepository(id);

  if (!data) throw httpException(NOT_FOUND);

  return data;
};

exports.removeEventService = async (id, userId) => {
  const isEventOwner = await findOneEventRepository({ where: { id, userId } });
  if (!isEventOwner) throw httpException(UNAUTHORIZED);

  const responseID = await removeEventRepository(id);
  if (!responseID) throw httpException(NOT_FOUND);
};

exports.updateEventService = async (id, body, userId) => {
  const isEventOwner = await findOneEventRepository({ where: { id, userId } });
  if (!isEventOwner) throw httpException(UNAUTHORIZED);

  if (isEmptyBody(body)) throw httpException(BAD_REQUEST);

  const [responseID] = await updateEventRepository(id, body);
  if (!responseID) throw httpException(NOT_FOUND);
};

exports.completeEventService = async (id, userId) => {
  const isEventOwner = await findOneEventRepository({ where: { id, userId } });
  if (!isEventOwner) throw httpException(UNAUTHORIZED);

  const [responseID] = await completeEventRepository(id);
  if (!responseID) throw httpException(NOT_FOUND);
};
