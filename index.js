require('dotenv').config(); // Garanta que isso está no topo do arquivo principal
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3042;

const authRoutes = require('./src/routes/authRoutes');
const postRoutes = require('./src/routes/postRoutes');
const userRoutes = require('./src/routes/userRoutes');
const { verificarToken } = require('./src/middlewares/authMiddleware');

app.use(express.json());
app.use(cors());

// Use as rotas
app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);
app.use('/api', userRoutes);

// Exemplo de rota protegida
app.get('/dados-protegidos', verificarToken, (req, res) => {
  res.send('Acesso aos dados protegidos.');
});

// Middleware para rotas não encontradas
app.use((req, res, next) => {
  res.status(404).send("Desculpe, não encontramos essa rota!");
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo quebrou!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
