# Creating Tables and Views from Data

**Last updated**: September 13, 2024

## Copying Data to new Tables

Suppose we want the result of a SQL query to act as a new table that we
can query. For example, the following query turns a `SELECT` statement
into another table:

```sql
CREATE TABLE citation_stops AS (
    SELECT gender, citation
    FROM stops
    WHERE citation = True
);
```

After running this command, we now can query `citation_stops` directly.
But if the **base table**, in this case the `stops` table, changes (e.g.,
gets new records), we have to recreate `citation_stops` to reflect the new
changes!

Similarly, we should be careful that if we were to modify the rows of `citation_stops`, there would be no updates to our base table.

## Creating (Virtual) Views

To avoid manually recreating derived tables, we can instead define a
**view**, as follows:

```sql
CREATE VIEW citation_stops AS (
    SELECT gender, citation
    FROM stops
    WHERE citation = True
);
```

In views (also known as virtual views), outputs are not stored, and any
time a user queries the view (i.e., `citation_stops`), the output is
computed on demand. Think of this as a variable or as a virtual relation
that is more convenient to query than the base table.

## Materialized Views

On the flip side, suppose we want to create a view and query it frequently.
The naive method of creating a view might be slow because the view is
computed on demand every time a query is run. To solve this issue, we
can define a **materialized view**, as follows:

```sql
CREATE MATERIALIZED VIEW citation_stops AS (
    SELECT gender, citation
    FROM Stops
    WHERE citation = True
);
```

In materialized views, outputs are stored just like they are in regular
tables (but not like in virtual views). Materialized views are _sometimes_
automatically updated as base tables change, but since they must be
rematerialized frequently, they might add unnecessary overhead to base
table updates. So, data engineers (you!) must be thoughtful about what
views to keep materialized and what views to keep virtual.

**Note:** In PostgreSQL, materialized views are _not_ automatically updated when the base table changes. You must [manually refresh][refresh_docs] the view periodically.

Materialized Views are great for scenarios that have complex queries which are frequently used, but _data_ that changes infrequently. For example, you might create a materialized view "prior_month_stops_in_location_x".

[refresh_docs]: https://www.postgresql.org/docs/current/sql-refreshmaterializedview.html
