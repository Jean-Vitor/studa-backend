const Sequelize = require('sequelize');
const database = require('../config/db.config');

const Task = database.define('task', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  priority: {
    type: Sequelize.ENUM('LOW', 'HIGH'),
    allowNull: false,
  },
  conclusionDate: {
    type: Sequelize.DATE,
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Task;
