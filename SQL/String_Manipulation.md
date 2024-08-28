# String Manipulation

**Last updated**: August 27, 2024

So far, we have only seen the `LIKE/NOT LIKE` keywords, which are often
used in `WHERE` clauses to find matches between a string and a given
pattern. Using this keyword, two specific characters are used to
substitute for one or more characters in a pattern string:

-   \% matches zero or more characters

-   \_ matches a single character

There are many string manipulation functions, such as `substring`,
`strpos` (starting position of a substring), concatenation and more. For
example, the `substring` function extracts the substring from a string
with start and count parameters. It is important to note that when using
these functions, unlike in python, SQL indexes from 1. PostgreSQL can
also handle regular expressions, e.g., with REGEXP_REPLACE.