exports.up = (pgm) => {
  pgm.createTable("jobs", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    company_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "companies(id)",
      onDelete: "CASCADE",
    },
    category_id: {
      type: "VARCHAR(50)",
      references: "categories(id)",
      onDelete: "SET NULL",
    },
    title: {
      type: "VARCHAR(255)",
      notNull: true,
    },
    description: {
      type: "TEXT",
    },
    requirements: {
      type: "TEXT",
    },
    job_type: {
      type: "TEXT",
    },
    experience_level: {
      type: "TEXT",
    },
    location_type: {
      type: "TEXT",
    },
    location_city: {
      type: "TEXT",
    },
    salary_min: {
      type: "NUMERIC",
    },
    salary_max: {
      type: "NUMERIC",
    },
    is_salary_visible: {
      type: "BOOLEAN",
    },
    status: {
      type: "TEXT",
    },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("NOW()"),
    },
    updated_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("NOW()"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('jobs');
};
