# DML—Data Manipulation Language
**Last updated**: September 12, 2024

Just as we want to be able to query from a relation, we also need to be able to modify the data in relation. A modification command doesn’t return the result in the same way a query does, but it changes the relational instance. Suppose we want to update a table---e.g., insert tuples, delete tuples, modify or update existing tuples.

_DML_ describes the set of SQL commands that modify data within a database.

The syntax to insert is:

```sql
-- Inserts multiple values, in order
INSERT INTO titles
VALUES
  ('tt11737520', 'tvSeries', 'One Piece', 'One Piece',
   0, 2023, NULL, 60, 'Action,Adventure,Comedy'),
  ('tt1001526','movie', 'Megamind', 'Megamind',
   0, 2010, NULL, 95, 'Action,Adventure,Comedy');
```

Note that each tuple is specified by parentheses and separated by commas, with all attributes in the schema in order. We can also, however, insert attributes out of order, by specifying which attributes to insert. This allows the system to fill in NULL values for attributes we don't have.

```sql
-- Inserts multiple values, out of order
INSERT INTO titles(title_id, type, premiered, primary_title)
VALUES
  ('tt11737520', 'tvSeries', 2023, 'One Piece');
```

The syntax to delete tuples is:

```sql
-- Deletes all tuples
DELETE FROM titles;
```

```sql
-- Deletes all tuples that satisfy a condition
DELETE FROM titles
WHERE premiered >= 2023;
```

The syntax to update tuples is:

```sql
-- Sets all NULL original titles to be the primary title
UPDATE titles
  SET original_title = primary_title
  WHERE original_title IS NULL;
```

Under the hood, SQL does `UPDATE/DELETE` in two phases.
In phase 1, it looks up each tuple and evaluates the `WHERE` condition. If the tuple matches the `WHERE` condition, it gets marked for an `UPDATE/DELETE`. In phase 2, all the marked tuples are updated/deleted. Watch the lecture for the motivation behind this.
