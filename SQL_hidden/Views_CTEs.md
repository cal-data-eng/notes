# Virtual View, CTE, Materialized View

**Last updated**: August 27, 2024

## Virtual View

To avoid manually recreating derived tables, we can instead define a
**view**, as follows:

    CREATE VIEW CitationStops AS
    (SELECT gender, citation
    FROM Stops
    WHERE citation = True)

In views (also known as virtual views), outputs are not stored, and any
time a user queries the view (i.e., `CitationStops`), the output is
computed on demand. Think of this as a variable or as a virtual relation
that is more convenient to query than the base table.

## Materialized View
On the flip side, suppose we want to create a view and query it a lot.
The naive method of creating a view might be slow because the view is
computed on demand every time a query is run. To solve this issue, we
can define a **materialized view**, as follows:

    CREATE MATERIALIZED VIEW CitationStops AS
    (SELECT gender, citation
    FROM Stops
    WHERE citation = True)

In materialized views, outputs are stored just like they are in regular
tables (but not like in virtual views). Materialized views are typically
automatically updated as base tables change, but since they must be
rematerialized frequently, they might add unnecessary overhead to base
table updates. So, data engineers (you!) must be thoughtful about what
views to keep materialized and what views to keep virtual.
