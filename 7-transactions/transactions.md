# Transactions

**Last Updated:** December 4th, 2024

## Transactions
 A transaction is a sequence of multiple actions to be executed as "a unit of work". From SQL view, a transaction is in the form of: 
- Begin transaction 
- equence of SQL statements
- End transaction

### Classic Example: Bank Transfer
Imagine moving $1,000 from one account (1111) to another (9999). This involves two updates:
1. **Debit** $1,000 from account 1111.
2. **Credit** $1,000 to account 9999.

The entire operation must either **fully succeed** or **fully fail**—you can't debit without crediting or vice versa.

**TCL (Transaction Control Language)**

SQL provides commands to ensure that all operations within a transaction are treated as a single unit. These commands include:
- **`BEGIN`**: Starts the transaction.
- **`COMMIT`**: Saves the transaction permanently.
- **`ROLLBACK`**: Cancels the transaction if something goes wrong.

**Example Code**
```sql
BEGIN
-- "Debit" one account
UPDATE checking
    SET amount = amount - 1000
    WHERE acctId = 1111;

-- "Credit" the other account
UPDATE savings
    SET amount = amount + 1000
    WHERE acctId = 9999;

COMMIT;
```

### ACID
Transactions guarantee the ACID properties to avoid the concurrency problems discussed above: 

- **Atomicity**: “All or nothing” nature of a transaction. Either all operations of a transaction are executed or none are.
- **Consistency**: If COMMIT succeeds, all the database integrity checks hold true. (primary key/foreign keys, constraints, etc.)
- **Isolation**: Concurrent transactions should externally appear to run sequentially, i.e., 2 concurrent transactions should not “see” each other’s intermediate results.
- **Durability**: Ensures that once a transaction is committed, its effects are permanent in the database, even in the case of system failures.

## Serialization
### Serial Schedules
- Transaction schedule: a sequence of reads and writes by named transactions on named objects.
- Serial Schedules: transactions that run from start to commit without interleaved actions from any other.
- Serializable Schedules: a schedule that has results equivalent to a serial schedule.

### Conflict Dependency Graph 
We like serializable schedules because they follow isolation property of ACID. How do we know if a schedule is serializable?
We define a notion of conflicting actions, and two actions conflict if:
- They are from two different, concurrent transactions
- They reference the same object
- At least one is a Write 

One way to check if a schedule is serializable is to build a conflict graph. Conflict graphs have the following structure:
- One node per transaction

- An edge exists from `Tᵢ` to `Tⱼ` if:

  -  An operation `Oᵢ` of `Tᵢ` conflicts with an operation `Oⱼ` of `Tⱼ`.

  -  `Oᵢ` appears earlier in the schedule than `Oⱼ`.

A **cycle** corresponds to a schedule that is not **conflict serializable**. A schedule is conflict serializable if and only if its dependency graph is **acyclic**. Every conflict serializable schedule is serializable. An example of a schedule that is not conflict serializable is shown below. 

![Conflict Graph](./conflict-graph.png)

###  Snapshot Isolation 
Serializable transactions satisfy the isolation property in ACID. However, sometimes we want to trade correctness for performance: We can use weak isolation to allow a transaction to choose to be a "bit sloppy," as long as it doesn’t mess up other transactions’ choices to do so. 

The "best" version of this is called snapshot isolation:
- In a snapshot isolated system, each transaction appears to operate on an independent, consistent snapshot of the database. At transaction start: Take a “snapshot” of the database, off which to do reads/writes.
- All the reads of a transaction are from the same snapshot. 
- A transaction can commit if the values updated by this transaction have not been changed externally since the snapshot was taken.
- If transaction T1 has modified an object x, and another transaction T2 committed a write to x after T1’s snapshot began, and before T1’s commit, then T1 must abort.
    
It's a much weaker property of isolation than serialized transactions, but it’s good enough when we prefer more concurrency/higher performance. Isolation levels (both default and maximum) vary in support across different database engines. Because of this, data engineers need to look at different databases and then consider the tradeoff between correctness and performance when choosing the one that matches their application. 
