require('dotenv').config(); // Garanta que isso está no topo do arquivo principal
const express = require('express');
const pool = require('./src/db/database'); 
const app = express();
const cors = require('cors');
const port = 3042;
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Acesso negado. Nenhum token fornecido.');

  try {
    const verificado = jwt.verify(token, secret); // Usa a variável 'secret' que guarda o JWT_SECRET
    req.usuario = verificado;  // Adiciona os dados do usuário decodificados ao objeto req
    next();
  } catch (error) {
    res.status(400).send('Token inválido.');
  }
};
module.exports = { verificarToken };

// Exemplo de rota protegida
app.get('/dados-protegidos', verificarToken, (req, res) => {
  res.send('Acesso aos dados protegidos.');
});

const authRoutes = require('./src/routes/authRoutes');
const exemploRoutes = require('./src/routes/exemploRoutes');

app.use('/auth', authRoutes);
app.use(exemploRoutes);

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


