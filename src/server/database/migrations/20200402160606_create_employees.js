exports.up = (knex) =>
  knex.schema.createTable('employees', (table) => {
    table.string('id').primary()
    table.string('name').notNullable()
    table.string('balance')
  })

exports.down = (knex) => knex.schema.dropTable('employees')
