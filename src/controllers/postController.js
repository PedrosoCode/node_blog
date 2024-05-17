const pool = require('../db/database');

const criarPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.usuario.id;
    const newPost = await pool.query(
      'INSERT INTO tb_posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, userId]
    );
    res.json(newPost.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const listarPosts = async (req, res) => {
  try {
    const allPosts = await pool.query('SELECT * FROM tb_posts');
    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const listarPostsDoUsuario = async (req, res) => {
  try {
    const userId = req.usuario.id;
    const posts = await pool.query('SELECT * FROM tb_posts WHERE user_id = $1', [userId]);
    res.json(posts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const atualizarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.usuario.id;

    const post = await pool.query('SELECT * FROM tb_posts WHERE id = $1 AND user_id = $2', [id, userId]);
    if (post.rows.length === 0) {
      return res.status(403).json('Ação proibida');
    }

    const updatedPost = await pool.query(
      'UPDATE tb_posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, id]
    );
    res.json(updatedPost.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deletarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.usuario.id;

    const post = await pool.query('SELECT * FROM tb_posts WHERE id = $1 AND user_id = $2', [id, userId]);
    if (post.rows.length === 0) {
      return res.status(403).json('Ação proibida');
    }

    await pool.query('DELETE FROM tb_posts WHERE id = $1', [id]);
    res.json('Post deletado com sucesso');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const obterPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query('SELECT * FROM tb_posts WHERE id = $1', [id]);
    if (post.rows.length === 0) {
      return res.status(404).json('Post não encontrado');
    }
    res.json(post.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  criarPost,
  listarPosts,
  atualizarPost,
  listarPostsDoUsuario,
  deletarPost,
  obterPost,
};
