# Creating Alternate Representations of Data

**Last updated**: September 13, 2024

## Copting Data to new Tables

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
But if the **base table**, or the `stops` table changes (e.g., gets new
records), we have to recreate `citation_stops` to reflect the new
changes!
