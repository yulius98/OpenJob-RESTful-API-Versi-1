const { nanoid } = require('nanoid');
const JobsRepository = require('../repositories/jobs');
const CompaniesRepository = require('../repositories/companies');
const CategoriesRepository = require('../repositories/categories');
const { NotFoundError, ClientError } = require('../exceptions');

const JobsService = {
  async create(data) {
    const company = await CompaniesRepository.findById(data.company_id);
    if (!company) {
      throw new ClientError('Company not found');
    }
    if (data.category_id) {
      const category = await CategoriesRepository.findById(data.category_id);
      if (!category) {
        throw new ClientError('Category not found');
      }
    }
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
