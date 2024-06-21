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

const atualizarCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.usuario.id;

    const card = await pool.query('SELECT * FROM tb_cards WHERE id = $1 AND user_id = $2', [id, userId]);
    if (card.rows.length === 0) {
      return res.status(403).json('Ação proibida');
    }

    const updatedCard = await pool.query(
      'UPDATE tb_cards SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json(updatedCard.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  criarCard,
  listarCards,
  atualizarCard,
};
