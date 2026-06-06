const pool = require('../config/database');

const BookmarksRepository = {
  async create({ id, user_id, job_id }) {
    const result = await pool.query(
      `INSERT INTO bookmarks (id, user_id, job_id)
       VALUES ($1, $2, $3)
       RETURNING id, user_id, job_id, created_at`,
      [id, user_id, job_id]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await pool.query(
      `SELECT b.*, j.title as job_title
       FROM bookmarks b
       LEFT JOIN jobs j ON b.job_id = j.id
       WHERE b.id = $1`,
      [id]
    );
    return result.rows[0] || null;
  },

  async findByUserAndJob(userId, jobId) {
    const result = await pool.query(
      'SELECT id, user_id, job_id, created_at FROM bookmarks WHERE user_id = $1 AND job_id = $2',
      [userId, jobId]
    );
    return result.rows[0] || null;
  },

  async findByUser(userId) {
    const result = await pool.query(
      `SELECT b.*, j.title as job_title, c.name as company_name
       FROM bookmarks b
       LEFT JOIN jobs j ON b.job_id = j.id
       LEFT JOIN companies c ON j.company_id = c.id
       WHERE b.user_id = $1 ORDER BY b.created_at DESC`,
      [userId]
    );
    return result.rows;
  },

  async deleteByUserAndJob(userId, jobId) {
    const result = await pool.query(
      'DELETE FROM bookmarks WHERE user_id = $1 AND job_id = $2 RETURNING id',
      [userId, jobId]
    );
    return result.rows[0] || null;
  },
};

module.exports = BookmarksRepository;
