**Last Updated:** December 5th, 2025

# Database Sampling
### Why Use Approximation?
**Pros**
- Faster Queries: Approximation methods are optimized for speed, enabling quick results during exploratory analysis.
- Human-Scale Exploration: Results are delivered at the speed of thought, allowing analysts to iterate faster.

**Cons**
- Inaccuracies: Approximation may miss rare data points (e.g., outliers).
- Potential Bias: Results can be skewed if the sample is not representative.
- Uncertainty: Hard to quantify and interpret errors in estimates.
- Setup Costs: Techniques like sketches have materialization overhead.

### What Can We Do Instead?
- Start with approximation and perform Exploratory Data Analysis (EDA) using tools like Jupyter Notebook.
- Scale back up to the full dataset for testing or validation after the initial exploration.

### When to Use Database Pipeline Sampling?

- Perform sampling as close to the data scanning stage as possible.
- This reduces the volume of data flowing through the pipeline, improving throughput.
- Think of it as similar to **selection pushdown**: reducing rows early to minimize downstream computation.

### Database Sampling Drawbacks
- Requires selecting the "right" sampling probability (e.g., for Bernoulli sampling).
- Cannot control the exact output size.
- Sampling is performed during the initial scan and cannot adjust for data attributes (e.g., stratified sampling).
- Not all data sources support sampling techniques.

## Reservoir Sampling
Reservoir Sampling is a technique for obtaining a fixed **k-sized** **SRS** (simple random sample) from a dataset. Each record has an equal probability (k/n) of being included in the sample, and the algorithm operates in **linear runtime** with a **single pass**, even when the total number of records (n) is unknown.

### How It Works

#### **1. Build a Reservoir**
- Start with a **fixed-size array** (the "reservoir") that can hold `k` records.

#### **2. Scan the Table**
For each record `rᵢ`:
- **If the reservoir has space** (`i <= k`):
  - Insert `rᵢ` into the reservoir.
- **If `i > k`**:
  - Insert record `rᵢ` by evicting a random record from the reservoir.
  -  Generate a random number `j` in the range `[1, i]`. **If `j <= k`**, replace the element in position `j` of the reservoir with `rᵢ`.

#### **Example Scenario**
*   **Goal:** Keep a sample of **k=2** items.
*   **Stream:** `[A, B, C]`
    1.  **Item A:** Reservoir has space. Add A. `[A]`
    2.  **Item B:** Reservoir has space. Add B. `[A, B]` (Reservoir is full).
    3.  **Item C:** This is the 3rd item (`i=3`). Chance to enter is `k/i` = **2/3**.
        *   *Outcome:* aThe random roll succeeds. We pick a random slot to evict (e.g., slot 0, Item A).
    4.  **Final Result:** `[C, B]`


## Stratified Sampling
We can also conduct stratified sampling, where we can sample based on an attribute of our data. Our goal is to get a k-sized sample per GROUP attribute. The `GROUP BY` columns are called subpopulations.

**Why stratified sampling?**
In a simple random sample over **skewed data**, rare groups are often excluded entirely by chance. Stratified sampling guarantees that every group is represented, regardless of how small it is in the full population.


PostgreSQL's Bernoulli tablesamples do not support stratification because the sample happens on the initial scan and cannot access the attributes. However, our reservoir implementation works with `GROUP BY`!


## Sampling Pitfalls
**Never Join Samples**:
  - They are unequal and statistically unrobust. 
  - The join of two table samples is often **empty**. Consider: sampled employee and sampled departments. What are the odds of an employee’s department being in the sample? Likely zero if you have many in both tables!

**Bias Accumulation**:
- Materializing samples is important for fast iteration, e.g., with ML training. But if we don’t periodically resample/refresh, then we’ll pick up a lot of bias!

**To avoid bias and inaccuracies**:
- Update “population” estimators to sample estimators (e.g., scale COUNT or SUM by sampling rate)
- Include and advertise sample estimator uncertainty (e.g., confidence intervals, bootstrapping, etc.)
- Avoid bias, particularly if you reuse the sample for many different estimators! (Resample from the
sample or, periodically refresh the sample from the database)
- But above all: Validate on the full dataset! After exploratory work, run the pipeline on the full data!