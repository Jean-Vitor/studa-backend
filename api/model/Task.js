const Sequelize = require('sequelize');
const database = require('../config/db.config');
const User = require('./User');

function getYesterdayDate() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().slice(0, 10);
}

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
    validate: {
      notEmpty: {
        msg: 'Title cannot be empty!',
      },
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Description cannot be empty!',
      },
    },
  },
  priority: {
    type: Sequelize.ENUM('LOW', 'HIGH'),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'You must choose the type of priority!',
      },
    },
  },
  conclusionDate: {
    type: Sequelize.DATE,
    validate: {
      isAfter: getYesterdayDate(),
      isDate: true,
    },
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

Task.belongsTo(User, {
  constraint: true,
  onDelete: 'cascade',
});

User.hasMany(Task, {
  constraint: true,
});

module.exports = Task;
