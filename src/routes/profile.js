const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profile');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, ProfileController.getProfile);
router.get('/applications', authMiddleware, ProfileController.getApplications);
router.get('/bookmarks', authMiddleware, ProfileController.getBookmarks);

module.exports = router;
