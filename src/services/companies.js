const { nanoid } = require('nanoid');
const CompaniesRepository = require('../repositories/companies');
const { ClientError, NotFoundError } = require('../exceptions');

const CompaniesService = {
  async create(data) {
    const existingName = await CompaniesRepository.findByName(data.name);
    if (existingName) {
      throw new ClientError('Company name already exists');
    }

    const id = `company-${nanoid(16)}`;
    return CompaniesRepository.create({ id, ...data });
  },

  async getAll() {
    return CompaniesRepository.findAll();
  },

  async getById(id) {
    const company = await CompaniesRepository.findById(id);
    if (!company) {
      throw new NotFoundError('Company not found');
    }
    return company;
  },

  async update(id, data) {
    const company = await CompaniesRepository.findById(id);
    if (!company) {
      throw new NotFoundError('Company not found');
    }
    const updated = await CompaniesRepository.update(id, data);
    return updated;
  },

  async delete(id) {
    const company = await CompaniesRepository.findById(id);
    if (!company) {
      throw new NotFoundError('Company not found');
    }
    return CompaniesRepository.delete(id);
  },
};

module.exports = CompaniesService;
