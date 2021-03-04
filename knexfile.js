const { resolve } = require('path');

module.exports = {
  development: {
    client: 'postgres',
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
  },
};
