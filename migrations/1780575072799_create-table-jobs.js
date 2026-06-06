exports.up = (pgm) => {
  pgm.createTable('jobs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    company_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'companies(id)',
      onDelete: 'CASCADE',
    },
    category_id: {
      type: 'VARCHAR(50)',
      references: 'categories(id)',
      onDelete: 'SET NULL',
    },
    title: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    description: {
      type: 'TEXT',
    },
    requirements: {
      type: 'TEXT',
    },
    salary_min: {
      type: 'NUMERIC',
    },
    salary_max: {
      type: 'NUMERIC',
    },
    location: {
      type: 'VARCHAR(255)',
    },
    type: {
      type: 'VARCHAR(50)',
    },
    is_active: {
      type: 'BOOLEAN',
      notNull: true,
      default: true,
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
  pgm.dropTable('jobs');
};
