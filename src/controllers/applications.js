const ApplicationsService = require('../services/applications');

const ApplicationsController = {
  async create(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { job_id, cover_letter } = req.body;
      const application = await ApplicationsService.create({ userId, jobId: job_id, cover_letter });
      res.status(201).json({
        status: 'success',
        data: { application },
      });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const applications = await ApplicationsService.getAll();
      res.json({
        status: 'success',
        data: { applications },
      });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const application = await ApplicationsService.getById(req.params.id);
      res.json({
        status: 'success',
        data: { application },
      });
    } catch (err) {
      next(err);
    }
  },

  async getByUser(req, res, next) {
    try {
      const applications = await ApplicationsService.getByUser(req.params.userId);
      res.json({
        status: 'success',
        data: { applications },
      });
    } catch (err) {
      next(err);
    }
  },

  async getByJob(req, res, next) {
    try {
      const applications = await ApplicationsService.getByJob(req.params.jobId);
      res.json({
        status: 'success',
        data: { applications },
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const application = await ApplicationsService.update(req.params.id, req.body);
      res.json({
        status: 'success',
        data: { application },
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await ApplicationsService.delete(req.params.id);
      res.json({
        status: 'success',
        message: 'Application deleted',
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ApplicationsController;
