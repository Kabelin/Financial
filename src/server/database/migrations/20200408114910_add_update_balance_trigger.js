exports.up = (knex) =>
  knex.raw(`
CREATE TRIGGER update_employees
  AFTER INSERT ON postings
    BEGIN
      UPDATE employees
      SET balance=
        (
          SELECT SUM(CASE WHEN type='debit' THEN value ELSE -value END) FROM postings WHERE employee_id=NEW.employee_id;
        )
      WHERE id=NEW.employee_id;
    END
`)

exports.down = (knex) =>
  knex.raw(`
DROP TRIGGER update_employees;
`)
