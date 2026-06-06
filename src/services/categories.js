const { nanoid } = require('nanoid');
const CategoriesRepository = require('../repositories/categories');
const { NotFoundError } = require('../exceptions');

const CategoriesService = {
  async create(data) {
    const id = `category-${nanoid(16)}`;
    return CategoriesRepository.create({ id, ...data });
  },

  async getAll() {
    return CategoriesRepository.findAll();
  },

  async getById(id) {
    const category = await CategoriesRepository.findById(id);
    if (!category) {
      throw new NotFoundError('Category not found');
    }
    return category;
  },

  async update(id, data) {
    const category = await CategoriesRepository.findById(id);
    if (!category) {
      throw new NotFoundError('Category not found');
    }
    return CategoriesRepository.update(id, data);
  },

  async delete(id) {
    const category = await CategoriesRepository.findById(id);
    if (!category) {
      throw new NotFoundError('Category not found');
    }
    return CategoriesRepository.delete(id);
  },
};

module.exports = CategoriesService;
