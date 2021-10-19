const httpException = require('../exception/http-exception');
const { NOT_FOUND, BAD_REQUEST } = require('../constants/http-exception.constant');
const {
  createRepository, removeRepository,
  findAllRepository, findAllCompletedRepository,
  findByPkRepository, updateRepository,
} = require('../repository/task.repository');
const isEmptyBody = require('../utils/isEmptyBody');

exports.createService = (body, user) => {
  if (isEmptyBody(body)) throw httpException(BAD_REQUEST);

  const { id } = user;

  const {
    title,
    description,
    priority,
    conclusionDate,
  } = body;

  const newTask = {
    title,
    description,
    priority,
    conclusionDate,
    userId: id,
  };

  return createRepository(newTask);
};

exports.removeService = async (id) => {
  const responseID = await removeRepository(id);
  if (!responseID) throw httpException(NOT_FOUND);
};

exports.findAllService = (userId) => findAllRepository(userId);

exports.findAllCompletedService = (userId) => findAllCompletedRepository(userId);

exports.findByPkService = async (id) => {
  const data = await findByPkRepository(id);

  if (!data) throw httpException(NOT_FOUND);

  return data;
};

exports.updateService = async (id, body) => {
  if (isEmptyBody(body)) throw httpException(BAD_REQUEST);

  const [responseID] = await updateRepository(id, body);
  if (!responseID) throw httpException(NOT_FOUND);
};
