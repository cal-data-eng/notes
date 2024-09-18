# DDL–Data Definition Language
**Last updated**: September 12, 2024

## DDL

The _DDL_, or data defintion language, is the set of SQL commands that allow us to create and modify the _schema_ of a relation. The schema is the structure of a relation, including attribute names, types, and any described relationships between attributes and other relations.
A definition command also does not return the result in the same way a query does.

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
