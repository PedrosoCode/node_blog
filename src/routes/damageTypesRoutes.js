const express = require('express');
const router = express.Router();
const { listarTiposDeDano } = require('../controllers/damageTypesController');
const { criarArma } = require('../controllers/weaponController');

router.get('/damage-types', listarTiposDeDano);

module.exports = router;