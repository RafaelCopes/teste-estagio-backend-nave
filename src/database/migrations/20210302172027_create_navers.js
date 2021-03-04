exports.up = knex =>
  knex.schema.createTable('navers', table => {
    table.increments('id').primary();
    table.text('name').unique().notNullable();
    table.date('birthdate').notNullable();
    table.date('admission_date').notNullable();
    table.text('job_role').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTable('navers');
