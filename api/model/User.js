const Sequelize = require('sequelize');
const database = require('../config/db.config');

const User = database.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name cannot be empty!',
      },
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'The email must be valid!',
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return undefined;
    },
  },
});

module.exports = User;
