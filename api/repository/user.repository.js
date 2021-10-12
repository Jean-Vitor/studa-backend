const User = require('../model/User');

exports.registerRepository = (newUser) => User.create(newUser);

exports.findOneRepository = (filter) => User.findOne(filter);
