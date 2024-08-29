# String Manipulation

**Last updated**: August 27, 2024

See the Postgres docs [Section 9.7](https://www.postgresql.org/docs/current/functions-matching.html) for a more in-depth description of the below.

## LIKE, NOT LIKE

The `LIKE/NOT LIKE` keywords, which are often
used in `WHERE` clauses to find matches between a string and a given
pattern. Using this keyword, two specific characters are used to
substitute for one or more characters in a pattern string:

-   `%` matches zero or more characters

-   `_` matches a single character

If the pattern does not contain any percent sign (`%`) or underscore (`_`), then `LIKE/NOT LIKE` function as exact match.

## Advanced string functionality
There are many string manipulation functions, such as `substring`,
`strpos` (starting position of a substring), concatenation and more. For
example, the `substring` function extracts the substring from a string
with start and count parameters.

```{note}
Unlike in Python, SQL strings are indexed from 1.
```

## REGEXP_REPLACE
PostgreSQL can also handle regular expressions, e.g., with `REGEXP_REPLACE`. 
