# Index Selection
**Last updated**: September 12, 2024

## Indexes
Indexes allow a user to perform queries that look for data matching certain characteristics, as they are essentially data structures storing “index key-location” pairs. Indexes can reduce the amount of scanning needed for an individual query. The process is as follows: the system checks for the index (which is already in the system's memory) and finds the exact location(s) corresponding to the index key. The system then fetches exactly the pages that have those record locations. Notice the differences between this process and during a sequential scan. 

To declare an index, use the following syntax:
```sql
CREATE INDEX nameIdIndex ON Actor(name,id);
```

Similarly, to drop an index:
```sql
DROP INDEX idNameIndex;
```

PostgreSQL chooses which type of scan to use! In lecture, we saw how PostgreSQL chose between an index scan, sequential scan, and bitmap heap scan. A command, `EXPLAIN ANALYZE`, runs and shows the execution plan of a statement and displays actual run-time statistics. Use this to understand what a query is actually doing, i.e., how the system interacts and fetches records:

```sql
EXPLAIN ANALYZE <sql statement>;
```

Indexes may seem magical, but there can be high the maintenance costs during updates, deletes, inserts. If an index is not maintained, it may lead to inaccurate query results. So, which indexes should we create?

Indexes are especially useful for the following cases:
- When your relations are large
- When sequential scans are too time-consuming
- When joins are present


Many databases automatically create indexes for **PRIMARY KEY** or **UNIQUE** attributes. This helps enforce constraints and many queries tend to be based on these attributes.

### Cardinality

One important consideration for indexes is **cardinality**, or the number of distinct values for a particular attribute. High cardinality attributes are great to index on because there are higher potential savings compared to having to search through many values. On the other hand, low cardinality attributes are not great for indexes. The exception is if data is clustered on that attribute; in this case, we can read many fewer blocks.

Indexes are also good on attributes used often in **WHERE** clauses, key attributes, and attributes that are "clustered". Indexes are not very good on attributes where there are many tuples per value
of attribute and tables that are modified more often than queried. 
