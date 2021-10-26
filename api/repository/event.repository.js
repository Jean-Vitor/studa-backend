const { Op } = require('sequelize');
const Event = require('../model/Event');

exports.createEventRepository = (newEvent) => Event.create(newEvent);

exports.findEventByPkRepository = (id) => Event.findByPk(id);

exports.findOneEventRepository = (filter) => Event.findOne(filter);

exports.findAllEventsRepository = (id) => Event.findAll({
  where: {
    userId: id,
  },
});

exports.findAllCompletedEventsRepository = (id) => Event.findAll({
  where: {
    [Op.and]:
      [
        { completed: { [Op.is]: true } },
        { userId: id },
      ],
  },
});

exports.updateEventRepository = (id, body) => Event.update(body, {
  where: {
    id,
  },
});

exports.removeEventRepository = (id) => Event.destroy({
  where: {
    id,
  },
});

exports.completeEventRepository = (id) => Event.update({
  completed: true,
},
{
  where: {
    id,
  },
});
