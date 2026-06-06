const express = require('express');
const router = express.Router();
const CompaniesController = require('../controllers/companies');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validation');
const { createCompanySchema, updateCompanySchema } = require('../validations/companies');

router.get('/', CompaniesController.getAll);
router.get('/:id', CompaniesController.getById);
router.post('/', authMiddleware, validate(createCompanySchema), CompaniesController.create);
router.put('/:id', authMiddleware, validate(updateCompanySchema), CompaniesController.update);
router.delete('/:id', authMiddleware, CompaniesController.delete);

module.exports = router;
