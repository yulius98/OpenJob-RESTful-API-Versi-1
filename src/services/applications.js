const { nanoid } = require('nanoid');
const ApplicationsRepository = require('../repositories/applications');
const { NotFoundError } = require('../exceptions');

const ApplicationsService = {
  async create({ userId, jobId, cover_letter }) {
    const id = `app-${nanoid(16)}`;
    return ApplicationsRepository.create({
      id,
      user_id: userId,
      job_id: jobId,
      cover_letter,
    });
  },

  async getAll() {
    return ApplicationsRepository.findAll();
  },

  async getById(id) {
    const application = await ApplicationsRepository.findById(id);
    if (!application) {
      throw new NotFoundError('Application not found');
    }
    return application;
  },

  async getByUser(userId) {
    return ApplicationsRepository.findByUser(userId);
  },

  async getByJob(jobId) {
    return ApplicationsRepository.findByJob(jobId);
  },

  async update(id, { status }) {
    const application = await ApplicationsRepository.findById(id);
    if (!application) {
      throw new NotFoundError('Application not found');
    }
    return ApplicationsRepository.update(id, { status });
  },

  async delete(id) {
    const application = await ApplicationsRepository.findById(id);
    if (!application) {
      throw new NotFoundError('Application not found');
    }
    return ApplicationsRepository.delete(id);
  },
};

module.exports = ApplicationsService;
