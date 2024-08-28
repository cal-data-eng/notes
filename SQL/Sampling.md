# Sampling

**Last updated**: August 27, 2024

We can also *sample* tuples, or select a subset of tuples. This is
desirable when the original dataset might be too large, and you want to
experiment quickly before running operations on the full dataset. There
are 3 sampling methods discussed in this class:

-   `SELECT * FROM Table ORDER BY RANDOM() LIMIT N`: randomly sorts the
    rows of the table and takes the first $n$ rows.

-   `SELECT * FROM Table TABLESAMPLE BERNOULLI(percentage p)`: takes a
    $p\%$ uniform random sample based on flipping a p%-probability coin

-   `SELECT * FROM Table TABLESAMPLE SYSTEM(percentage p)`: tuples are
    grouped in pages on disk, so $p\%$ of pages are uniformly randomly
    selected

`RANDOM` is expensive for large tables, due to the sorting of all the
rows. While `BERNOULLI` is faster than `RANDOM`, it is slower than
`SYSTEM`, due to more random accesses. `SYSTEM` is therefore the fastest
method, but the least "random" due to page-level sampling.
