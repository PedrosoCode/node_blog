const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { uploadImage, getUserImages, deleteImage } = require('../controllers/imageController');

router.post('/upload', verificarToken, upload.single('image'), uploadImage);
router.get('/images', verificarToken, getUserImages);
router.delete('/images/:id', verificarToken, deleteImage);

module.exports = router;
