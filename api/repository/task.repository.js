const Task = require('../model/Task');

exports.createRepository = (newTask) => Task.create(newTask);

exports.findByPkRepository = (id) => Task.findByPk(id);

exports.findAllRepository = (id) => Task.findAll({
  where: {
    userId: id,
  },
});

exports.findAllCompletedRepository = () => Task.findAll({
  where: {
    completed: true,
  },
});

exports.updateRepository = (id, body) => Task.update(body, {
  where: {
    id,
  },
});

exports.removeRepository = (id) => Task.destroy({
  where: {
    id,
  },
});

exports.completeTaskRepository = (id) => Task.update({ // aqui
  completed: true,
},
{
  where: {
    id,
  },
});
