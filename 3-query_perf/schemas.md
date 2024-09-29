# PostgreSQL Schemas
**Last updated**: September 29, 2024

We've now explored different ways that SQL can process and optimize our queries to improve performance and cost times. We'll now take a look at what underlying information SQL accesses to do this. 

## PostgreSQL Schema Statistics
- **public** is a public schema that users can read/write/insert. 
- **pg_catalog** is specific to Postgres and includes settings, statistics, values, etc.
- **information_schema** maintains metadata about objects in the database.
- **pg_toast** maintains data that can't regularly be stored in relations, such as very large data values.

In demo, we looked at what information we could retrieve from pg_catalog: `relname` (name of table), `relkind` (relation kind), `reltuples` (number of tables), and `relpages` (size of on-disk representation in pages). Similarly, we can look into `pg_stats` to look at relation statistics, such as `null_frac` (fraction of tuples that are null), `avg_width` (average width in bytes of column's entries), `n_distinct` (estimated number of distinct values for that column), and more. 

Note: `reltuples` and `relpages` are not updated on the fly, and are only approximated by VACUUM, ANALYZE, and a few DDL commands. 