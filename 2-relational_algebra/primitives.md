# Relational Algebra Overview

**Last updated**: September 6, 2024

In the last note, we briefly touched on the relational data model and
introduced some basic SQL syntax in the `SELECT FROM WHERE` format. In
this note, we'll revisit the relational data model more formally with relational algebra,
which provides the foundation for many data systems, such as SQL.

## Set Relational Algebra

An algebra is a mathematical theory that defines formulaic operations on variables of specific domains, thereby determining mathematical properties in those domains. For example, elementary algebra defines operations on arithmetic variables, linear algebra defines operations on vectors and matrices, and set algebra defines operations on sets. **Relational algebra** defines operations on **relations**.

The relational algebra theory was popularized by Edgar F. Codd's 1970 work \[1] in defining the relational model, which formed the theoretical basis for relational databases and informed the concurrent development of relational database management systems (rDBMSes).

We will introduce relational algebra in the context of **set** relational algebra (set RA). This means we assume that each relation has a **set** of attributes (unordered, no duplicates) and an unordered **set** of tuples (unordered, no duplicates).
At the conclusion of this chapter, we extend our discussion to **bag** RA and why operations on bags are generally preferred in rDBMSes.

## Primitive RA Operations

Relational algebra (RA) has six primitive operators, upon which all other complex operators are formed:

1. Projection
1. Selection
1. Renaming
1. Product
1. Union
1. Difference

These operations take as operands one or more input relations and produce an output relation.

## Unary Operators: Projection, Selection, Renaming

We first discuss the three primitive **unary operators**, where each operator $f$ takes as input one operand relation $R$ with schema $(B_1, \dots, B_m)$ and outputs an output relation $f(R)$. The output relation can be unnamed.

1. **Projection**, $\pi_{A_1, A_2, \dots, A_n}(R)$.

    The projection operator outputs a relation that contains the tuples of the input relation $R$, but restricted to set of attributes $\{A_1, \dots, A_n\}$. In other words, the output relation's attributes $\{ A_1, \dots, A_n \}$ is a subset of the input relation's attributes $\{ B_1, \dots, B_m\}$, where $n \leq m$.

1. **Selection**, $\sigma_C(R)$.

    The selection operator outputs a relation that contains the tuples of input relation $R$ that satisfy the row condition $C$. The row condition is defined to contain attributes with boolean expressions: $=$, $>$, $<$, $!=$, AND ($\wedge$), OR ($\vee$), NOT ($!$), etc. Because selection is a row filter, the input and output schema share the same schema, with set of attributes $\{B_1, \dots, B_m\}$.

1. **Renaming**, $\rho_{S(A_1, \dots, A_m)}(R)$, equivalently $\rho_{S(B_{i_1}\rightarrow A_1, \dots, B_{i_n} \rightarrow A_n)}(R)$.

    The renaming operator outputs a relation with the same data as the input relation, but with renamed attributes and/or relation name. The number of attributes, $m$ therefore stays consistent across the input and output relation, and the data in tuples does not change. We provide two notations above. In the former, we denote the names of the full set of $m$ attributes in the output relation, including the unchanged attribute names. In the latter, we specify the $n$ attributes to rename, where input relation attribute $B_{i_j}$ is renamed to attribute $A_{j}$, for $j = 1, \dots, n$, and $n \leq m$. In both notations above, the output relation name $S$ is optional.

In terms of a `SFW` SQL query, the selection operator maps to `WHERE`,
the projection operator maps to `SELECT`, and the renaming operator maps
to `AS`.

### Examples

Suppose that we have two relations with the following schema:

* $titles(title\_id, type, primary\_title, runtime\_minutes)$
* $people(person\_id, name, born, died)$

1. $\pi_{title\_id, primary\_title}(titles)$ outputs a relation with tuples of $titles$ that are restricted to the attributes $title\_id$ and $primary\_title$. In other words, we "drop" the other attributes $type$ and $runtime\_minutes$.

1. $\sigma_{born > 1980}(people)$ outputs a relation with tuples of $people$ that satisfy the condition where $born > 1980$.

1. $\rho_{persons(person\_id, name, birth, death)}(people)$ outputs a relation named $persons$ that has the tuples of $people$ but renames attributes $born$ and $died$ to $birth$ and $death, respectively, and keeps $person\_id$ and $name$ unchanged.

1. $\rho_{persons(born \rightarrow birth, died \rightarrow death}(people)$ does the same as the previous example but is more concise.

## Binary Operators: Cartesian Product, Union, and Difference

We next discuss the remaining three primitive operators, which are all  **binary operators**.
Each binary operator $f$ takes as input two operand relations $R_1$ and and $R_2$ with schemas $(A_1, \dots, A_n)$ and $B_1, \dots, B_m)$, respectively, and outputs an unnamed output relation $f(R_1, R_2)$.

1. **Product** (or Cross Product, Cartesian Product), $R_1 \times R_2$.

    The product operator outputs a relation with tuples that associates each tuple in the left operand with
each tuple in the right operand.  The output schema is therefore $(A_1, A_2, \dots, A_n, B_1, B_2, \dots, B_m)$. Because a relation's attributes are defined on a set, if $A_i = B_j$ for attributes $A_i \in R_1$ and $B_j \in R_2$, then the output relation renames attributes $A_i$ and $B_j$ to $R_1.A_i$ and $R_2.B_j$, respectively. If $R_1$ and $R_2$ have $n_1$ and $n_2$ rows, respectively, then the output relation has $n_1 n_2$ rows.

1. **Union**, $R_1 \cup R_2$.

    The union operator outputs a relation that has the set union of rows in $R_1$ and $R_2$. In other words, $R_1 \cup R_2$ contains one of every tuple that is in either $R_1$ and/or $R_2$. For the union to be defined, the two input relations must have the same schema, i.e., $n = m$ and there exists some distinct mapping $A_i = B_j$ for $i = 1, \dots, n, j = 1, \dots, n$. The output relation therefore also shares the schema $(A_1, \dots, A_n)$.

1. **Difference**, $ R_1 - R_2$.

    The difference operator outputs a relation that has the set difference of rows in $R_1$ and $R_2$. In other words, $R_1 - R_2$ contains one of every tuple that is in $R_1$ but not in $R_2$ and is the empty relation if no such tuples exist. As with unions, the input relations and output relation must share the same schema.

```{note}
Remember, relational algebra describes precise operations on relations, not tables in a database. While the SQL Standard (and consequently most DBMSs) are designed to conform to these rules and expectations, sometimes specific implementations (like PostgreSQL) will bend the rules of relational algebra for practical purposes. As an example, see the [Postgres docs on UNION](https://www.postgresql.org/docs/current/typeconv-union-case.html).
```

## Derived Operations

Other operations can be expressed as derivations of the operations we've
listed above.

**Intersection**, $R_1 \cap R_2$: Defined as the set intersection of rows in $R_1$ and $R_2$. This is a composition of union and difference; we leave the derivation as an exercise for you.

## Joins

Several joins can be expressed as a special case of Cartesian product and the three unary operators. We assume the same definition of input relations $R_1, R_2$ as above.

1. **Theta join**, $R_1 \bowtie_{\theta} R_2$.

    The theta join outputs a relation that joins two relations such that each row satisfies the condition $\theta$. It is defined as $R_1 \bowtie_{\theta} R_2 = \sigma_{\theta}( R_1 \times R_2)$. Because it is defined with a cross product, the output schema distinguishes common attributes $A_i$ in $R_1$ and $B_j$ in $R_2$ as $R_1.A_i$ and $R_2.B_j$, respectively.

1. **Equi join**.

    The equi join is a special case of the theta join, where $\theta$ is an "equality condition," i.e., contains only boolean expressions involving equality ($=$) and logical AND ($\wedge$).

1. **Natural join**, $R_1 \bowtie R_2$.

    The natural join outputs a relation that joins the two input relations $R_1$ and $R_2$ such that rows are matched on common attributes and removes duplicate attributes in the output relation schema:

    1. Cross product of $R_1$ and $R_2$.
    1. Selection with equality condition $\theta$, where $\theta$ filters out rows for which shared attributes do *not* have matching values. In other words, *for each* attribute pair $R_1.A_i, R_2.B_j$ where $A_i$ in $R_1$ and $B_j$ in $R_2$ have the same attribute name ("common attributes"), only keep the tuple if its values for $R_1.A_i$ and $R_2.B_j$ match.
    1. Rename one set of common attributes back to their original name, e.g., $R_1.A_i$ is renamed to $A_i$ for each $A_i = B_j$.
    1. Drop the other set of common attributes, e.g., drop $R_2.B_j$.

Here, it is easier to illustrate the natural join with an example. Suppose we have the two relations:

* $crew(tid, pid, c, j)$
* $people(pid, n, b, d)$

The natural join of crew and people would then satisfy:

$crew \bowtie people = \pi_{tid, pid, c, j, n, b, d}\bigl(\rho_{crew.pid \rightarrow pid} \bigl( \sigma_{crew.pid = people.pid} (crew \times people) \bigr) \bigr)$.

In special cases, the natural join reduces to other operators. Suppose we have the three relations $R(A, B), S(A, B), T(C, D)$. Then $R \bowtie S = R \cap S$, and $R \bowtie T = R \times T$.

## Bag Relational Algebra

Relational Algebra provides a common set of operations that can be used to compare the utility of different data systems. For example, Python pandas does not directly support theta join; only equi join. SQL supports most operations, but implements projection with the SELECT keyword (and selection with the WHERE keyword).

While we have defined relational algebra operations above using *set* relational algebra, in reality many data systems use a relational data model defined on **bags**, where both attributes and tuples are unordered collections that could contain duplicates.

Operations on bags are generally easier to implement than the equivalent operations on sets, because creating a bag does not involve the added step of checking for copies, or duplicate tuples. Further more, bags are meaningful depending on the data domain; in other words, it may be meaningful for a relation to contain multiple copies of the same tuple.

The below table is a brief comparison of bag RA and set RA operators. We define "# of occurrences" as the sum total of duplicate tuples in the output relation.

| Operator | Bag operation | Performance compared to Set RA | Comments |
| ---- | --- | --- | --- |
| Selection | Preserve # of occurrences | Roughly as fast |
| Projection | Preserve #  of occurrences | Faster than set | SQL SELECT is a common operation |
| Product | Preserve # of occurrences | Roughly as fast |
| Union | Add # of occurrences | Faster than sets |
| Difference | Subtract # of occurrences | Roughly as fast
| Renaming | - | - | Unchanged |
