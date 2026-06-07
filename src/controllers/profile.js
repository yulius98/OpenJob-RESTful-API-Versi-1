const ProfileService = require('../services/profile');

const ProfileController = {
  async getProfile(req, res, next) {
    try {
      const { id: userId } = req.user;
      const user = await ProfileService.getProfile(userId);
      res.json({
        status: "success",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },

  async getApplications(req, res, next) {
    try {
      const { id: userId } = req.user;
      const applications = await ProfileService.getApplications(userId);
      res.json({
        status: "success",
        data: { applications },
      });
    } catch (err) {
      next(err);
    }
  },

  async getBookmarks(req, res, next) {
    try {
      const { id: userId } = req.user;
      const bookmarks = await ProfileService.getBookmarks(userId);
      res.json({
        status: 'success',
        data: { bookmarks },
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ProfileController;
