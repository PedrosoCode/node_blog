const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const { getUserInfo } = require('../controllers/userController');

router.get('/usuario', verificarToken, getUserInfo);

module.exports = router;
