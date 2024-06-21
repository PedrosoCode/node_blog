const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const { criarCard, listarCards, atualizarCard } = require('../controllers/cardController');

router.post('/cards', verificarToken, criarCard);
router.get('/cards', verificarToken, listarCards)
router.put('/cards/:id', verificarToken, atualizarCard);;

module.exports = router;
