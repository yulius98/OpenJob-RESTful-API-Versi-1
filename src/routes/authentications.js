const express = require('express');
const router = express.Router();
const AuthenticationsController = require('../controllers/authentications');
const validate = require('../middleware/validation');
const { loginSchema, refreshTokenSchema } = require('../validations/users');
const authMiddleware = require('../middleware/auth');

router.post('/', validate(loginSchema), AuthenticationsController.login);
router.put('/', validate(refreshTokenSchema), AuthenticationsController.refresh);
router.delete('/', authMiddleware, AuthenticationsController.logout);

module.exports = router;
