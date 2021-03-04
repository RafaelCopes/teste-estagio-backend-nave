const { resolve } = require('path');

module.exports = {
  development: {
    client: 'postgres',
    connection: {
      database: "teste_estagio_nave",
      user: "postgres",
      password: "nave"
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
  },
};
