const JobsService = require('../services/jobs');

const JobsController = {
  async create(req, res, next) {
    try {
      const job = await JobsService.create(req.body);
      res.status(201).json({
        status: 'success',
        data: job,
      });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const { title, 'company-name': company_name } = req.query;
      const jobs = await JobsService.getAll({ title, company_name });
      res.json({
        status: 'success',
        data: { jobs },
      });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const job = await JobsService.getById(req.params.id);
      res.json({
        status: 'success',
        data: job,
      });
    } catch (err) {
      next(err);
    }
  },

  async getByCompany(req, res, next) {
    try {
      const jobs = await JobsService.getByCompany(req.params.companyId);
      res.json({
        status: 'success',
        data: { jobs },
      });
    } catch (err) {
      next(err);
    }
  },

  async getByCategory(req, res, next) {
    try {
      const jobs = await JobsService.getByCategory(req.params.categoryId);
      res.json({
        status: 'success',
        data: { jobs },
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const job = await JobsService.update(req.params.id, req.body);
      res.json({
        status: 'success',
        data: { job },
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await JobsService.delete(req.params.id);
      res.json({
        status: 'success',
        message: 'Job deleted',
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = JobsController;
