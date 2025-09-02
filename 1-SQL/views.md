# Creating Tables and Views from Data

**Last updated**: September 2, 2025

## Copying Data to new Tables

Sometimes we want the result of a SQL query to act as a new table that we can query independently. For example, the query below takes a `SELECT` statement and uses it to create a new table:

```sql
CREATE TABLE citation_stops AS (
    SELECT gender, citation
    FROM stops
    WHERE citation = True
);
```

After running this command, we now have a table called `citation_stops` that we can query directly, just like any other table.

However, there are two important things to keep in mind:

1. **No automatic updates from the base table**: if the **base table**, in this case the `stops` table, changes (e.g.,
gets new records), we have to recreate `citation_stops` to reflect the new
changes!

1. **No updates back to the base table**: Similarly, if we were to modify the rows of `citation_stops`, there would be no updates to our base table.

## Creating (Virtual) Views

Instead of manually recreating derived tables, we can define a **view**. A view is like a saved query that acts as a virtual table. For example:

```sql
CREATE VIEW citation_stops AS (
    SELECT gender, citation
    FROM stops
    WHERE citation = True
);
```
Unlike a table created with `CREATE TABLE ... AS`, the results of a view (also known as virtual views) are not stored. Instead, whenever you query the view (e.g., `SELECT * FROM citation_stops;`), the database re-runs the underlying query and computes the results on demand.
Think of this as a variable or as a virtual relation
that is more convenient to query than the base table and always stays up to date with the base data.

## Materialized Views

So far, we’ve seen that:  
- **Tables created with** `CREATE TABLE ... AS` store results permanently but do not update automatically.  
- **Virtual views** (`CREATE VIEW`) stay up to date with the base tables but must be recomputed every time you query them, which can be slow for complex queries.  

A middle ground is the **materialized view**. For example:

```sql
CREATE MATERIALIZED VIEW citation_stops AS (
    SELECT gender, citation
    FROM Stops
    WHERE citation = True
);
```

In materialized views, outputs are **stored** just like they are in regular
tables rather than recomputed on every query (like virtual views). Materialized views are _sometimes_
automatically updated as base tables change, but since they must be
rematerialized frequently, they might add unnecessary overhead to base
table updates. So, data engineers (you!) must be thoughtful about what
views to keep materialized and what views to keep virtual.

**Note:** In PostgreSQL, materialized views are _not_ automatically updated when the base table changes. You must [manually refresh][refresh_docs] the view periodically.

Materialized Views are great for scenarios that have complex queries which are frequently used, but _data_ that changes infrequently. For example, you might create a materialized view "prior_month_stops_in_location_x".

[refresh_docs]: https://www.postgresql.org/docs/current/sql-refreshmaterializedview.html
