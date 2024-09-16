# String Manipulation

**Last updated**: September 5, 2024

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
`STRPOS` (starting position of a substring), concatenation (`||`), and more. For
example, the `SUBSTRING` function extracts the substring from a string
with start and count parameters.

```{note}
Unlike in Python, SQL strings are indexed from 1.
```

```sql
SELECT 'Hello' || 'World',
       STRPOS('Hello', 'el'),
       SUBSTRING('Hello', 2, 3);
```
In SQL the [`||` operator][concat_op] means concatenation.

[concat_op]: https://www.postgresql.org/docs/current/functions-string.html#FUNCTIONS-STRING-SQL

```
    ?column? | strpos | substring
-------------+--------+----------
 Hello World | 2      |       ell
```


## REGEXP_REPLACE

PostgreSQL can also handle (POSIX) regular expressions, e.g., with `REGEXP_REPLACE`.

General syntax:

```sql
REGEXP_REPLACE(source, pattern, replacement[, flags])
```

* `source`: source string, or column name, etc.
* `pattern`: POSIX regular expression
* `replacement`: replacement string when pattern matches
* `flags`: Optional parameter. Pass in `g` for to process all matches. See PostgresSQL docs [Table 9.24](https://www.postgresql.org/docs/current/functions-matching.html#POSIX-EMBEDDED-OPTIONS-TABLE) for the full list of options.

This follows standard POSIX regular expressions, and therefore you can use capture groups in both `pattern` (with parentheses to denote the subpattern to capture) and `replacement` (with `\<number>`, where number is the one-indexed index of the capture group.

To refresh on regular expressions, here are some examples:

<style>
table {
    width: 100%;
    
    border-collapse: collapse;
}
th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid black;    
}
th {
   background-color: #f2f2f2;  
}
th.no-wrap, td.no-wrap {
    white-space: nowrap;           
}
</style>

<table>
    <tr>
        <th class="no-wrap">Source</th>
        <th class="no-wrap">Pattern</th>
        <th class="no-wrap">Replacement</th>
        <th>Flags</th>
        <th class="no-wrap">Return Value</th>
        <th>Meaning</th>
    </tr>
    <tr>
        <td class="no-wrap">'Hannah Montana'</td>
        <td class="no-wrap">'(.*) (.*)'</td>
        <td class="no-wrap">'\1'</td>
        <td></td>
        <td class="no-wrap">'Hannah'</td>
        <td>Extract the first name.</td>
    </tr>
    <tr>
        <td class="no-wrap">'Hannah Montana'</td>
        <td class="no-wrap">'(.*) (.*)'</td>
        <td class="no-wrap">'\2, \1'</td>
        <td></td>
        <td class="no-wrap">'Montana, Hannah'</td>
        <td>Extract last name, first name.</td>
    </tr>
    <tr>
        <td class="no-wrap">'Phone Number 510 642 3214'</td>
        <td class="no-wrap">'[a-zA-Z ]'</td>
        <td class="no-wrap">''</td>
        <td></td>
        <td class="no-wrap">'hone Number 510 642 3214'</td>
        <td>Remove **first** alphanumeric character or space.</td>
    </tr>
    <tr>
        <td class="no-wrap">'Phone Number 510 642 3214'</td>
        <td class="no-wrap">'[a-zA-Z ]'</td>
        <td class="no-wrap">''</td>
        <td >'g'</td>
        <td class="no-wrap">'5106423214'</td>
        <td>Remove **all** alphanumeric characters or spaces.</td>
    </tr>
</table>

<!-- | `source` | `pattern` | `replacement` | `flags` | Return value | Meaning |
| --- | --- | --- | --- | --- | --- |
| `'Hannah Montana'` | `'(.*) (.*)'` |`'\1'` | | `'Hannah'` | Extract the first name. |
| `'Hannah Montana'` | ` '(.*) (.*)'` | `'\2, \1'` | | `'Montana, Hannah'` | Extract last name, first name. |
| `'Phone Number 510 642 3214'` | `'[a-zA-Z ]'` | `''` | | `hone Number 510 642 3214` | Remove **first** alphanumeric character or space. |
| `'Phone Number 510 642 3214'` | `'[a-zA-Z ]'` | `''` | `'g'` | `5106423214` | Remove **all** alphanumeric characters or spaces. | -->

Here are some example queries:

1. Extract first and last name of all people:

```sql
SELECT REGEXP_REPLACE(name, '(.*) (.*)', '\2')
         as lastname,
       REGEXP_REPLACE(name, '(.*) (.*)', '\1')
         as firstname
FROM people;
```

2. Count number of first names
```sql
SELECT REGEXP_REPLACE(name, '(.*) (.*)', '\1')
         as firstname,
       COUNT(*) as countname
FROM people
GROUP BY firstname
ORDER BY countname desc;
```

3. Compute length of longest first name
```sql
WITH firstnames AS (
    SELECT REGEXP_REPLACE(name, '(.*) (.*)', '\1')
             as firstname
    FROM people
)
SELECT MAX(LENGTH(firstname)), firstname
FROM firstnames;
```
