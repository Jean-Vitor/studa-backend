const httpException = require('../exception/http-exception');
const { NOT_FOUND, BAD_REQUEST } = require('../constants/http-exception.constant');
const {
  createRepository, removeRepository,
  findAllRepository, findAllCompletedRepository,
  findByPkRepository, updateRepository,
} = require('../repository/task.repository');
const isEmptyBody = require('../utils/isEmptyBody');

exports.createService = (body) => {
  if (isEmptyBody(body)) throw httpException(BAD_REQUEST);

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
  };

  return createRepository(newTask);
};

exports.removeService = async (id) => {
  const responseID = await removeRepository(id);
  if (!responseID) throw httpException(NOT_FOUND);
};

exports.findAllService = () => findAllRepository();

exports.findAllCompletedService = () => findAllCompletedRepository();

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
