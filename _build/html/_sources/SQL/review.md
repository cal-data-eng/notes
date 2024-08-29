# SQL Review

**Last updated**: August 27, 2024

This is a review of Data 100 SQL syntax, plus more.

In this course, we'll cover three types of data systems in this course—dataframes, relational databases, and Spark. This note will focus on the relational data model and a review of SQL—the language used to interact with relational data systems.

**Structured Query Language**, or **SQL** (pronounced "sequel"), is a high-level data transformation language supported by relational databases and other data systems like Spark. It is **declarative** rather than imperative, meaning:

*   Describes what rather than how
*   It's query-centric rather than code-centric

This course uses a dialect or flavor of SQL called **PostgreSQL** (shortened as Postgres, pronounced "POST-gress"). PostgreSQL is also the eponymous free, open-source **database management system (DBMS)** that is SQL-compliant. We'll discuss DBMSes thoroughly throughout this course.

## SQL Query Order of Execution

You have likely had some experience with other SQL dialects---perhaps duckDB, or SQLite. This note therefore starts with a quick refresher of the **SQL query structure**, to make for easy reference. The rest of this note follows with conceptual explanations and details.

As a declarative language, SQL statements are not evaluated left-to-right, top-to-bottom.
Instead, each SQL query is meant to read like English. The execution order, however, evaluates certain *clauses* in the query before other clauses in the query. Conceptually:

```
SELECT S                -- 5
FROM R1, R2, ...        -- 1
WHERE C1                -- 2
GROUP BY A1, A2, ...    -- 3
HAVING C2;              -- 4
```

Order of evaluation:
1. `FROM`: Fetch the tables and compute the cross product of the relations R1, R2, … 
1. `WHERE`: For each tuple from 1, keep only those that satisfy condition C1
1. `GROUP BY`: Create groups of tuples by A1, A2, etc. At this time, for each group, compute all aggregates needed for C2 and S (below).
1. `HAVING`: For each group, check if condition C2 is satisfied.
1. `SELECT`: Add to output based on attribute set S.

Note that `WHERE` is therefore a row filter that happens **before** groups are made,
whereas `HAVING` is a group filter that happens **after** groups are made.

```{note}
By convention, SQL keywords are in all caps, e.g., `SELECT *`, while attributes are in lowercase.
```

```{note}
End queries with a semicolon.
```

## The Relational Data Model

Let's start with terminology drawn from the **relational data model**.
The relational data model is the primary abstraction of the SQL landscape.

A **relation** is a collection of tuples, each with a predefined collection of **attributes**. Each attribute has a type, called a domain, which must be atomic (e.g., string or integer). The order of the tuples in a relation does not matter. Relational algebra, the theoretical foundation of SQL, assumes that relations are sets of tuples. Generally, SQL relations allow for duplicate tuples, but also does not guarantee that tuples are stored in a particular order.

The **schema** of a relation is a list of attribute names and their domains (the data types associated with each attribute). The schema often includes the relation name itself, if it exists. For example, in the IMDb dataset, the schema for the `title` relation is:

```sql
title (title_id String, ordering Integer, title String,
        region String, language String...)
```

An **instance** is a specific instantiation of the relation, i.e., tuples with specific values. This word is used less often, but we define it here to draw attention to the idea that a relation could hold different tuples over time.

In general, think relation as a table of data whose columns (i.e., attributes) are organized according to a specific relational schema. You will hear "relation" and "table" used interchangeably, though the forme ris more specific. A **relational database** is a collection of relations, which are often related to each other according to some **database schema** or **relational schema**.

## SELECT-FROM-WHERE (SFW)

Let's start simple. Below is the `SELECT FROM WHERE` (**SFW**) query structure, the most standard SQL query structure to extract records from a relation:

```sql
SELECT attributes
FROM tables
WHERE condition about tuples in tables;
```

Remember---SQL is a declarative language! Instead of evaluating the SQL query from first to last line, it is evaluated like so:

1. `FROM` clause: lists the table
1. `WHERE` clause: filters for the matching tuples
1. `SELECT` clause: filters for the specified attributes.

## Aggregations and Grouping

We can also **aggregate** a column in a `SELECT` clause according to a particular aggregation function: `SUM`, `MIN`, `MAX`, `AVG`, `COUNT`, etc.

```
SELECT MAX(age), AVG (age)
FROM stops;
```

The above query computes the minimum and maximum values of the `age` attribute from the `stops` relation. To be more specific, the return value of the above SQL query is an unnamed relation with a single tuple; the relation schema contains two numeric types:

```
 max | avg 
-----+------
 32  | 25.3 

```

The precise attribute names (above, "max" and "avg") varies based on SQL flavor and may contain the atribute itself (e.g., "MAX(age)", "avg(age)", etc.).

`COUNT(*)` uses the special asterisk symbol (`*`) to count the number of tuples.

```
SELECT COUNT(*) FROM stops;
```

returns the number of tuples in the Stops relation. 

### Grouping

In some cases, we may want to compute an aggregate for each "group" of
tuples as opposed to an overall COUNT, MAX or SUM. To do so, we add a
`GROUP BY` clause after the SELECT-FROM-WHERE. For example, say we
wanted to find average and minimum ages for each location:

    SELECT location, AVG(age) AS avgage, MIN (age) as minage
    FROM stops
    GROUP BY location

Notably, if aggregation is used, then each element
of the SELECT clause **must either be an aggregate or an attribute in the
GROUP BY list**. This is because if an attribute is not being aggregated
or being grouped, we have no way to "squish" the values down per group.

Also note that `AVG` (and other aggregations) ignore null values; we discuss this more below.

Postgres supports many aggregate statistics: standard deviation,
covariance, regression slope/intercept, correlation coefficient, and
more. Say we wanted to find the median age of stopped people:

    SELECT zip, PERCENTAGE_DISC(0.5) 
    WITHIN GROUP (ORDER BY age) 
    FROM stops

We can also use more sophisticated syntax in GROUP BYs; for example, the
following query computes the average ages of stops across various days
for West Oakland and Rockridge individually:

    SELECT days, 
    AVG (CASE WHEN location = 'West Oakland' THEN age ELSE NULL END) AS west_oakland_avg, 
    AVG (CASE WHEN location = 'Rockridge' THEN age ELSE NULL END) AS rockridge_avg 
    FROM stops GROUP BY days

In the above query, we compute the averages using a `CASE` statement.

## HAVING

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

## Symbols and Additional Keywords

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

## CAST
Casting converts one attribute type to another. For example, to cast the `premiered` attribute from string type to integer:

```sql
CAST(premiered AS INTEGER)
```

## NULL

Tuples can have NULL values for attributes, which we need to take note of when performing queries. Generally, NULLs do not satisfy conditions—for example, if a tuple value is `NULL`, `born < 2023` and `born >= 2023` will both evaluate to `FALSE`. This leads to some unintuitive behavior, for example:

```sql
SELECT born FROM people WHERE born < 2023 OR born >= 2023;
```

The above query will return all tuples that don't have a `NULL` born value, not all the tuples in the relation! If we want all the tuples, we need to explicitly test for `NULL`:

```sql
SELECT born FROM people WHERE born < 2023 OR born IS NULL;
```

For aggregations, `NULL` values are not involved. For example, the average of a column will be the average of all the non-null values in that column. However, if all the values in the column are `NULL`, the aggregation will also return `NULL`.

## CASE

The CASE keyword enables condigional expressions. We refer you to the PostgreSQL docs [Section 9.18](https://www.postgresql.org/docs/current/functions-conditional.html) for more information.
