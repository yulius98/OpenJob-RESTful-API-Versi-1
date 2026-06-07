const CompaniesService = require('../services/companies');

const CompaniesController = {
  async create(req, res, next) {
    try {
      const company = await CompaniesService.create(req.body);
      res.status(201).json({
        status: "success",
        data: company,
      });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const companies = await CompaniesService.getAll();
      res.json({
        status: "success",
        data: { companies },
      });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const company = await CompaniesService.getById(req.params.id);
      res.json({
        status: "success",
        data: company,
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const company = await CompaniesService.update(req.params.id, req.body);
      res.json({
        status: "success",
        message: "Company updated successfully",
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await CompaniesService.delete(req.params.id);
      res.json({
        status: 'success',
        message: 'Company deleted',
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = CompaniesController;
