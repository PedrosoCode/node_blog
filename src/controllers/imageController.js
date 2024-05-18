const fs = require('fs');
const path = require('path');
const pool = require('../db/database');

const uploadImage = async (req, res) => {
  try {
    const userId = req.usuario.id;
    const imagePath = `/uploads/${req.file.filename}`; // Ajustar para caminho relativo
    const newImage = await pool.query(
      'INSERT INTO tb_images (user_id, path) VALUES ($1, $2) RETURNING *',
      [userId, imagePath]
    );
    res.json(newImage.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getUserImages = async (req, res) => {
  try {
    const userId = req.usuario.id;
    console.log('User ID:', userId); // Log para verificar o ID do usuário
    const images = await pool.query('SELECT * FROM tb_images WHERE user_id = $1', [userId]);
    res.json(images.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.usuario.id;
    const image = await pool.query('SELECT * FROM tb_images WHERE id = $1 AND user_id = $2', [id, userId]);
    if (image.rows.length === 0) {
      return res.status(403).json('Ação proibida');
    }

    const imagePath = path.join(__dirname, '..', '..', image.rows[0].path);
    console.log('Caminho da imagem:', imagePath); // Log para verificar o caminho do arquivo

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    } else {
      console.error('Arquivo não encontrado:', imagePath);
    }

    await pool.query('DELETE FROM tb_images WHERE id = $1', [id]);
    res.json('Imagem deletada com sucesso');
  } catch (err) {
    console.error('Erro ao deletar a imagem:', err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  uploadImage,
  getUserImages,
  deleteImage
};
