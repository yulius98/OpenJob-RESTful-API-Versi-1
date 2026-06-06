exports.up = (pgm) => {
  pgm.createTable('companies', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(255)',
      notNull: true,
      unique: true,
    },
    description: {
      type: 'TEXT',
    },
    location: {
      type: 'VARCHAR(255)',
    },
    email: {
      type: 'VARCHAR(100)',
    },
    phone: {
      type: 'VARCHAR(50)',
    },
    logo: {
      type: 'VARCHAR(255)',
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
  pgm.dropTable('companies');
};
