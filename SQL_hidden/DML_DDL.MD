# DML, DDL
**Last updated**: September 12, 2024

## Data Modification Language (DML)
Just as we want to be able to query from a relation, we also need to be able to modify the data in relation. A modification command doesn’t return the result in the same way a query does, but it changes the relational instance. Suppose we want to update a table---e.g., insert tuples, delete tuples, modify or update existing tuples.

The syntax to insert is: 
```sql
-- Inserts multiple values, in order
INSERT INTO titles VALUES
  ('tt11737520', 'tvSeries', 'One Piece', 'One Piece',
   0, 2023, NULL, 60, 'Action,Adventure,Comedy'),
  ('tt1001526','movie', 'Megamind', 'Megamind',
   0, 2010, NULL, 95, 'Action,Adventure,Comedy');
```

Note that each tuple is specified by parentheses and separated by commas, with all attributes in the schema in order. We can also, however, insert attributes out of order, by specifying which attributes to insert. This allows the system to fill in NULL values for attributes we don't have. 

```sql 
-- Inserts multiple values, out of order
INSERT INTO titles (title_id, type, premiered, primary_title) VALUES
  ('tt11737520', 'tvSeries', 2023, 'One Piece');
```

The syntax to delete tuples is:

```sql
-- Deletes all tuples
DELETE FROM titles;
```

```sql
-- Deletes all tuples that satisfy a condition
DELETE FROM titles WHERE premiered >= 2023;
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

## Data Definition Language (DDL)

A definition command also does not return the result in the same way a query does, but it determines the relational schema (i.e., the attributes per tuple) and potentially the relational instance.
Suppose we want to create, drop or alter a table.

The syntax to create a table is:

```sql
-- Create a new table with an entirely new schema
CREATE TABLE zips (
	location VARCHAR(20),
	zipcode INTEGER
);
```

The syntax to drop is:

```sql
-- Drop the entire relation from the database.
DROP TABLE <relation name>;
```

```sql
-- This is preferred, avoids throwing an error if table doesn't exist
DROP TABLE IF EXISTS <relation name>;
```

The syntax to alter is:

```sql
-- Add new columns to the relation
ALTER TABLE zips
    ADD area REAL,
    ADD timezone VARCHAR(5);
```

```sql
-- Delete old columns to the relation
ALTER TABLE zips
    DROP area, 
    DROP timezone;
```

If you want to add an existing column, you will need to drop the column before adding it again. 