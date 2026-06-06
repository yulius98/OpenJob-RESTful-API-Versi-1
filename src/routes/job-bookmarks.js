const express = require('express');
const router = express.Router({ mergeParams: true });
const BookmarksController = require('../controllers/bookmarks');
const authMiddleware = require('../middleware/auth');

router.post('/bookmark', authMiddleware, BookmarksController.create);
router.get('/bookmark/:id', authMiddleware, BookmarksController.getById);
router.delete('/bookmark', authMiddleware, BookmarksController.deleteByUserAndJob);

module.exports = router;
