const pool = require('../db/database');

const criarCard = async (req, res) => {
  try {
    const { title, status } = req.body;
    const userId = req.usuario.id;
    const newCard = await pool.query(
      'INSERT INTO tb_cards (title, status, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, status, userId]
    );
    res.json(newCard.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const listarCards = async (req, res) => {
  try {
    const userId = req.usuario.id;
    const allCards = await pool.query('SELECT * FROM tb_cards WHERE user_id = $1', [userId]);
    res.json(allCards.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  criarCard,
  listarCards,
};
