// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/database'); // Ajuste o caminho conforme necessário
const secret = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
    res.status(201).send({ user: result.rows[0] });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const isValid = await bcrypt.compare(password, result.rows[0].password);
      if (isValid) {
        const token = jwt.sign({ id: result.rows[0].id }, secret, { expiresIn: '1h' });
        res.send({ token });
      } else {
        res.status(401).send('Senha incorreta');
      }
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { registerUser, loginUser };
