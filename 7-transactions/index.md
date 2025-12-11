(structure:transactions-index)=
# Transactions
When updating our DB system, we need to consider two main features:
**Concurrency Control**:
- Many users query and update a database simultaneously.
- How do we avoid confusion / incorrect state?

**Recovery**:
- What happens when things fail?
- Many such failure modes: Cancel modification partway,
app failure, DB engine failure, HW failure…

To understand these features, we need to introduce the concept of **transactions**.

* [](#xaction)