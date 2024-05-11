const express = require('express');
const pool = require('./src/db/database'); // Certifique-se de que o pool está sendo usado corretamente nas rotas
const app = express();
const cors = require('cors');
const port = 3042;

app.use(express.json());
app.use(cors());

const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // "Bearer TOKEN_HERE"

  if (!token) return res.status(401).send('Acesso negado. Nenhum token fornecido.');

  try {
    const verificado = jwt.verify(token, 'seu_segredo_jwt');
    req.usuario = verificado;  // Adiciona os dados do usuário decodificados ao objeto req
    next();
  } catch (error) {
    res.status(400).send('Token inválido.');
  }
};

// Exemplo de rota protegida
app.get('/dados-protegidos', verificarToken, (req, res) => {
  res.send('Acesso aos dados protegidos.');
});



const authRoutes = require('./src/routes/authRoutes');
const exemploRoutes = require('./src/routes/exemploRoutes');

app.use('/auth', authRoutes);
// Middleware para interpretar JSON

// Usando as rotas modularizadas
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
