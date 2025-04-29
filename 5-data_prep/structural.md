# Structural

**Last Updated:** October 6th, 2024

Data preparation is a very broad subject, covering everything from data models to statistical assessments of data to string algorithms to scalable data processing. In some sense, most of Data Engineering---most of data science!---boils down to Data Preparation.

## "Unboxing" Data
"Unboxing" is the act of looking at your data to get a high-level sense of what's going on. Some things to look out for are: header info/schema, metadata, and comments.

Take a look at some rows or records in your data. Most files will run into one of these categories: 
- Record per line: newline-delimited rows of uniform, symbol-delimited data (e.g., csv, tsv)
- Dictionaries/objects: can be represented as object-per-line or as a complex object, where the entire dataset is one fully-nested JSON, XML, or YAML object (e.g., JSON, XMl, YAML)
- Unions: a mixture of rows from _k_ distinct schemas. Tagged unions have a ID or name for each row while untagged unions must be classified by its content. 
- Natural language: prose, images, and more. 

Here are some common command-line tools to unbox the data and gain a better understanding of the files you are working with. 

- `du -h filename` to see the disk size of filename in human-readable format
- `head -c 1024 filename`  to show the first 1024 bytes of filename
- `head -n 10 filename` to see the first 10 lines

This is a form of data visualization through text! The eyes are a powerful tool in understanding data but beware of any biases or assumptions you may be bringing in.

## Structural Transformations

We can convert relations to matrices and vice versa. Many datasets are not immediately stored in relations, so it's useful to do these structural transformations. We can use the `UNPIVOT` operation to convert matrices to relations--or bonus: we can use the UI in Trifacta. Similarly, the `PIVOT` operation converts relations to matrices.

Suppose we have a table with year and month columns, and we want to pivot it into year by month matrix form.  We have many rows that have the same (year, month) pair, which means our `PIVOT` needs to pack many values into a single cell. To do this, we must choose an aggregate function--a reasonable choice might be `AVERAGE(Inches of Precipitation)`. If you prefer, Trifacta (like Postgres) actually has an aggregate function that will just store a nested list (array) of all the values in a single cell--this is the `LIST` aggregate. We can do `PIVOT/UNPIVOT` in Trifacta, in Pandas, and in Spreadsheets.


What if a data analyst wanted us to return **just** the precipitation grouped by year and month, with no location data? How could we do this? Well it turns out, this question is a little under defined. We need to decide a few things: how to aggregate this data after grouping it (e.g., average, grab the first instance, etc.), how to aggregate across different locations, should we create a pivot table, or instead a tidier version grouped by year and month with an entry for each year and month pairing. Let's make a tidy version to obtain the average inches of precipitation per month year and then rotate to create a pivot table.

In Pandas we could do this with:
`mmr.groupby(['Year', 'Month']).mean('Inches of Precipitation')`

![Group By DataFrame](https://github.com/aldrinnnnn/notes/blob/main/5-data_prep/original_precip_df.png?raw=true)

However, there's still a _lot_ of rows, one for each year and month combination. Let's try pivoting this tidy dataframe to aggregate our values. let's add `.pivot(index='Year', columns='Month')` but first we need to `reset_index()` so that we can access our Year and Month columns. 

Our code is now: `mmr.groupby(['Year', 'Month']).mean('Inches of Precipitation').reset_index().pivot(index='Year', columns='Month')`

![Pivoted DataFrame](https://github.com/aldrinnnnn/notes/blob/main/5-data_prep/pivoted_precip_df.png?raw=true)

Success! We now have a pivot table with our year as index and months as columns with our average rainfall as our values. 

Can we do `PIVOT` in Relational Algebra? No: think about how we declare column values in relational algebra: we write an expression like $\pi_{c_1, c_2} (T)$. The subscripts of the  operator are part of the syntax of your relational expression--they do not change as the relation instance (the data in the database!) changes.
