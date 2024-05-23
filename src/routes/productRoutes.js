const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const { obterProduto } = require('../controllers/productController');

router.get('/products', obterProduto);

module.exports = router;
