import express from 'express';
const app = express();
import cors from 'cors';
const PORT = 8000;

app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Studa backend')
})

app.listen(PORT, () => {
    console.log(`Acessar http://localhost:${PORT}`);
    console.log(`Servidor executando na porta ${PORT}`);
});
