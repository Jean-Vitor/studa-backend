const httpException = require('../exception/http-exception');
const { NOT_FOUND, BAD_REQUEST, UNAUTHORIZED } = require('../constants/http-exception.constant');
const {
  createTaskRepository, removeTaskRepository,
  findAllTasksRepository, findAllCompletedTasksRepository,
  findTaskByPkRepository, updateTaskRepository,
  findOneTaskRepository, completeTaskRepository,
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

  return createTaskRepository(newTask);
};

exports.findAllService = (userId) => findAllTasksRepository(userId);

exports.findAllCompletedService = (userId) => findAllCompletedTasksRepository(userId);

exports.findByPkService = async (id) => {
  const data = await findTaskByPkRepository(id);

  if (!data) throw httpException(NOT_FOUND);

  return data;
};

exports.removeService = async (id, userId) => {
  const isTaskOwner = await findOneTaskRepository({ where: { id, userId } });
  if (!isTaskOwner) throw httpException(UNAUTHORIZED);

  const responseID = await removeTaskRepository(id);
  if (!responseID) throw httpException(NOT_FOUND);
};

exports.updateService = async (id, body, userId) => {
  const isTaskOwner = await findOneTaskRepository({ where: { id, userId } });
  if (!isTaskOwner) throw httpException(UNAUTHORIZED);

  if (isEmptyBody(body)) throw httpException(BAD_REQUEST);

  const [responseID] = await updateTaskRepository(id, body);
  if (!responseID) throw httpException(NOT_FOUND);
};

exports.completeTaskService = async (id, userId) => {
  const isTaskOwner = await findOneTaskRepository({ where: { id, userId } });
  if (!isTaskOwner) throw httpException(UNAUTHORIZED);

  const [responseID] = await completeTaskRepository(id);
  if (!responseID) throw httpException(NOT_FOUND);
};
