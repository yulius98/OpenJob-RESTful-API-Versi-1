const express = require('express');
const router = express.Router();
const DocumentsController = require('../controllers/documents');
const authMiddleware = require('../middleware/auth');
const upload = require('../utils/upload');

router.get('/', DocumentsController.getAll);
router.get('/:id', DocumentsController.getById);
router.post('/', authMiddleware, upload.single('document'), DocumentsController.create);
router.delete('/:id', authMiddleware, DocumentsController.delete);

module.exports = router;
