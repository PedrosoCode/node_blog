const pool = require('../db/database');


const obterProduto = async (req, res) => {
  try {
    const allProducts = await pool.query('SELECT * FROM tb_produtos');
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


module.exports = {
  obterProduto,
};
