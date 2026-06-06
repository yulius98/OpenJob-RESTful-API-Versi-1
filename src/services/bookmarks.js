const { nanoid } = require('nanoid');
const BookmarksRepository = require('../repositories/bookmarks');
const { NotFoundError, ClientError } = require('../exceptions');

const BookmarksService = {
  async create({ userId, jobId }) {
    const existing = await BookmarksRepository.findByUserAndJob(userId, jobId);
    if (existing) {
      throw new ClientError('Bookmark already exists');
    }
    const id = `bookmark-${nanoid(16)}`;
    return BookmarksRepository.create({
      id,
      user_id: userId,
      job_id: jobId,
    });
  },

  async getById(id) {
    const bookmark = await BookmarksRepository.findById(id);
    if (!bookmark) {
      throw new NotFoundError('Bookmark not found');
    }
    return bookmark;
  },

  async getByUser(userId) {
    return BookmarksRepository.findByUser(userId);
  },

  async deleteByUserAndJob(userId, jobId) {
    const bookmark = await BookmarksRepository.findByUserAndJob(userId, jobId);
    if (!bookmark) {
      throw new NotFoundError('Bookmark not found');
    }
    return BookmarksRepository.deleteByUserAndJob(userId, jobId);
  },
};

module.exports = BookmarksService;
