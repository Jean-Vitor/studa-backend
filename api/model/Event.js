const Sequelize = require('sequelize');
const database = require('../config/db.config');
const Tag = require('./Tag')
const User = require('./User')
 
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
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    startDate: {
        type: Sequelize.DATE,
    },
    endDate: {
        type: Sequelize.DATE,
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
})

Event.belongsTo(Tag)

Event.belongsTo(User, {
    constraint: true,
    onDelete: 'cascade',
})

module.exports = Event;