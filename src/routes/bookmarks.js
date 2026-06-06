const express = require('express');
const router = express.Router();
const BookmarksController = require('../controllers/bookmarks');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, BookmarksController.getAll);

module.exports = router;
