const express = require('express');
const pool = require('./database');
const app = express();
const port = 3042;

app.get('/dados', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM exemplo');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
