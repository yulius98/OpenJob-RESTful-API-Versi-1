const CategoriesService = require('../services/categories');

const CategoriesController = {
  async create(req, res, next) {
    try {
      const category = await CategoriesService.create(req.body);
      res.status(201).json({
        status: "success",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const categories = await CategoriesService.getAll();
      res.json({
        status: 'success',
        data: { categories },
      });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const category = await CategoriesService.getById(req.params.id);
      res.json({
        status: "success",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const category = await CategoriesService.update(req.params.id, req.body);
      res.json({
        status: 'success',
        data: { category },
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await CategoriesService.delete(req.params.id);
      res.json({
        status: 'success',
        message: 'Category deleted',
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = CategoriesController;
