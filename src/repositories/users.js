const pool = require('../config/database');

const UsersRepository = {
  async create({ id, name, email, password, role }) {
    const result = await pool.query(
      'INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role, created_at',
      [id, name, email, password, role]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await pool.query(
      'SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  },

  async findByEmail(email) {
    const result = await pool.query(
      'SELECT id, name, email, password, role FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  },
};

module.exports = UsersRepository;
