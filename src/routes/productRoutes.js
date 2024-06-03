const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { obterProduto, criarProduto, atualizarProduto, deletarProduto, obterProdutoPorId } = require('../controllers/productController');

router.get('/products', verificarToken, obterProduto);
router.get('/products/:id', obterProdutoPorId);
router.post('/products', verificarToken, upload.single('image'), criarProduto);
router.put('/products/:id', verificarToken, atualizarProduto);
router.delete('/products/:id', verificarToken, deletarProduto);

module.exports = router;
