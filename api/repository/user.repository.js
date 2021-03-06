const User = require('../model/User');

exports.registerRepository = (newUser) => User.create(newUser);

exports.findOneUserRepository = (filter) => User.findOne(filter);

exports.findUserByPkRepository = (id) => User.findByPk(id);

exports.removeUserRepository = (id) => User.destroy({
  where: {
    id,
  },
});

exports.updateUserRepository = (id, body) => User.update(body, {
  where: {
    id,
  },
});
