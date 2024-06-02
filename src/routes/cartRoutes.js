const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const {
  adicionarAoCarrinho,
  obterCarrinho,
  removerDoCarrinho,
  criarPedido,
  obterPedidos,
  atualizarQuantidade 
} = require('../controllers/cartController');

router.post('/carrinho', verificarToken, adicionarAoCarrinho);
router.get('/carrinho', verificarToken, obterCarrinho);
router.delete('/carrinho/:itemId', verificarToken, removerDoCarrinho);
router.put('/carrinho/:itemId', verificarToken, atualizarQuantidade); // Adicionar a nova rota PUT

router.post('/pedido', verificarToken, criarPedido);
router.get('/pedidos', verificarToken, obterPedidos);

module.exports = router;
