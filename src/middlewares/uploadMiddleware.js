const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Garantir que a pasta uploads exista
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const userId = req.usuario.id;
    cb(null, `${userId}-${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

module.exports = upload;
