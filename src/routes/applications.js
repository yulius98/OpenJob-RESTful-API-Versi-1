const express = require('express');
const router = express.Router();
const ApplicationsController = require('../controllers/applications');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validation');
const { createApplicationSchema, updateApplicationSchema } = require('../validations/applications');

router.post('/', authMiddleware, validate(createApplicationSchema), ApplicationsController.create);
router.get('/', authMiddleware, ApplicationsController.getAll);
router.get('/:id', authMiddleware, ApplicationsController.getById);
router.get('/user/:userId', authMiddleware, ApplicationsController.getByUser);
router.get('/job/:jobId', authMiddleware, ApplicationsController.getByJob);
router.put('/:id', authMiddleware, validate(updateApplicationSchema), ApplicationsController.update);
router.delete('/:id', authMiddleware, ApplicationsController.delete);

module.exports = router;
