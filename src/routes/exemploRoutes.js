const express = require('express');
const router = express.Router();
const pool = require('../db/database');
const { verificarToken } = require('../../index'); // Atualize o caminho para o local do seu arquivo principal do servidor


// Definição da rota
router.get('/dados', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM exemplo');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Adicione esta rota ao seu arquivo de rotas (exemploRoutes.js)
router.get('/usuario', verificarToken, async (req, res) => {
  try {
      const usuarioId = req.usuario.id; // Asegure-se que o 'id' do usuário esteja incluído no token
      const { rows } = await pool.query('SELECT id, username FROM users WHERE id = $1', [usuarioId]);
      if (rows.length > 0) {
          res.json(rows[0]);
      } else {
          res.status(404).send('Usuário não encontrado.');
      }
  } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar dados do usuário.');
  }
});


module.exports = router;
