const Sequelize = require('sequelize');
const database = require('../config/db.config');
const Tag = require('./Tag');
const User = require('./User');

const Event = database.define('event', {
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
  startDate: {
    type: Sequelize.DATE,
    allowNull: false,

    isGreaterThanEndDate(value) {
      if (Date.parse(value) > Date.parse(this.endDate)) {
        throw new Error('Start date must be minor than end date.');
      }
    },
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false,

    isLessThanStartDate(value) {
      if (Date.parse(value) < Date.parse(this.startDate)) {
        throw new Error('End date must be greater than start date.');
      }
    },
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

Event.belongsTo(Tag);

Event.belongsTo(User, {
  constraint: true,
  onDelete: 'cascade',
});

module.exports = Event;
