# Having, Limit, Offset

**Last updated**: August 27, 2024

## HAVING Clauses

Suppose we want to filter a GROUP BY on some condition. We can use a
HAVING clause, which typically precedes a GROUP BY. The HAVING condition
is applied to each group, and groups not satisfying the condition are
eliminated. For example, say we wanted to compute the locations with at
least 30 stops:

    SELECT location, COUNT (*)
    FROM Stops
    GROUP BY location
    HAVING COUNT (*) > 30

Similarly to SELECT clauses, each attribute mentioned in a HAVING clause
must either be part of the GROUP BY or be aggregated.

## LIMIT and OFFSET

Sometimes we want to limit the result to a few tuples via `LIMIT <val>`.
For example, say we want to order Stops by descending age, return top
15:

    SELECT *
    FROM Stops
    ORDER BY age DESC LIMIT 15;

Sometimes we want to start the output at a particular point via
`OFFSET <val>`. For example, say we want to order Stops by descending
age, return positions 11 to 15:

    SELECT *
    FROM Stops
    ORDER BY age DESC LIMIT 5 OFFSET 10
