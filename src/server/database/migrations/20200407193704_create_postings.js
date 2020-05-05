exports.up = (knex) =>
  knex.schema.createTable('postings', (table) => {
    table.increments('id').primary()
    table.string('description').notNullable()
    table.string('type').notNullable()
    table.decimal('value').notNullable()
    table.integer('employeeId').notNullable()
    table.foreign('employeeId').references('id').inTable('employees')
    table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('postings')

// INSERT INTO postings (description, type, value, employee_id) VALUES('Farmácia','Crédito',5.0,1);
// INSERT INTO postings (description, type, value, employee_id) VALUES('Salário','Débito',15.0,1);
// INSERT INTO employees (name) VALUES('João da Silva');
