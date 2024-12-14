**Last Updated:** December 13th, 2024

## Data Operations and Pipelines
> According to [Wikipedia]((https://en.wikipedia.org/wiki/DataOps)), a set of practices, processes and technologies that combines an integrated and process-oriented perspective on data with automation and methods from agile software engineering to improve quality, speed, and collaboration and promote a culture of continuous improvement in the area of data analytics. 

In simpler terms, **data operations** encompass all the tasks needed to prepare raw data for more complex computations, such as machine learning or advanced data analysis. This includes steps like cleaning, transforming, and organizing the data so it becomes usable. And a **data pipeline** specifies the sequence of **operations** needed to process data.

We must consider the following 4 things when designing data pipelines to automate data processing:
1. How does data “arrive”?
2. What kinds of things do you need do upon arrival?
3. How do you automate the work?
4. How do you maintain quality and handle exceptions?

### Data Arrival

We have two ways of thinking about data arrival: push and pull.

**Push:** To some location, typically has some explicit trigger by
person or software

-   Files appear in a staging folder, e.g. in AWS S3; or

-   Tables get populated in a data warehouse, e.g. in BigQuery; or

-   A software system API provides the data. (E.g. publish-subscribe
    (pub-sub) or message queueing systems)

**Pull:** Extract data from some source, typically automated

-   Via scheduling software; or

-   On receipt of an event. (E.g. from pub-sub or MQ systems or slack or
    email or really anything)

### Actions Upon Data Arrival

When the data arrives, there are a myriad number of things you can and
should do.

-   Run data quality (DQ) tests. (E.g. check the new data has expected
    schema, integrity constraints, data cleaning checks)

-   Load into "the right place" (a data warehouse or a curated set of
    directories)

-   Run transformation logic

-   Log Metadata (Data Lineage): track what arrived from whom, where,
    when...

-   Pass along info/control to humans (e.g., when there are immediate
    errors, send a "beeper message" to someone who can approve and
    continue automation.)

This is not strictly data transformation, because we have human input
along the way in this process.

### Automating the Work

Data pipelines are automated with many, many systems. These include
workflow systems to manage processes, dataflow systems to manage data
movement through operations, messaging/queeing/eventing to hand off data
reliable from one system to another, and more. In practice, oftentimes
you will use a combination of these to achieve your objective.

### Maintaining Quality and Handling Exceptions

We create data-centric \"tests\" that check:

-   logical (schemas, constraints, etc.)

-   statistical (outliers, distributional drift)

Recently, software engineering DevOps principles are veering more into
DataOps pipelines territory that features test-driven development and
continuous integration. We will take a look at **`dbt`** as an example.

## dbt
dbt (**data build tool**) can be combined with SQL to work as a dataflow system. It primarily transforms data as in the **T** in
ELT (Extract, Transform, Load) and is powerful because it can also run quality tests beyond what
just SQL can do.

### dbt in a High Level

-   **Project Initiation**: 
    - Initiate your project
    - `dbt init`

-   **Data Transformations (Models)**: 
    - Perform SQL transformations directly in your data warehouse.
    - dbt models are SQL files that define how data should be transformed.
    - `dbt run`

-   **Data Quality Testing (Tests)**:
    - Built-in tests for schema integrity:
        - check for uniqueness, null values, accepted values, and relationships, etc.

    - Custom tests:
        - Write SQL-based tests to check data validity. A test passes if it returns **0 rows**.
    - `dbt test`

### Models in dbt
Models are SQL queries that transform data in your warehouse. Running a model with dbt creates a pipeline that transforms raw data into processed tables or views.

#### **Types of Model Materilizations** 

1. Views (default):
    - A model query is materialized as a view in the database.
    - Views are lightweight and recomputed every time they are queried.

2. Tables:
    - A model query is materialized as a table in the database.
    - Tables persist the transformed data and do not recompute on every query.

3. Incremental Models:
    - These models transform and store data incrementally.
    - On the first run, all rows are transformed. Subsequent runs only process new or updated rows, which significantly reduces runtime.
    - Incremental models are ideal for large datasets.

#### **Key Features of Models**
- **Source Reference**
  - Use curly braces and Jinja macros to specify the data source for a model.
    ```
    SELECT * FROM {{ source('schema_name', 'table_name') }}
    ```
  - Ensures the source data comes from the correct tables and allows validation. This is useful when working with subsets of data during testing or development.

- **References (ref)**
  - dbt models can reference other models using the `ref` function:
      ```
      SELECT * FROM {{ ref('previous_model') }}
      ```
  - This enables models to be **stacked** on top of one another, forming a dependency chain.
  - dbt automatically understands and manages these dependencies, creating an implicit **pipeline**.


