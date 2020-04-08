exports.up = (knex) =>
  knex.schema.createTable('postings', (table) => {
    table.increments('id').primary()
    table.string('type').notNullable()
    table.decimal('value').notNullable()
    table.integer('employee_id').notNullable()
    table.foreign('employee_id').references('id').inTable('employees')
    table.timestamps(true, true)
  })

exports.down = (knex) => knex.schema.dropTable('postings')

// INSERT INTO postings (type, value, employee_id) VALUES('credit',5.0,1);
// INSERT INTO postings (type, value, employee_id) VALUES('debit',15.0,1);
// INSERT INTO employees (name) VALUES('João da Silva');
