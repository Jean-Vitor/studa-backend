const express = require('express');

const app = express();
const cors = require('cors');

const PORT = 8000;
const database = require('./api/config/db.config');
const routes = require('./api/routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('studa backend');
});

database.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Acessar http://localhost:${PORT}`);
    console.log(`Servidor executando na porta ${PORT}`);
  });
});
