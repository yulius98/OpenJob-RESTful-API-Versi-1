const UsersService = require('../services/users');

const UsersController = {
  async register(req, res, next) {
    try {
      const user = await UsersService.register(req.body);
      res.status(201).json({
        status: 'success',
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const user = await UsersService.getById(req.params.id);
      res.json({
        status: 'success',
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = UsersController;
