(query-planning)=
# Query Planning

**Last updated**: October 13, 2024

## Indexes, continued

We will continue to explore indexes, specifically B+ Trees and Hash Indexes.

Indexes can be stored in a variety of formats. The most popular type of index in data systems are B+ trees, which are essentially an extension of a generic binary search tree. Unlike binary search trees, B+ trees have a high fanout, meaning they are likely to have many children at each level. B+ trees are self-balancing and maintain certain fill-factor (usually half). They have logarithmic complexity for all operations. B+ trees are advantageous because they can very quickly find index keys with fast lookup times, i.e., $O(d)$ where d is depth of tree.

One other prominent type of indexes are hash indexes, which are hash-based
dictionaries. These have constant complexity (i.e., $O(1)$) but can only handle value lookups (not range lookups).

## Query Execution Plan

How are queries actually executed by the data system? The system uses several pieces of information (listed below) to develop multiple query plans, then picks the best one using cost estimates.

- The query Q itself
- The base relations/views, including CTEs
- Indexes on relations (if relation is clustered on an index)
- Statistics about the relations

### Converting a Query Plan

We'll now cover how we covert a logical query plan into a physical one. There are four steps.

**Step 1.** First, convert the SQL query to a logical query plan in the form of an extended relational algebra expression. Sometimes, complex SQL queries get decomposed into multiple query plans (e.g., CTEs or subqueries).

**Step 2.** Apply rewriting to find other equivalent logical plans. To do so, we rewriting rules, or algebraic laws that allow us to manipulate relational algebra expressions, such as commutative, associative, and distributive laws.

**Step 3.** Use cost estimates to pick among the logical plans and the corresponding physical plan. The query optimizer is responsible for this step. Cost estimates use a combination of I/O costs and CPU but are often inaccurate, since they are done based on coarse-grained statistics. There are some heuristic rules that restrict the search space (e.g., predicate and projection push down).

**Step 4.** Feed the corresponding physical plan to the query processor. Query optimization gives us a physical query plan that consists of a sequence or workflow of physical operators and specifies whether intermediate results are ``pipelined'' or materialized. Pipelining is an approach where tuples can “flow up” from the bottom operators to the top as soon as they are ready, allowing operators to do work in parallel.

### Logical and Physical Operators

The query execution plan lays out how to proceed. We can think of plans at two levels:

- The logical level: the logical operators describe "what" is done: union, select, grouping, project, etc.
- The physical level: the operator implementations describe "how" to do it

In code-centric data systems, the user can supply both the logical query plan, and parts of the physical implementation or leave the physical implementation to the system.

Now, we'll cover different physical implementation of logical operators. A simple table scan would read all blocks on disk one-by-one. An index scan would first read the index and then use it to read relevant blocks. A heap scan first scans the index page to identify the unique pages to visit, then sequentially scans these pages.

## Relational Algebra Laws

Let us examine properties of union and joins through sets (no duplicates).

- Commutative: $R \cup S = S \cup R$, $R \Join S = S \Join R$
- Associative:
    - $R \cup (S \cup T) = (R \cup S) \cup T$
    - $R \Join (S \Join T) = (R \Join S) \Join T$
- Distributive: $R \Join (S \cup T) = (R \Join S) \cup (R \Join T)$

### Laws involving Selection

- Cascading: $\sigma_{C\: AND\: C'}(R) = \sigma_C(\sigma_{C'}(R))$
- Distributive with union: $\sigma_{C}(R \cup S) = \sigma_C(R) \cup \sigma_{C}(S)$
- Predicate Pushdown:  $\sigma_{C}(R \bowtie S) = \sigma_D(\sigma_E(R)) \bowtie \sigma_F(S))$

For selection, a simplifying law called predicate pushdown is important to know. This rule states that the predicate can be applied before / after `SELECT` without impacting the final result. The performance implication of this rule is that the earlier we process selections, the more we reduce data "at source", and the less we need to manipulate later for more expensive operations (e.g. joins). There is also a similar simplifying law for projection called projection pushdown.

### Laws involving Projection

- Cascading: $\pi_M(\pi_N(R)) = \pi_M(R)$ we can drop $\pi_N$ beause it is redundant
- Projection Pushdown:  $\pi_M(R \bowtie S) = \pi_M(\pi_P(R) \bowtie \pi_Q(S))$ where $\pi_P(R)$ is just the columns of M in R plus the necessary columns of R needed to do a natural join and $\pi_Q(S)$ is just the columns of M in S plus the necessary columns of S needed to do a natural joins, so that we can obtain only the necessary columns "earlier"

## Query Processing for Joins

Joins are often the hardest part in the query process and optimization since they are the only operators that "multiply". There are many different join orders and trees, leading to a very large exponential search space. For example, with n many relations, there are n! ways to order the join. Furthermore, there are a lot of bad join orders that can lead to giant intermediate relations (e.g., first joining larger relations before smaller ones). A variety of approaches have been developed for optimization. One notable one is the "Selinger" algorithm, which only considers left deep trees. The top-down approach, exemplified by the Cascade query optimizer, is also a popular choice.

 We will now explore three different ways to join using example tables R and S.

**Nested Loop Joins.** The nested loop join is straightforward: for every tuple of R and S, check if it matches. If it does, add it to the output! There are variants of this method, including index-nested loop which uses an index in the "inner" loop to look up only blocks of S that can match the k blocks of R.

**Sort-Merge Joins.** This method involves two phases. The first phase is the sort phase: sort portions of R on the join attribute, and write out the sorted runs of blocks. Do the same thing for S. The second phase is the merge phase: merge and match tuples across the runs from the first phase by walking down the runs in sorted order. There are also variants that can use indexes and take advantage of relations that are already sorted.

**Hash Joins.** The hash join also involves two phases. In the first phase, both R and S should be hashed into buckets based on the join attribute. Then in the second phase, all the tuples hashed into each bucket should be read from both R and S at a time and the join should be performed. One variant is based on whether one of the relations can fit entirely in memory.

For our remaining operators, filters and projects can simply be "applied" to the results of an operation, so there are no specific physical operator choices. The exception is index-scan for which filtering done as part of scanning. For aggregation and grouping, hashing and sorting are key techniques, If an index is present, it can be used to retrieve in sorted order.

Overall, there are many variations in the physical design of operators, but most rely on a small set of techniques, including sorting, hashing, indexing, and nested-looping. While we've covered these techniques, we haven’t talked about what might work best in a given setting. To do so, we need a cost model to take into account the sizes of the relations, the distributions of values, and buffer sizes.
