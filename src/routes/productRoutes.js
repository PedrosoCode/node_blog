const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { obterProduto, criarProduto, atualizarProduto, deletarProduto } = require('../controllers/productController');

router.get('/products', verificarToken, obterProduto);
router.post('/products', verificarToken, upload.single('image'), criarProduto);
router.put('/products/:id', verificarToken, atualizarProduto);
router.delete('/products/:id', verificarToken, deletarProduto);

module.exports = router;
