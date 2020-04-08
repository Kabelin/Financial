exports.up = (knex) =>
  knex.schema.createTable('employees', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.decimal('balance').defaultTo(0.0)
    table.timestamps(true, true)
  })

exports.down = (knex) => knex.schema.dropTable('employees')
