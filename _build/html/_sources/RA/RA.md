# Relational Algebra 

**Last updated**: September 5, 2024

# Introduction

In the last note, we briefly touched on the relational data model and
introduced some basic SQL syntax in the `SELECT FROM WHERE` format. In
this note, we'll revisit the relational data model in more depth, focus
on common relational algebra operations, and see some more advanced SQL
commands.

# Relational Algebra

The operations that help us transform relations are known as relational
algebra. A set is an unordered collection with no duplicates. Since a
relation has a set of attributes and a set of tuples, we can reorder
both and not change the relation. In lecture, we covered set operations,
such as union and difference. But let's first focus on unary operators:
Operators that take in exactly one operand, a relation $R$, and output
the relation $S$.

## Projection, Selection, Renaming

Suppose we have relations $R$ and $S$, where each relation is a set of
tuples as previously defined. The **projection** operator returns
columns specified for all tuples in a relation. We use the notation
$\pi_{A_1, A_2, \dots, A_n}(R)
$to represent values for columns $A_1, A_2, \dots, A_n$ in $R$.


The **selection** operator selects or returns all tuples that satisfy
some condition; in other words, it keeps only rows that satisfy some
condition. We use the notation $\sigma_c(R)$ to represent the selection
of tuples in $R$ that satisfy condition $c$.

We could also perform a **renaming** operation, where we change the
schema of a relation. This operator can rename two types of things:
attributes, and/or the relation name itself. To rename attributes, we
denote this as either
$\rho_{S(A_{i1} \rightarrow B_{i1}, \dots, A_{in} \rightarrow B_{in})}(R)$,
where $R$ is the input relation and $S$ is the output relation, or by
relisting all attributes in the schema, while renaming certain columns.
We will cover renaming relations in a few lectures. Projection and
renaming changes the metadata (schema), while selection does not.

::: example
Say we want to rename two columns in the people relation, born to birth
and died to death, respectively. We express this as either:
$\rho_{Persons(person\_id, name, birth, death)}(People)$ or simply
$\rho_{Persons(born \rightarrow birth, died \rightarrow death}(People)$.
:::

In terms of a `SFW` SQL query, the selection operator maps to `WHERE`,
the projection operator maps to `SELECT`, and the renaming operator maps
to `AS`.

## Cross-Product

Another operation---the **Cartesian product**, or cross product---is a
binary operation that associates each tuple in the left relation with
each tuple in the right operation. We represent the Cartesian product
between relations $R$ and $S$ as $R \times S$. If the schema for $R$ is
$R(A_1, A_2, \dots, A_n)$ and the schema for $S$ is
$S(B_1, B_2, \dots, B_m)$, then the resulting schema for $R \times S$
will be $R \times S (A_1, A_2, \dots, A_n, B_1, B_2, \dots, B_m)$. The
resulting schema has $n \times m$ number of rows.

## Set Operations

If relations are sets, then the union and difference operators work just
like in set algebra. To **union** the relations ($R \cup S$), the
relations must have the same schema, and the result of the union will
also have the same schema as the individual relations. The result yields
all tuples that are in $R$ or in $S$, where there is one copy of each
tuple in the output relation. **Difference**-ing the relations ($R - S$)
yields tuples in $R$ that are not in $S$.

## Derived Operations

Other operations can be expressed as derivations of the operations we've
listed above. For example, how might you derive the intersection
operator from union and difference operators? Moreover, joins can be
expressed as a special case of Cartesian product and selection: the
**theta join** is a Cartesian product followed by a selection, i.e.,
$R \Join_\theta S = \sigma_\theta (R \times S)$. You can think of a
theta join as performing the cross-product, and then removing tuples
that don't satisfy $\theta$; in other words, a SQL inner join. **Natural
Join** is a join of two relations such that rows are matched on shared
attributes, but without resulting in duplicate attributes.