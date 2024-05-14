const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const { criarPost, listarPosts, atualizarPost, deletarPost, obterPost } = require('../controllers/postController');

router.post('/posts', verificarToken, criarPost);
router.get('/posts', listarPosts);
router.get('/posts/:id', verificarToken, obterPost);
router.put('/posts/:id', verificarToken, atualizarPost);
router.delete('/posts/:id', verificarToken, deletarPost);

module.exports = router;
