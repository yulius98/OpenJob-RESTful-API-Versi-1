const pool = require('../config/database');

const CompaniesRepository = {
  async create({ id, name, description, location, email, phone, logo }) {
    const result = await pool.query(
      `INSERT INTO companies (id, name, description, location, email, phone, logo)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, name, description, location, email, phone, logo, created_at, updated_at`,
      [id, name, description || null, location || null, email || null, phone || null, logo || null]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query(
      'SELECT id, name, description, location, email, phone, logo, created_at, updated_at FROM companies ORDER BY created_at DESC'
    );
    return result.rows;
  },

  async findByName(name) {
    const result = await pool.query(
      'SELECT id, name, description, location, email, phone, logo, created_at, updated_at FROM companies WHERE name = $1',
      [name]
    );
    return result.rows[0] || null;
  },

  async findById(id) {
    const result = await pool.query(
      'SELECT id, name, description, location, email, phone, logo, created_at, updated_at FROM companies WHERE id = $1',
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

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const result = await pool.query(
      `UPDATE companies SET ${fields.join(', ')} WHERE id = $${index} RETURNING id, name, description, location, email, phone, logo, created_at, updated_at`,
      values
    );
    return result.rows[0] || null;
  },

  async delete(id) {
    const result = await pool.query('DELETE FROM companies WHERE id = $1 RETURNING id', [id]);
    return result.rows[0] || null;
  },
};

module.exports = CompaniesRepository;
