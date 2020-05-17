exports.up = (knex) =>
  knex.raw(`
CREATE TRIGGER add_posting
  AFTER INSERT ON postings
    BEGIN
      UPDATE employees
        SET balance=
          (
            SELECT SUM(CASE WHEN type='debit' THEN value ELSE -value END)
            FROM postings WHERE employeeId=NEW.employeeId
          )
      WHERE id=NEW.employeeId;
    END
`)

exports.down = (knex) =>
  knex.raw(`
DROP TRIGGER add_posting;
`)
