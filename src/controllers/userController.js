const pool = require('../db/database');

const getUserInfo = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
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
};

module.exports = { getUserInfo };
