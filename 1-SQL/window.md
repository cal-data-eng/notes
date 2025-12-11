# Window Functions

**Last updated**: April 7, 2025

**Window functions** allow us to perform calculations across a window of rows related to the current row, without collapsing the result into a single value like `GROUP BY` does. Think of them as a way to get aggregate-like insights while still preserving the individual rows. In contrast to `GROUP BY ` aggregate functions, which return one row per group, window functions return one row per input row.

Examples of when you might want to use a window function:
- Compute a cumulative sum
- Determine the rank within a group
- Compare current row values to previous/next ones

## Basic Syntax

```sql
<window or agg_func> OVER (
  [PARTITION BY <...>]
  [ORDER BY <...>]
  [ROWS/RANGE BETWEEN <...> AND <...>]
)
```
The syntax can consist of 3 ingredients:
- `PARTITION BY` (optional): Defines how to divide the dataset into partitions (similar to groups in GROUP BY). If omitted, the entire table is treated as one partition.
- `ORDER BY` (optional): Orders the rows within each partition. Required if using `ROWS` or `RANGE`.
- `ROWS/RANGE BETWEEN` (optional): Specifies the window frame or the subset of rows relative to the current row. Requires `ORDER BY` to be present. 
  - If omitted entirely, the default frame is:
    - `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` (if no `ORDER BY` is specified).
    - `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` (if `ORDER BY` is specified).

## Example
```sql
SELECT name, department, salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees;
```
This query ranks employees within each department by salary. The higher the salary, the better the rank (1 = highest).

## ROWS vs. RANGE
These two keywords define the frame of rows to include around the current row.

- ROWS: Refers to a specific number of physical rows based on position (e.g., 2 before and 2 after)

```sql
SUM(sales) OVER (
  ORDER BY sale_date
  ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
)
```
This would include the current row and the 2 before it, based strictly on row positions.

- RANGE: Includes all rows with values within the same range as the current row based on the `ORDER BY` field. It's more value-sensitive than row-sensitve. 

```sql
SUM(sales) OVER (
  ORDER BY sale_amount
  RANGE BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING
  )
```
This includes all rows that have the same or greater `sale_amount` as the current row.


## Common Window Functions
| Function          | Description                                                  |
|-------------------|--------------------------------------------------------------|
| `RANK()`          | Assigns a rank to each row within the partition. If multiple rows have the same value, they receive the same rank, and the next rank(s) are skipped |
| `DENSE_RANK()`    | Like `RANK()`, but no gaps in rank values. Tied rows share the same rank, and the next rank continues consecutively                        |
| `ROW_NUMBER()`    | Assigns a unique row number within each partition            |
| `LEAD(expr, n)`   | Returns the value of `expr` n rows after the current row. `expr` can be any column or expression       |
| `LAG(expr, n)`    | Returns the value of `expr` n rows before the current row      |
| `PERCENT_RANK()`  | Relative rank as a fraction between 0 and 1                  |
| `NTH_VALUE(expr, n)` | Returns the value of expr at position n in the window     |

## The WINDOW clause

If you're applying multiple window functions using the same partition/order structure, don't repeat yourself! Use the `WINDOW` clause to define the logic once:

```sql
SELECT name,
       SUM(salary) OVER w AS total_salary,
       AVG(salary) OVER w AS avg_salary
FROM employees
WINDOW w AS (PARTITION BY department ORDER BY salary DESC);
```
This makes your SQL cleaner and avoids errors when copy-pasting window definitions.