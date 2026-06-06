const express = require('express');
const router = express.Router();
const JobsController = require('../controllers/jobs');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validation');
const { createJobSchema, updateJobSchema } = require('../validations/jobs');

router.get('/', JobsController.getAll);
router.get('/company/:companyId', JobsController.getByCompany);
router.get('/category/:categoryId', JobsController.getByCategory);
router.get('/:id', JobsController.getById);
router.post('/', authMiddleware, validate(createJobSchema), JobsController.create);
router.put('/:id', authMiddleware, validate(updateJobSchema), JobsController.update);
router.delete('/:id', authMiddleware, JobsController.delete);

module.exports = router;
