const pool = require('../config/database');

const DocumentsRepository = {
  async create({ id, user_id, name, file_path, type }) {
    const result = await pool.query(
      `INSERT INTO documents (id, user_id, name, file_path, type)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, user_id, name, file_path, type, created_at`,
      [id, user_id, name, file_path, type || null]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query(
      'SELECT id, user_id, name, file_path, type, created_at FROM documents ORDER BY created_at DESC'
    );
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query(
      'SELECT id, user_id, name, file_path, type, created_at FROM documents WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  },

  async delete(id) {
    const result = await pool.query('DELETE FROM documents WHERE id = $1 RETURNING id', [id]);
    return result.rows[0] || null;
  },
};

module.exports = DocumentsRepository;
