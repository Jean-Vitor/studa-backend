const Sequelize = require('sequelize');

const database = new Sequelize('studa', 'docker', 'docker', {
  dialect: 'mysql',
  host: 'localhost',
  port: 9000,
});

module.exports = database;
