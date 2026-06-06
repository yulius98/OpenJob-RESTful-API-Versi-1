const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');
const { registerUserSchema } = require('../validations/users');
const validate = require('../middleware/validation');

router.post('/', validate(registerUserSchema), UsersController.register);
router.get('/:id', UsersController.getById);

module.exports = router;
