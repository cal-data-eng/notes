# Minimum Description Length (MDL)

**Last Updated**: September 30, 2025

When working with data, we often need to decide how to represent values. For example, should a column of numbers be stored as **integers**, **floats**, or **strings**? Should a set of repeated labels be treated as **text** or as a **categorical type**?  These choices matter because they affect how much space the data takes on disk and how quickly computations can be performed.  **Minimum Description Length (MDL)** provides a systematic way to make these choices by framing the problem in terms of *storage cost*. In short, the **best representation** is the one that requires the *fewest bits* to describe the data.

First, we need to define how to measure the cost of encoding data. Suppose \(v\) is a value in the dataset. We define `len(v)` as the number of bits required to encode \(v\) using the **default type**, such as a string representation. For a more specific type \(T\) with \(|T|\) distinct possible values, the bit length required to encode a value is given by:

$\log_2 |T|$

This comes directly from information theory: if there are \(|T|\) possible values, then identifying which one we have requires $\log_2 |T|$ bits.  

- A **Boolean** type has 2 possible values → $\log_2 2 = 1$ bit.  
- A **categorical variable** with 10 categories → $\log_2 10 \approx 3.32$ bits per value.  
- **ASCII characters** have 256 possibilities → $\log_2 256 = 8$ bits.  
- A **32-bit integer** has $2^{32}$ possibilities → $32$ bits.  


Next, we can generalize these ideas into a single formula for computing the **Minimum Description Length**.  

The MDL cost of encoding a column of values is given by:

$$
MDL = \min_{T \in H} \sum_{v \in C} \Big( I_T(v) \cdot \log(|T|) \;+\;  (1 - I_T(v)) \cdot len(v) \Big)
$$

Where:  
- $T$ = a candidate type from the set of all possible types $H$.  
- $C$ = the set (or column) of values we want to encode.  
- $I_T(v)$ = an indicator function ($1$ if the value $v$ fits in type $T$, and $0$ otherwise).  
- $\log(|T|)$ = the cost in bits if $v$ fits in type $T$.  
- $len(v)$ = the default cost of encoding $v$.  
<!-- - $\alpha$ = a constant representing the cost per element when we must fall back to the default type.   -->

Intuitively:  
- If a value \(v\) **fits** the candidate type \(T\), we charge the cost of that type $\log(|T|)$.  
- If a value does **not fit**, we fall back to the default type and charge its cost $len(v)$.
- Finally, we compute this cost across all values and choose the type $T$ that gives the **minimum total cost**.  


Let’s take a look at a simple example. Suppose we have a column:  

$$
C = \{3, 5, 7, \text{"NA"}\}
$$

Here, three values are integers, but one value ($\text{"NA"}$) does not fit the integer type.  

---

**Option 1: 32-bit integers**  

- For $v = 3, 5, 7$:  
  Each fits the integer type, so cost = $\log_2(2^{32}) = 32$ bits each.  

- For $v = \text{"NA"}$:  
  It does not fit, so we fall back to the default cost:  
  $$
    len(\text{"NA"})
  $$  

    $len(\text{"NA"}) = 16$ bits (2 characters $\times$ 8 bits), then:  
  $$
  \text{Cost}(\text{"NA"}) = 16 \text{ bits}
  $$

- Total cost:  
  $$
  3 \times 32 + 16 = 112 \text{ bits}
  $$



**Option 2: ASCII strings**  

- Each value is stored as text.  
- $\text{"3"}, \text{"5"}, \text{"7"}$ each = $8$ bits.  
- $\text{"NA"}$ = $16$ bits.  

$$
\text{Cost} = 3 \times 8 + 16 = 40 \text{ bits}
$$



**MDL chooses ASCII strings** in this case, because forcing everything into 32-bit integers makes $\text{"NA"}$ expensive when we fall back to the default. 

In conclusion MDL follows the following principle:  
Prefer a representation as simple (and therefore as efficient) as possible that can capture as much of the data as possible. In other words, balance simplicity and coverage.