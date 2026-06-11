exports.up = (pgm) => {
  pgm.createTable('documents', {
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
    name: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    file_path: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    type: {
      type: 'VARCHAR(50)',
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('NOW()'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('documents');
};

