(outliers)=
# Outliers 

**Last Updated:** October 16th, 2024

## Outliers

Our main topic for this lecture is on outliers, which is a value "far enough" from "average". Data often contains outliers, either due to events that were very unlikely to ever occur or errors in entry. Either way, outliers can cause trouble with analyses (especially statistical ones) of our data, so we may want to remove such values. To do so, we need two statistical measures:

- **Center**: what is "average" (e.g. mean, median, etc.)
- **Dispersion**: what is "far" from average (e.g., standard deviation, variance, interquartile range, etc.)

We say **masking** occurs when an outlier influences the dispersion measure and _impacts our ability to detect other outliers_. We also want to think about the **robustness** of our strategy, which we will discuss later.

### Gaussian Outliers

The simplest definition of outliers is based on the Gaussian distribution, which forms a "bell curve" defined by a mean (center of the curve) and standard deviation (spread of the curve). For a given value, we can compute its **z-score**, which is how many standard deviations it is from the mean. When the absolute value of the z-score is large, that means the value was less likely to occur according to the distribution.

Using z-scores, we can easily remove outliers from our data. For example, if we remove any values with an absolute z-score larger than 2, we will keep only the values from the 2.5th percentile to the 97.5th percentile. However, this method is not robust, as both center and dispersion are sensitive to the distribution of the outliers themselves.

### Trimming

Using just Gaussian distributions to find outliers has some caveats, however. If there is a single value that is much much larger than the others, its presence will significantly increase the measured standard deviation and result in outliers that aren't _as_ far to be kept in the dataset.

This problem is isomorphic to the difference between mean and median, as the latter is more robust to the presence of extreme outliers. We can take a page from this book and remove the lowest and highest $n$ values instead, which will not suffer from the same sensitivity to outliers.

A slight variation on this is to replace outlier values that would have been trimmed with the value _just before_ those that are removed. So instead of outputting NULL values or removing rows, the edges of the dataset will just have a tail of repeated values. This approach is called Winsorizing, and helps preserve the probability density of the original dataset.

### Robustness and Breakdown Points

Finally, let's discuss how we decide _how much_ data to preserve when removing outliers. One approach to this is to focus on how **robust** our outlier removal is to the introduction of corrupt values.

The **breakdown point** of an estimator is the smallest fraction of corrupted values an estimator can handle before an incorrect result. For example, the breakdown point of the mean is **0**. One outlier value can change our entire dataset's mean given that it is large or small enough, so it can handle a total fraction of 0 corrupted values before breaking down. On the other hand, the 1% trimmed mean can handle **1%** of corrupted values before breaking down since those values will be trimmed out and not affect the mean.

We started with means and standard deviations, but as we saw earlier this model of distributions is especially susceptible to outliers. But if we start with medians, we can define the median absolute deviation (MAD) as the equivalent to standard deviations: 

$
MAD(X) = \text{median}(|X_i - \tilde{X}|)
$

Now, let's map this back to the percentiles we used when picking our z-score ranges. We find that 1 standard deviation is equivalent to 1.4826 MADs (when evaluated on a standard normal distribution with mean 0 and stddev 1). So to compute an equivalent range to 2 standard deviations with more robust MADs, we can filter values that are $2 * 1.4826$ MADs from the median of the dataset. This strategy is called Hampel x84.

