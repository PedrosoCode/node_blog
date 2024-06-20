
const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const { criarArma } = require('../controllers/weaponController');

router.post('/weapons', verificarToken, criarArma);

module.exports = router;
