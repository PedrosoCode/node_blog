const pool = require('../db/database');

const criarProduto = async (req, res) => {
  try {
    const { titulo, descricao , especificacoes_tecnicas, preco} = req.body;
    const userId = req.usuario.id;
    const newProduct = await pool.query(
      'INSERT INTO tb_produtos (titulo, descricao, especificacoes_tecnicas, preco, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [titulo, descricao, especificacoes_tecnicas, preco, userId]
    );
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const obterProduto = async (req, res) => {
  try {
    const allProducts = await pool.query('SELECT * FROM tb_produtos');
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, especificacoes_tecnicas, preco } = req.body;
    const userId = req.usuario.id;

    // Verificar se o produto pertence ao usuário autenticado
    const produto = await pool.query('SELECT * FROM tb_produtos WHERE id = $1 AND user_id = $2', [id, userId]);
    if (produto.rows.length === 0) {
      return res.status(403).json('Ação proibida');
    }

    const updatedProduct = await pool.query(
      'UPDATE tb_produtos SET titulo = $1, descricao = $2, especificacoes_tecnicas = $3, preco = $4 WHERE id = $5 RETURNING *',
      [titulo, descricao, especificacoes_tecnicas, preco, id]
    );
    res.json(updatedProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.usuario.id;

    // Verificar se o produto pertence ao usuário autenticado
    const produto = await pool.query('SELECT * FROM tb_produtos WHERE id = $1 AND user_id = $2', [id, userId]);
    if (produto.rows.length === 0) {
      return res.status(403).json('Ação proibida');
    }

    await pool.query('DELETE FROM tb_produtos WHERE id = $1', [id]);
    res.json('Produto deletado com sucesso');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};



module.exports = {
  obterProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto,
};
