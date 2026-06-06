const pool = require('../config/database');

const JobsRepository = {
  async create({ id, company_id, category_id, title, description, requirements, salary_min, salary_max, location, type, is_active }) {
    const result = await pool.query(
      `INSERT INTO jobs (id, company_id, category_id, title, description, requirements, salary_min, salary_max, location, type, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING id, company_id, category_id, title, description, requirements, salary_min, salary_max, location, type, is_active, created_at, updated_at`,
      [id, company_id, category_id || null, title, description || null, requirements || null, salary_min || null, salary_max || null, location || null, type || null, is_active !== undefined ? is_active : true]
    );
    return result.rows[0];
  },

  async findAll({ title, company_name } = {}) {
    let query = `
      SELECT j.*, c.name as company_name, cat.name as category_name
      FROM jobs j
      LEFT JOIN companies c ON j.company_id = c.id
      LEFT JOIN categories cat ON j.category_id = cat.id
    `;
    const conditions = [];
    const values = [];
    let index = 1;

    if (title) {
      conditions.push(`j.title ILIKE $${index}`);
      values.push(`%${title}%`);
      index++;
    }

    if (company_name) {
      conditions.push(`c.name ILIKE $${index}`);
      values.push(`%${company_name}%`);
      index++;
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY j.created_at DESC';

    const result = await pool.query(query, values);
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query(
      `SELECT j.*, c.name as company_name, cat.name as category_name
       FROM jobs j
       LEFT JOIN companies c ON j.company_id = c.id
       LEFT JOIN categories cat ON j.category_id = cat.id
       WHERE j.id = $1`,
      [id]
    );
    return result.rows[0] || null;
  },

  async findByCompany(companyId) {
    const result = await pool.query(
      `SELECT j.*, c.name as company_name, cat.name as category_name
       FROM jobs j
       LEFT JOIN companies c ON j.company_id = c.id
       LEFT JOIN categories cat ON j.category_id = cat.id
       WHERE j.company_id = $1 ORDER BY j.created_at DESC`,
      [companyId]
    );
    return result.rows;
  },

  async findByCategory(categoryId) {
    const result = await pool.query(
      `SELECT j.*, c.name as company_name, cat.name as category_name
       FROM jobs j
       LEFT JOIN companies c ON j.company_id = c.id
       LEFT JOIN categories cat ON j.category_id = cat.id
       WHERE j.category_id = $1 ORDER BY j.created_at DESC`,
      [categoryId]
    );
    return result.rows;
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
      `UPDATE jobs SET ${fields.join(', ')} WHERE id = $${index} RETURNING id, company_id, category_id, title, description, requirements, salary_min, salary_max, location, type, is_active, created_at, updated_at`,
      values
    );
    return result.rows[0] || null;
  },

  async delete(id) {
    const result = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING id', [id]);
    return result.rows[0] || null;
  },
};

module.exports = JobsRepository;
