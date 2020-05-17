exports.up = (knex) =>
  knex.raw(`
CREATE TRIGGER remove_posting
  AFTER DELETE ON postings
    BEGIN
      UPDATE employees
        SET balance=
          (
            SELECT SUM(CASE WHEN type='debit' THEN value ELSE -value END)
            FROM postings WHERE employeeId=OLD.employeeId
          )
      WHERE id=OLD.employeeId;
    END
`)

exports.down = (knex) =>
  knex.raw(`
DROP TRIGGER remove_posting;
`)
