# SQL Review

**Last updated**: August 27, 2024

This is a review of Data 100 SQL syntax, plus more.

In this course, we'll cover three types of data systems in this course—dataframes, relational databases, and Spark. This note will focus on the relational data model and a review of SQL—the language used to interact with relational data systems.

## Taste of SQL

Structured Query Language, or "sequel," is a high-level data transformation language supported by relational databases and other data systems like Spark. It is **declarative** rather than imperative, meaning:

*   Describes what rather than how
*   It's query-centric rather than code-centric

SQL's core functionality is restricted compared to Python. Nevertheless, it is still quite powerful, as we'll see in this class.

This class uses a flavor of SQL called PostgreSQL, a free, open-source **database management system (DBMS)** that is SQL-compliant.

## The Relational Data Model

A **relation** is a collection of tuples, each with a predefined collection of **attributes**. Each attribute has a type, called a domain, which must be atomic (e.g., string or integer). The order of the tuples in a relation does not matter, since the relation is a set.

The **schema** of a relation is a list of attribute names and their domains (the data types associated with each attribute). For example, in the IMDb dataset, the schema for the title relation is:

```sql
Title (titleId String, ordering Integer, title String,
        region String, language String...)
```

We can also think of a relation as a table of data. Organizations typically have many relations.

An **instance** is a specific instantiation of the relation—a relation with "values filled in."

## SELECT-FROM-WHERE (SFW)

Below is the `SELECT FROM WHERE` (**SFW**) query structure, the most standard SQL query structure to extract records from a relation:

```sql
SELECT attributes
FROM tables
WHERE condition about tuples in tables;
```

Remember---SQL is a declarative language! Instead of evaluating the SQL query from first to last line, it is evaluated like so:

1. `FROM` clause: lists the table
1. `WHERE` clause: filters for the matching tuples
1. `SELECT` clause: filters for the specified attributes.

```{note}
By convention, SQL keywords are in all caps, e.g., `SELECT *`, while attributes are in lowercase. End queries with a semicolon.
```

### The asterisk (`*`)

The asterisk (`*`) is a wildcard character that selects all attributes from the table. It can be used in place of any explicit parameter. For example:


```sql
SELECT *
FROM Title;
```

The above query effectively gets all tuple and all attributes from the `Title` table by doing the following:
* `FROM`: Gets the `Title` table
* `WHERE`: Applies the all-pass filter onto tuples
* `SELECT *`: Gets all attributes

## Casting
Casting converts one attribute type to another. For example, to cast the `premiered` attribute from string type to integer:

```sql
CAST(premiered AS INTEGER)
```

## Handling NULLS

Tuples can have NULL values for attributes, which we need to take note of when performing queries. Generally, NULLs do not satisfy conditions—for example, if a tuple value is `NULL`, `born < 2023` and `born >= 2023` will both evaluate to `FALSE`. This leads to some unintuitive behavior, for example:

```sql
SELECT born FROM people WHERE born < 2023 OR born >= 2023;
```

The above query will return all tuples that don't have a `NULL` born value, not all the tuples in the relation! If we want all the tuples, we need to explicitly test for `NULL`:

```sql
SELECT born FROM people WHERE born < 2023 OR born IS NULL;
```

For aggregations, `NULL` values are not involved. For example, the average of a column will be the average of all the non-null values in that column. However, if all the values in the column are `NULL`, the aggregation will also return `NULL`.
