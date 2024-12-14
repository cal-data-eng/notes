(structure:index)=
# Sampling
Sampling allows us to work with smaller, more manageable subsets of data, enabling faster exploration and analysis. Earlier in the course, we learned methods like TABLESAMPLE BERNOULLI and TABLESAMPLE SYSTEM for sampling rows. However, these methods often return a variable number of rows, which may not always align with our requirements. Instead, we aim to fix the number of rows returned or customize sampling strategies to better suit specific tasks. This is where reservoir sampling comes into play!

```{tableofcontents}
```