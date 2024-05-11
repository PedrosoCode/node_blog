const express = require('express');
const pool = require('./src/db/SQL/database'); // Certifique-se de que o pool está sendo usado corretamente nas rotas
const app = express();
const port = 3042;

const exemploRoutes = require('./src/routes/exemploRoutes');

// Middleware para interpretar JSON
app.use(express.json());

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
