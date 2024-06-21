const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const { criarCard, listarCards } = require('../controllers/cardController');

router.post('/cards', verificarToken, criarCard);
router.get('/cards', verificarToken, listarCards);

module.exports = router;
