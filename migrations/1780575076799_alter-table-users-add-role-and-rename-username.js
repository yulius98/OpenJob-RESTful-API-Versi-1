exports.up = (pgm) => {
  pgm.renameColumn('users', 'username', 'name');
  pgm.dropConstraint('users', 'users_username_key');
  pgm.dropColumn('users', 'full_name');
  pgm.addColumn('users', {
    role: {
      type: 'VARCHAR(50)',
      notNull: true,
      default: 'user',
    },
  });
};

exports.down = (pgm) => {
  pgm.renameColumn('users', 'name', 'username');
  pgm.addConstraint('users', 'users_username_key', { unique: ['username'] });
  pgm.addColumn('users', {
    full_name: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
  });
  pgm.dropColumn('users', 'role');
};
