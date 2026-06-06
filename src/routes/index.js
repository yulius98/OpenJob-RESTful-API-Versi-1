const express = require('express');
const router = express.Router();

const usersRoutes = require('./users');
const companiesRoutes = require('./companies');
const categoriesRoutes = require('./categories');
const jobsRoutes = require('./jobs');
const applicationsRoutes = require('./applications');
const bookmarksRoutes = require('./bookmarks');
const jobBookmarksRoutes = require('./job-bookmarks');
const authenticationsRoutes = require('./authentications');
const profileRoutes = require('./profile');
const documentsRoutes = require('./documents');

router.use('/users', usersRoutes);
router.use('/companies', companiesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/jobs', jobsRoutes);
router.use('/jobs/:jobId', jobBookmarksRoutes);
router.use('/applications', applicationsRoutes);
router.use('/bookmarks', bookmarksRoutes);
router.use('/authentications', authenticationsRoutes);
router.use('/profile', profileRoutes);
router.use('/documents', documentsRoutes);

module.exports = router;
