const pool = require('../config/database');

const CategoriesRepository = {
  async create({ id, name, description }) {
    const result = await pool.query(
      `INSERT INTO categories (id, name, description)
       VALUES ($1, $2, $3)
       RETURNING id, name, description, created_at, updated_at`,
      [id, name, description || null]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query(
      'SELECT id, name, description, created_at, updated_at FROM categories ORDER BY name ASC'
    );
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query(
      'SELECT id, name, description, created_at, updated_at FROM categories WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        fields.push(`${key} = $${index}`);
        values.push(value);
        index++;
      }
    }

    if (fields.length === 0) return null;

    fields.push('updated_at = NOW()');
    values.push(id);

    const result = await pool.query(
      `UPDATE categories SET ${fields.join(', ')} WHERE id = $${index} RETURNING id, name, description, created_at, updated_at`,
      values
    );
    return result.rows[0] || null;
  },

  async delete(id) {
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING id', [id]);
    return result.rows[0] || null;
  },
};

module.exports = CategoriesRepository;
