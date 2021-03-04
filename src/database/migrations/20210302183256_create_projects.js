exports.up = knex => (
    knex.schema.createTable('projects', table => {
        table.increments('id').primary(),
        
        table.text('name').unique().notNullable(),

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
);

exports.down = knex => knex.schema.dropTable('projects');