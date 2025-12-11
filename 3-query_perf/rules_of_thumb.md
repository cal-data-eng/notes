(rules-of-thumb)=
# Rules of Thumb

**Last Updated**: September 29, 2024

Here are some useful ideas to keep in mind when creating your queries:

- Use indexes to speed up access
- Tell the system to avoid doing extra work by adding LIMIT k if useful
- Materialize if your query is expensive

**Pipelining.** Pipelining is where you scan the first tuple and then decides to pass it along to the next stage (e.g., filter) instead of waiting for all the tuples to be scanned. This allows the scan, filter, and aggregator to work in parallel and decrease waiting time.

**Periodic Reorganization.**
Because Postgres is relatively lazy when it comes to updating, we need to tell Postgres explicitly to update the statistics. VACUUM allows you to recompute statistics in one of two ways: 1) VACUUM ANALYZE; which applies to all tables or 2) VACUUM (FULL, ANALYZE) tablename; which will perform like VACUUM and reorganizes and moves around data.

There are also other settings that you can adjust to optimize performance. Check out the Postgres manual for more.
