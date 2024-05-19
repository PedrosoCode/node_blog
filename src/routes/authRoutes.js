const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyToken } = require('../controllers/authController');
const { verificarToken } = require('../middlewares/authMiddleware'); 

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/verifyToken', verificarToken, verifyToken); 

module.exports = router;
