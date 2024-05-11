const express = require('express');
const router = express.Router();
const pool = require('../db/database');

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

module.exports = router;
