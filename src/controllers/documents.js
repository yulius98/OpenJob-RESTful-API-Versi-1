const DocumentsService = require('../services/documents');
const path = require('node:path');

const DocumentsController = {
  async create(req, res, next) {
    try {
      const { id: userId } = req.user;
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          status: 'failed',
          message: 'Document file is required',
        });
      }

      const document = await DocumentsService.create({
        userId,
        name: file.originalname,
        filePath: file.path,
        type: file.mimetype,
      });

      res.status(201).json({
        status: 'success',
        data: { document },
      });
    } catch (err) {
      next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const documents = await DocumentsService.getAll();
      res.json({
        status: 'success',
        data: { documents },
      });
    } catch (err) {
      next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const document = await DocumentsService.getById(req.params.id);
      res.json({
        status: 'success',
        data: { document },
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await DocumentsService.delete(req.params.id);
      res.json({
        status: 'success',
        message: 'Document deleted',
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = DocumentsController;
