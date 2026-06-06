const pool = require('../config/database');

const AuthenticationsRepository = {
  async add(token) {
    await pool.query('INSERT INTO authentications (token) VALUES ($1)', [token]);
  },

  async find(token) {
    const result = await pool.query('SELECT token FROM authentications WHERE token = $1', [token]);
    return result.rows[0] || null;
  },

  async delete(token) {
    await pool.query('DELETE FROM authentications WHERE token = $1', [token]);
  },
};

module.exports = AuthenticationsRepository;
