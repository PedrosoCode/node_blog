const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const { criarArma, buscaArmas } = require('../controllers/weaponController');

router.post('/weapons', verificarToken, criarArma);
router.get('/weapons', verificarToken, buscaArmas); // Nova rota para buscar as armas'

module.exports = router;
