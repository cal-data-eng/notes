# Aggregations

**Last updated**: August 27, 2024

We can also **aggregate** a column in a `SELECT` clause, such as perform
`SUM`, `MIN`, `MAX`, `AVG`, or `COUNT`. `COUNT(*)` is a special syntax
to count the number of tuples, for example:

    SELECT COUNT(*) FROM Stops

returns the number of tuples in the Stops relation. Similarly,
`SELECT MAX(age), AVG (age) FROM Stops` selects the min and max age from
the stops relation.

## Grouping

In some cases, we may want to compute an aggregate for each "group" of
tuples as opposed to an overall COUNT, MAX or SUM. To do so, we add a
`GROUP BY` clause after the SELECT-FROM-WHERE. For example, say we
wanted to find average and minimum ages for each location:

    SELECT location, AVG(age) AS avgage, MIN (age) as minage
    FROM Stops
    GROUP BY location

It is important to note that if aggregation is used, then each element
of the SELECT clause must either be an aggregate or an attribute in the
GROUP BY list. This is because if an attribute is not being aggregated
or being grouped, we have no way to "squish" the values down per group.
Also note that `AVG` (and other aggregations) ignore null values.

Postgres supports many aggregate statistics: standard deviation,
covariance, regression slope/intercept, correlation coefficient, and
more. Say we wanted to find the median age of stopped people:

    SELECT race, PERCENTAGE_DISC(0.5) 
    WITHIN GROUP (ORDER BY age) 
    FROM Stops

We can also use more sophisticated syntax in GROUP BYs; for example, the
following query computes the average ages of stops across various races
for West Oakland and Rockridge individually:

    SELECT race, 
    AVG (CASE WHEN location = 'West Oakland' THEN age ELSE NULL END) AS west_oakland_avg, 
    AVG (CASE WHEN location = 'Rockridge' THEN age ELSE NULL END) AS rockridge_avg 
    FROM Stops GROUP BY Race

In the above query, we compute the averages using a `CASE` statement.

