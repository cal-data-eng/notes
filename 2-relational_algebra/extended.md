# Extended RA Operators

**Last updated**: September 6, 2024

While the six primitive operators can compose many of the relational operations used in SQL and other relational data systems, you may have noticed that very few of them operate on changing the data themselves (beyond adding and removing tuples). To encompass other sorts of data operations, we turn to **extended RA operators**, that manipulate data values themselves, e.g., outer joins to include null values, aggregations to group data values, and so on.

For now, we cover precisely one extended RA operator, the grouping/aggregation operator, $\gamma$.

## Grouping and Aggregation

Suppose we had input relation $R$ with schema $(C_1, \dots, C_n)$. The output relation resulting from grouping on attributes $(B_1, \dots, B_n)$ where $\{B_1, \dots, B_n\} \subset \{C_1, \dots, C_n\}$ and computing aggregations $agg_1, \dots, agg_k$ can be written as $\gamma_{A_1, \dots, A_n, agg_1, \dots, agg_k}(R)$. By convention, the grouped attributes come first, followed by the aggregations. Yes, it's unwieldy. Good times.

## SQL query to Relational Algebra

Suppose that we have the following query:
```sql
SELECT a1, a2, …, an, agg1(d1), agg2(d2), …, aggp(dp)
FROM R1, R2, …, Rk
WHERE C
GROUP BY b1, b2, …, bm
HAVING H
```

We could write the SQL order of execution of the above query using extended relational algebra as follows:

$\pi_{list} \biggl( \sigma_H \biggl( \gamma_{b1, \dots, bm, agg1(d1), \dots, aggp(dp)} \bigl( \sigma_C (R1 \times \dots Rk ) \bigr) \biggr) \biggr)$, where

* $list$ is the list of expressions in `SELECT`, e.g., $a1, \dots, an, agg1(d1), \dots, aggp(dp)$
* $agg1(d1), \dots aggp(dp)$ are aggregation functions on specific attributes $d1, \dots, dp$ in the cross product of $R1 \times \dots \times Rk$, and
* $a1, \dots, an$ is a subset of the grouped attributes $b1, \dots, bm$.

A more formal definition of this grouping/aggregation operator is available on [Wikipedia](https://en.wikipedia.org/wiki/Relational_algebra#Aggregation), though we note that their notation is slightly different.

We leave your practice of this operator to homework.


