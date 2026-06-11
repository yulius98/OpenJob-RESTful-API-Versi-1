exports.up = (pgm) => {
  pgm.createTable('applications', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    job_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'jobs(id)',
      onDelete: 'CASCADE',
    },
    status: {
      type: 'VARCHAR(50)',
      notNull: true,
      default: 'pending',
    },
    cover_letter: {
      type: 'TEXT',
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('NOW()'),
    },
    updated_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('NOW()'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('applications');
};
