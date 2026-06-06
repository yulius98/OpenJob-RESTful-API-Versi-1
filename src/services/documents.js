const { nanoid } = require('nanoid');
const DocumentsRepository = require('../repositories/documents');
const { NotFoundError } = require('../exceptions');

const DocumentsService = {
  async create({ userId, name, filePath, type }) {
    const id = `doc-${nanoid(16)}`;
    return DocumentsRepository.create({
      id,
      user_id: userId,
      name,
      file_path: filePath,
      type,
    });
  },

  async getAll() {
    return DocumentsRepository.findAll();
  },

  async getById(id) {
    const doc = await DocumentsRepository.findById(id);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }
    return doc;
  },

  async delete(id) {
    const doc = await DocumentsRepository.findById(id);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }
    return DocumentsRepository.delete(id);
  },
};

module.exports = DocumentsService;
