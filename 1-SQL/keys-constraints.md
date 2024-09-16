# Keys & Constraints

**Last Updated**: September 12, 2024

## Constraints
Constraints are relationships across data elements that the data system is required to preserve or enforce. Constraints help encode domain knowledge that the system can enforce, or act as guardrails and provide safety.

### Keys

Tuples can have *keys*, which make it easy to identify them in a relation. For example, a table of students could have a student ID key. A set of attributes is said to form a key if no two tuples can have the same values for that combination of attributes. We call this a **PRIMARY KEY**, defined in a table definition:

```sql
CREATE TABLE stops(
  stop_id INTEGER,
  race VARCHAR(10),
  location VARCHAR(20),
  age INTEGER,
  arrest BOOLEAN,

  PRIMARY KEY (stop_id)
);
```

When we define a primary key, we are also defining a **constraint** on its uniqueness. For example, in the above statement, each tuple must have a unique stopID---otherwise when inserting a tuple with a duplicate stopID into the table, we'll get an error. Additionally, no attribute of a PRIMARY KEY can be NULL.

There can be only **one** PRIMARY KEY (hence the name!). What if we want multiple unique keys? We can use the UNIQUE key syntax:

```sql
CREATE TABLE stops (
  stop_id INTEGER,
  person_id INTEGER,
  stop_time TIMESTAMPTZ,
  race VARCHAR(10),
  location VARCHAR(20),
  age INTEGER,
  arrest BOOLEAN,

  PRIMARY KEY (stop_id),
  UNIQUE (person_id, stop_time)
);
```

Here, there are effectively 3 unique keys: stopID, personID, stopTime. UNIQUE keys can be null-valued. We could also declare attributes to have default values or not be null, e.g.,:

```sql
CREATE TABLE stops(
  stop_id INTEGER,
  person_id INTEGER,
  stop_time TIMESTAMPTZ,
  race VARCHAR(10),
  location VARCHAR(20) NOT NULL,
  age INTEGER,
  arrest BOOLEAN DEFAULT False,

  PRIMARY KEY (stop_id),
  UNIQUE (person_id, stop_time)
);
```

This gives us, so far, multiple different kinds of constraints---**uniqueness** via PRIMARY KEY or UNIQUE, and attribute-based constraints (DEFAULT, NOT NULL).

The final constraint type we'll cover is **FOREIGN KEY**. Referential integrity is ensuring that records do not violate the constraints defined between tables. A foreign key maintains the referential integrity of your data, by restricting record insertion based on whether an attribute value in one table exists in another table.

Suppose we have two tables, an `actors` table and a `cast_info` table. We'll have actor IDs in the `cast_info` table, but we want them to reference the actor IDs in the `actor` table. We can declare this constraint as follows:

```sql
CREATE TABLE actors (
  id INTEGER,
  name TEXT,

  PRIMARY KEY id
);
```

```sql
CREATE TABLE cast_info (
  person_id INTEGER,
  movie_id INTEGER,

  FOREIGN KEY (person_id) REFERENCES actors (id),
  -- If we similarly have a movies table, we'd include this line:
  FOREIGN KEY (movie_id) REFERENCES movies (id),
);
```

It is okay for foreign keys to not contain certain primary keys, but foreign keys must always reference an existing primary key. So, if we try to insert a tuple in `cast_info` that has a `person_id` that isn't an id in the `actor` table, we'll get an error. There is also a 'dangling tuples' violation---If we delete a tuple in the `actor` table that has an id in the `cast_info` table, we'll also get an error. SQL handles this violation in 3 different ways. It either throws an error, makes the same changes to the `cast_info` table as made in the `actor` table, or changes the key in `cast_info` table to be NULL.

An attribute-based constraint is where every value in a column satisfies a Boolean expression.

For example, NOT NULL is an attribute-based constraint! Boolean expressions can also be expressed via `CHECK`. We can declare this constraint as follows:

```sql
-- Ensures that actor_ids are four-digit integers.
CREATE TABLE actors (
  id INTEGER CHECK (id >= 1000 AND id <= 9999),
  name TEXT
);
```

Attribute-based constraints are checked on changes to the relation itself. For example, for the table above, this constraint is checked when a new id is added or an existing one is updated, but not when an id is deleted. A limitation of this is that it only enforces one of the two potential referential integrity violations (see last note for more on these violations), because `CHECK` only enforces constraints on a single table, not across tables.
