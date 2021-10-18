const Sequelize = require('sequelize');
const database = require('../config/db.config');
 
const Tag = database.define('tag', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

 
module.exports = Tag;