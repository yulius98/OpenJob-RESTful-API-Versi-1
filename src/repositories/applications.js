const pool = require('../config/database');

const ApplicationsRepository = {
  async create({ id, user_id, job_id, cover_letter }) {
    const result = await pool.query(
      `INSERT INTO applications (id, user_id, job_id, cover_letter)
       VALUES ($1, $2, $3, $4)
       RETURNING id, user_id, job_id, status, cover_letter, created_at, updated_at`,
      [id, user_id, job_id, cover_letter || null]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await pool.query(
      `SELECT a.*, u.name, j.title as job_title
       FROM applications a
       LEFT JOIN users u ON a.user_id = u.id
       LEFT JOIN jobs j ON a.job_id = j.id
       ORDER BY a.created_at DESC`
    );
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query(
      `SELECT a.*, u.name, j.title as job_title
       FROM applications a
       LEFT JOIN users u ON a.user_id = u.id
       LEFT JOIN jobs j ON a.job_id = j.id
       WHERE a.id = $1`,
      [id]
    );
    return result.rows[0] || null;
  },

  async findByUser(userId) {
    const result = await pool.query(
      `SELECT a.*, j.title as job_title, c.name as company_name, j.location_city as job_location
       FROM applications a
       LEFT JOIN jobs j ON a.job_id = j.id
       LEFT JOIN companies c ON j.company_id = c.id
       WHERE a.user_id = $1 ORDER BY a.created_at DESC`,
      [userId]
    );
    return result.rows;
  },

  async findByJob(jobId) {
    const result = await pool.query(
      `SELECT a.*, u.name
       FROM applications a
       LEFT JOIN users u ON a.user_id = u.id
       WHERE a.job_id = $1 ORDER BY a.created_at DESC`,
      [jobId]
    );
    return result.rows;
  },

  async update(id, { status }) {
    const result = await pool.query(
      `UPDATE applications SET status = $1, updated_at = NOW() WHERE id = $2
       RETURNING id, user_id, job_id, status, cover_letter, created_at, updated_at`,
      [status, id]
    );
    return result.rows[0] || null;
  },

  async delete(id) {
    const result = await pool.query('DELETE FROM applications WHERE id = $1 RETURNING id', [id]);
    return result.rows[0] || null;
  },
};

module.exports = ApplicationsRepository;
