const { nanoid } = require('nanoid');
const JobsRepository = require('../repositories/jobs');
const { NotFoundError } = require('../exceptions');

const JobsService = {
  async create(data) {
    const id = `job-${nanoid(16)}`;
    return JobsRepository.create({ id, ...data });
  },

  async getAll({ title, company_name } = {}) {
    return JobsRepository.findAll({ title, company_name });
  },

  async getById(id) {
    const job = await JobsRepository.findById(id);
    if (!job) {
      throw new NotFoundError('Job not found');
    }
    return job;
  },

  async getByCompany(companyId) {
    return JobsRepository.findByCompany(companyId);
  },

  async getByCategory(categoryId) {
    return JobsRepository.findByCategory(categoryId);
  },

  async update(id, data) {
    const job = await JobsRepository.findById(id);
    if (!job) {
      throw new NotFoundError('Job not found');
    }
    return JobsRepository.update(id, data);
  },

  async delete(id) {
    const job = await JobsRepository.findById(id);
    if (!job) {
      throw new NotFoundError('Job not found');
    }
    return JobsRepository.delete(id);
  },
};

module.exports = JobsService;
