exports.up = (knex) =>
  knex.raw(`
CREATE TRIGGER update_employees
  AFTER INSERT ON postings
    BEGIN
      UPDATE employees
      SET balance=
        (
          (SELECT COALESCE(SUM(value),0) FROM postings WHERE employee_id=NEW.employee_id AND type='debit')
          - (SELECT COALESCE(SUM(value),0) FROM postings WHERE employee_id=NEW.employee_id AND type='credit')
        )
      WHERE id=NEW.employee_id;
    END
`)

exports.down = (knex) =>
  knex.raw(`
DROP TRIGGER update_employees;
`)
