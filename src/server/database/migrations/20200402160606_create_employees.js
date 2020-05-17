exports.up = (knex) =>
  knex.schema.createTable('employees', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.decimal('balance').defaultTo(0.0)
    table.timestamp('createdAt').defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('employees')

// INSERT INTO employees (name) VALUES('João');
