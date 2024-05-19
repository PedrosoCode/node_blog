const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/adminMiddleware');
const { obterFooterContent, atualizarFooterContent } = require('../controllers/footerController');

router.get('/footer', obterFooterContent);
router.put('/footer', verificarToken, verificarAdmin, atualizarFooterContent);

module.exports = router;
