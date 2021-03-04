exports.up = knex =>
  knex.schema.createTable('naver_project_relation', table => {
    table.increments('id').primary();
    table.integer('naver_id').references('id').inTable('navers');
    table.integer('project_id').references('id').inTable('projects');
  });

exports.down = knex => knex.schema.dropTable('naver_project_relation');
