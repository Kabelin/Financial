exports.up = (knex) =>
  knex.schema.createTable('postings', (table) => {
    table.increments('id').primary()
    table.string('description').notNullable()
    table.string('employee').notNullable()
    table.string('type').notNullable()
    table.decimal('value').notNullable()
    table.integer('employeeId').notNullable()
    table.foreign('employeeId').references('id').inTable('employees')
    table.timestamp('createdAt').defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('postings')

// INSERT INTO postings (description, employee, type, value, employeeId) VALUES('Farmácia', 'João da Silva', 'credit', 5.0, 1);
// INSERT INTO postings (description, employee, type, value, employeeId) VALUES('Salário', 'João da Silva', 'debit', 15.0, 1);
