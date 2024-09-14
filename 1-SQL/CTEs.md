# Common Table Expressions (CTE)

Sometimes, we may only want to create a view and query it right away---as part
of breaking down a larger SQL query. A **common table expression** (CTE) is a type of
temporary table which exists only for the duration of one query. We can define a CTE as follows:

```sql
    WITH citation_stops AS (
      SELECT gender, citation
      FROM stops
      WHERE citation = True
    )
    SELECT * FROM citation_stops;
```

Like virtual views, CTEs are computed on demand. But unlike virtual
views, their lifetime is restricted to the query. However, compared to subqueries, we can use
the same CTE (e.g. `citation_stops`) as many times as we need within a longer query, without
having to recompute the result.

<!-- TODO: Introduce Recursive CTEs -->
