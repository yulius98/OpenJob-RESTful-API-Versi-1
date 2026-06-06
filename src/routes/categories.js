const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categories');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validation');
const { createCategorySchema, updateCategorySchema } = require('../validations/categories');

router.get('/', CategoriesController.getAll);
router.get('/:id', CategoriesController.getById);
router.post('/', authMiddleware, validate(createCategorySchema), CategoriesController.create);
router.put('/:id', authMiddleware, validate(updateCategorySchema), CategoriesController.update);
router.delete('/:id', authMiddleware, CategoriesController.delete);

module.exports = router;
