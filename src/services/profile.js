const UsersRepository = require('../repositories/users');
const ApplicationsRepository = require('../repositories/applications');
const BookmarksRepository = require('../repositories/bookmarks');

const ProfileService = {
  async getProfile(userId) {
    const user = await UsersRepository.findById(userId);
    return user;
  },

  async getApplications(userId) {
    return ApplicationsRepository.findByUser(userId);
  },

  async getBookmarks(userId) {
    return BookmarksRepository.findByUser(userId);
  },
};

module.exports = ProfileService;
