# Relational Algebra Overview

**Last updated**: August 28, 2025

In the last note, we briefly touched on the relational data model and
introduced some basic SQL syntax in the `SELECT FROM WHERE` format. In
this note, we'll revisit the relational data model more formally with relational algebra,
which provides the foundation for many data systems, such as SQL.

## Set Relational Algebra

An algebra is a mathematical theory that defines formulaic operations on variables of specific domains, thereby determining mathematical properties in those domains. For example, elementary algebra defines operations on arithmetic variables, linear algebra defines operations on vectors and matrices, and set algebra defines operations on sets. **Relational algebra** defines operations on **relations**.

The relational algebra theory was popularized by Edgar F. Codd's 1970 work \[1] in defining the relational model, which formed the theoretical basis for relational databases and informed the concurrent development of relational database management systems (rDBMSes).

We introduce relational algebra in the context of set relational algebra (set RA). In this setting, a relation has a **set of attribute names** (unordered, no duplicates) and its instances are sets of tuples (unordered, no duplicates).
At the conclusion of this chapter, we extend our discussion to **bag** RA and why operations on bags are generally preferred in rDBMSes.

## Primitive RA Operations

In classical set relational algebra, there are six primitive operators from which all other operators can be derived:

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

    The selection operator outputs a relation that contains the tuples of input relation $R$ that satisfy a predicate $C$. The predicate is defined to contain attributes with boolean expressions: $=$, $>$, $<$, $!=$, AND ($\wedge$), OR ($\vee$), NOT ($!$), etc. Because selection is a row filter, the input and output schema share the same schema, with set of attributes $\{B_1, \dots, B_m\}$.

1. **Renaming**, $\rho_{S(A_1, \dots, A_m)}(R)$, equivalently $\rho_{S(B_{i_1}\rightarrow A_1, \dots, B_{i_n} \rightarrow A_n)}(R)$.

    The renaming operator outputs a relation with the same data as the input relation, but with renamed attributes and/or relation name. The number of attributes, $m$ therefore stays consistent across the input and output relation, and the data in tuples does not change. We provide two notations above. In the former, we denote the names of the full set of $m$ attributes in the output relation, including the unchanged attribute names. In the latter, we specify the $n$ attributes to rename, where input relation attribute $B_{i_j}$ is renamed to attribute $A_{j}$, for $j = 1, \dots, n$, and $n \leq m$. In both notations above, the output relation name $S$ is optional.

In terms of a `SFW` SQL query, the selection operator maps to `WHERE`,
the projection operator maps to `SELECT`, and the renaming operator maps
to `AS`.

### Examples

Suppose that we have two relations with the following schema:

* $titles(title\_id, type, primary\_title, runtime\_minutes)$
* $people(person\_id, name, born, died)$


1. $\pi_{title\_id, primary\_title}(titles)$ outputs a relation with tuples of `titles` that are restricted to the attributes `title_id` and `primary_title`. In other words, we "drop" the other attributes `type` and `runtime_minutes`.

2. $\sigma_{born > 1980}(people)$ outputs a relation with tuples of `people` that satisfy the predicate `born > 1980`.

3. $\rho_{persons(person\_id, name, birth, death)}(people)$ outputs a relation named `persons` that has the tuples of `people` but renames attributes `born` and `died` to `birth` and `death`, respectively, and keeps `person_id` and `name` unchanged.

4. $\rho_{persons}(born \rightarrow birth, died \rightarrow death)(people)$ does the same as the previous example but is more concise.



<!-- 1. $\pi_{\text{title\_id, primary\_title}}(\text{titles})$ outputs a relation with tuples of $\text{titles}$ that are restricted to the attributes $\text{title\_id}$ and $\text{primary\_title}$. In other words, we "drop" the other attributes $\text{type}$ and $\text{runtime\_minutes}$.

2. $\sigma_{\text{born} > 1980}(\text{people})$ outputs a relation with tuples of $\text{people}$ that satisfy the condition where $\text{born} > 1980$.

3. $\rho_{\text{persons(person\_id, name, birth, death)}}(\text{people})$ outputs a relation named $\text{persons}$ that has the tuples of $\text{people}$ but renames attributes $\text{born}$ and $\text{died}$ to $\text{birth}$ and $\text{death}$, respectively, and keeps $\text{person\_id}$ and $\text{name}$ unchanged.

4. $\rho_{\text{persons}(\text{born} \rightarrow \text{birth}, \text{died} \rightarrow \text{death}}(\text{people})$ does the same as the previous example but is more concise. -->

## Binary Operators: Cartesian Product, Union, and Difference

We next discuss the remaining three primitive operators, which are all **binary operators**.
Each binary operator $f$ takes as input two operand relations $R_1$ and $R_2$ with schemas $(A_1, \dots, A_n)$ and $(B_1, \dots, B_m)$, respectively, and outputs an unnamed output relation $f(R_1, R_2)$.

1. **Product** (or Cross Product, Cartesian Product), $R_1 \times R_2$.

    The product operator outputs a relation with tuples that associates each tuple in the left operand with
each tuple in the right operand.  The output schema is therefore $(A_1, A_2, \dots, A_n, B_1, B_2, \dots, B_m)$. Because a relation's attributes are defined on a set, if $A_i = B_j$ for attributes $A_i \in R_1$ and $B_j \in R_2$, then the output relation renames attributes $A_i$ and $B_j$ to $R_1. A_i$ and $R_2.B_j$, respectively. If $R_1$ and $R_2$ have $n_1$ and $n_2$ rows, respectively, then the output relation has $n_1 n_2$ rows.

1. **Union**, $R_1 \cup R_2$.

    The union operator outputs a relation that has the set union of rows in $R_1$ and $R_2$. In other words, $R_1 \cup R_2$ contains one of every tuple that is in either $R_1$ and/or $R_2$. For the union to be defined, the two input relations must have the same schema, i.e., $n = m$ and there exists some distinct mapping $A_i = B_j$ for $i = 1, \dots, n, j = 1, \dots, n$. The output relation therefore also shares the schema $(A_1, \dots, A_n)$.

1. **Difference**, $R_1 - R_2$.

    The difference operator outputs a relation that has the set difference of rows in $R_1$ and $R_2$. In other words, $R_1 - R_2$ contains one of every tuple that is in $R_1$ but not in $R_2$. If no tuples are unique to $R_1$, the result is the empty relation. As with unions, the input relations and output relation must share the same schema.

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

* $\text{crew(tid, pid, c, j)}$
* $\text{people(pid, n, b, d)}$

The natural join of crew and people would then satisfy:

$\text{crew} \bowtie \text{people} = \pi_{\text{tid, pid, c, j, n, b, d}}\bigl(\rho_{\text{crew.pid} \rightarrow \text{pid}} \bigl( \sigma_{\text{crew.pid = people.pid}} (\text{crew} \times \text{people}) \bigr) \bigr)$.

### Special cases
- If $R(A,B)$ and $S(A,B)$ share identical schemas,  
  $
  R \bowtie S = R \cap S
  $

- If $R(A,B)$ and $T(C,D)$ have no attributes in common,  
  $
  R \bowtie T = R \times T
  $

## Bag Relational Algebra

So far, we have defined relational algebra using **set semantics**: each relation is a set of tuples (no duplicates). In practice, however, many data systems (including SQL and pandas) use **bag semantics**, where both attributes and tuples are unordered collections that could contain duplicates.

Working with bags is often easier and faster than working with sets, since the system does not need to check for and remove duplicate tuples.   Further more, bags are meaningful depending on the data domain; in other words, it may be meaningful for a relation to contain multiple copies of the same tuple.

The below table is a brief comparison of bag RA and set RA operators. We define "# of occurrences" as the sum total of duplicate tuples in the output relation.

| Operator | Bag operation | Performance compared to Set RA | Comments |
| ---- | --- | --- | --- |
| Selection | Preserve # of occurrences | Roughly as fast |
| Projection | Preserve #  of occurrences | Faster than set | SQL `SELECT` is a common operation |
| Product | Preserve # of occurrences | Roughly as fast |
| Union | Add # of occurrences | Faster than sets |
| Difference | Subtract # of occurrences | Roughly as fast
| Renaming | - | - | Unchanged |

## Helpful Resource: Visualizing Relational Algebra

Understanding relational algebra and SQL becomes much easier when you can visualize how each operator transforms its input relations. Here’s a [helpful resource](https://dbis-uibk.github.io/relax/landing). 
