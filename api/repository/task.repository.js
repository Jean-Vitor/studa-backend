const { Op } = require('sequelize');
const Task = require('../model/Task');

exports.createTaskRepository = (newTask) => Task.create(newTask);

exports.findTaskByPkRepository = (id) => Task.findByPk(id);

exports.findOneTaskRepository = (filter) => Task.findOne(filter);

exports.findAllTasksRepository = (id) => Task.findAll({
  where: {
    userId: id,
  },
});

exports.findAllCompletedTasksRepository = (id) => Task.findAll({
  where: {
    [Op.and]:
      [
        { completed: { [Op.is]: true } },
        { userId: id },
      ],
  },
});

exports.updateTaskRepository = (id, body) => Task.update(body, {
  where: {
    id,
  },
});

exports.removeTaskRepository = (id) => Task.destroy({
  where: {
    id,
  },
});

exports.completeTaskRepository = (id) => Task.update({
  completed: true,
},
{
  where: {
    id,
  },
});
