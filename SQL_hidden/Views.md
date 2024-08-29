# Views

**Last updated**: August 27, 2024

Suppose we want the result of a SQL query to act as a new table that we
can query. For example, the following query turns a SELECT statement
into another table:

    CREATE TABLE CitationStops AS
    (SELECT gender, citation
    FROM Stops
    WHERE citation = True)

After running this command, we now can query `CitationStops` directly.
But if the **base table**, or the `Stops` table changes (e.g., gets new
records), we have to recreate `CitationStops` to reflect the new
changes!
