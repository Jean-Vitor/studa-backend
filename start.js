const app = require('./server');

const PORT = 8000;
const database = require('./api/config/db.config');

(async () => {
  await database.sync();
  await app.listen(PORT);
  console.log('Database on')
  console.log('Listen on port 8000');
})();

module.exports = app;
