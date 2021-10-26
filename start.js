const app = require('./server');

const PORT = 8000;
const database = require('./api/config/db.config');

(async () => {
  await database.sync({ force: true });
  await app.listen(PORT);
})();

module.exports = app;
