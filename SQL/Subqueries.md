# Subqueries 

**Last updated**: August 27, 2024

A parenthesized SQL query statement (a **subquery**) can be used as a
value in various places of a larger SQL query. We could use subqueries
as scalars or sets.

## Scalar Subqueries

If a subquery returns a single tuple with a single attribute value, it
can be treated as a scalar in expressions. Suppose we want to collect
all the stops that happened at the same location as `id = 123`. We could
issue a query as follows, with the parethesized statement as the
subquery:

    SELECT S1.id, S1.race, S1.location
    FROM Stops S1
    WHERE S1.location = (SELECT S2.location FROM Stops S2 WHERE S2.id = 123)

Note that when using subqueries, it's important to define relations with
relevant variables (i.e., S1 and S2) such that when accessing
attributes, it's clear which relation's attribute is being accessed. We
could also rewrite this query to use a CTE (i.e., `WITH` statement)
instead of a subquery:

    WITH Location123 AS (SELECT location FROM Stops WHERE id = 123)
    SELECT S1.id, S1.race, S1.location
    FROM Stops as S1, Location123
    WHERE S1.location = Location123.location

## EXISTS 

We can use the `EXISTS` or `NOT EXISTS` keywords in `WHERE` clauses to
use results of a subquery in set form. For example, suppose we want to
determine all the Stops that are the only one in their zipcode:

    WITH StopZips AS (
        SELECT * FROM Stops NATURAL JOIN Zips
    )
    SELECT *
    FROM StopZips SZ1
    WHERE NOT EXISTS (
        SELECT *
        FROM StopZips SZ2
        WHERE SZ1.zipcode = SZ2.zipcode
                AND SZ1.id != SZ2.id);

In the above query, the subquery returns a set of all zips that have
more that one stop, i.e. the `WHERE` keyword finds all the tuples that
have the same zipcode as another, but with a unique ID, which is then
used with the `NOT EXISTS` keyword to return locations of stops that do
not have an entry in the subquery set.