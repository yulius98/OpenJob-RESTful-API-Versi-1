const BookmarksService = require('../services/bookmarks');

const BookmarksController = {
  async create(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { jobId } = req.params;
      const bookmark = await BookmarksService.create({ userId, jobId });
      res.status(201).json({
        status: "success",
        data: bookmark,
      });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const bookmark = await BookmarksService.getById(req.params.id);
      res.json({
        status: 'success',
        data: bookmark,
      });
    } catch (err) {
      next(err);
    }
  },

  async deleteByUserAndJob(req, res, next) {
    try {
      const { id: userId } = req.user;
      const { jobId } = req.params;
      await BookmarksService.deleteByUserAndJob(userId, jobId);
      res.json({
        status: 'success',
        message: 'Bookmark deleted',
      });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const { id: userId } = req.user;
      const bookmarks = await BookmarksService.getByUser(userId);
      res.json({
        status: 'success',
        data: { bookmarks },
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = BookmarksController;
