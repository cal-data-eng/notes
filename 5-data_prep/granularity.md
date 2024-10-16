# Numerical, Granularity

**Last Updated:** October 6th, 2024

## Numerical Transformations
There are various types of calculations to consider: scalar functions, aggregate functions, and window functions, all of which we have previously learned in SQL.

### Scalar Functions
Recall a scalar is a tensor of dimension 0, or a value in some field. A scalar function is a function on scalar (or atomic) values. In the relational model, this is a function on **constants** and **individual attributes of a single relational tuple**. In relational algebra, they are subscripts of $\pi, \sigma, and \Join$, like $\pi_{a, f(b)} (R)$. Scalar functions are typically quick: they are computed individually on each record and run in parallel. DBMSes often use pipelining to execute scalar functions "on-the-fly" as tuples are emitted. 

A custom form of scalar functions is a user-defined function. You use them as you would use built-in functions. In Postgres:

```
CREATE LANGUAGE plpythonu;

CREATE OR REPLACE FUNCTION pyhash(s text)
  RETURNS text
AS $$
  ## Python text goes here, can reference variable s
  import hashlib
  m = hashlib.sha256()
  m.update(s)          # here's s!
  return m.hexdigest() # return a text
$$ LANGUAGE plpythonu;
```

### Aggregate functions

Aggregate functions take in a set or vector of values as their input. Typical univariate functions include: `min, max, sum, avg, stddev, variance`, etc.. There are also bivariate functions, such as `corr` (correlation). 

Aggregate functions typically must perform a full pass through the data before returning an answer, which can be time-consuming and expensive with large datasets.

### Window Functions

Recall that there is 1 value in output for each "window" of input values. Any aggregate function can be used in a window! Aggregates can be ordered (because windows can be ordered). Refer back to the windowing notes earlier in the semester for syntax and more basic information on window functions. We will focus on 3 different types of window functions.

- Any aggregate function, such as `rank, avg, lag`
- Inverse Distribution Window Function finds the value at a particular "position" in a distribution (i.e. Tukey numbers, percentile). In SQL, this can be seen with `WITHIN GROUP (ORDER BY ...)`
- Hypothetical-Set Window Functions finds the position of a value in a distribution _even if the value was not in the data._


## Granularity

Data is recorded and/or released at different granularities, which implies two concepts. 

**Discretization of numerical granularity:** Measurements denote a specific granularity since we discretize continuous values into a digital measurement that must be encoded by a fixed number of bits. This is constrained by physical device capabilities and digitization.

**Data hierachy:** Numerical data is measured in a hierarchy of units (e.g., seconds, hours, minutes, days). Non-numerical hierarchies also exist.

### Numerical Granularity

Effectively, manipulate the number of "significant digits". We can do this via arithmetic, power of 10, bitwise arithmetic operations, etc.

**Quantize with bitshifts:**
- Shifting **b** bits right (**>> b**) divides by **(2^b)** and drops bits.
- Shifting **b** bits left (**<< b**) multiplies by **(2^b)**.
- Shifting right-then-left by **b** keeps only the leading **n - b** bits and pads the right with 0. This is equivalent to rounding down to the nearest multiple of **2^b**.


### Hierarchical Granularity

Hierarchy dictates the transformations into smaller/larger granularities. These hierarchies can be divided into categories of **explicit** (hierarchy table), **time** (by second, minute, hour), or **space** (geolocation).

One standard way of encoding hierarchical models is by using **IsA** pairs which can be thought of as representing child/parents pairs in a tree. Another way to encode this model is by using **predicates** that describe the relationship between a subject and an object.

### Changing Granularity

We have 2 ways of changing granularity.

**"Roll up:"** Transform to **coarser** grain (e.g., go **up** in a hierarchy).  
**"Drill down:"** Transform to **finer** grain (e.g., go **down** in a hierarchy).

In lecture, in our table `national`, we start with the granularity of a school and then "roll up" to county-level granularity by grouping by a unique `state_numeric` and `county_numeric` key. How do we "roll up" to state-level granularity? We start at the school level and group by once more, but only using `state_numeric`. Here we group by fewer attributes and aggregate more records together.

Let's try drilling down. To drill down, we need to group by more columns to access the `feature_class`. Having done so, we can now use `feature_class` as a unique identifier. In order to drill down, the dataset must have the finer-granularity attribute. Otherwise, we can sample from a model.

Rolling up effectively computes the marginal distribution, and we can use `GROUP BY / COUNT(*)` to compute empirical probability distributions.  
On the other hand, if we were missing drill-down data, we could sample from a model; these downstream records are simulated data.
