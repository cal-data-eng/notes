# SQL Style Guide

Like all programming languages, SQL is incredibly flexible. However, following some best practices will keep your code easier to follow, and your database easier to maintain.

```{note}
All style guides enforce some matter of taste and opinion. Naturally, we think these "rules" are a good starting point. However, when you are on a project working with a team, _clarity_ and _consistency_ are the most important goals. It's generally best to adopt the style of the existing projects.
```

## Data Modeling and Database Design

Before we begin to talk about syntax, the _schema design_ will have the biggest long-term impact on your query readability.

### Table and Attribute Names

**Preferred:**

* Name tables as the plural of the object.
  * Example: `movies` over `movie`.
  * This is because a table is, naturally, a collection of multiple records.
* Use allow lowercase indentifiers.
  * Example: `name` over `NAME` or `Name`
  * This is because different variants of SQL handle capitalization differently.
* Prefer 'Snake_Case' over 'camelCase' for multi-word names.
  * 'Snake Case' (like most Python defaults) means separating words with an underscore.
  * Example: `first_name` over `firstName`
  * This improves reability, and avoids the case sensitivity issues in some SQL variants.
* Name "join tables" with a term representing the idea, not the table names.
  * "Join tables" are those that link relationships between two tables.
  * Example: Represent "enrollments" in a course, you should name a table `course_enrollments` rather than `courses_students`.
  * Example: Prefer `cast` over `actors_movies` in an database of

**Avoids:**

* Do not name columns and tables with the same names
  * Example: In a table of `managers`, do not have a column called `manager` or `managers`.
* Do note use acronyms or abbreviations unless necessary.
  * Example: Use `student_id` over `sid`.
  * Explicit column names are much more readable.
    If you need to shorten a long term, make sure the abbreviation is as obvious as possible, and that it is spelled consistently across all tables.
  * Within a query, using aliasing (`AS`) to shorten a column or table name.

### Attributes and Types

Learn the datatypes that your DBMS offers. PostgreSQL offers [many built-in data types][pg_datatypes]. Chosing the best datatype can help improve performance and avpod data inconsistency errors.

[pg_datatypes]: https://www.postgresql.org/docs/current/datatype.html

* Every table should have an explicit primary key!
  * Often times, this is a newly generated numeric value, but a UUID is a good option too.
  * In Postgres, `INTEGER`, `BIGINTEGER`, `SERIAL`, `BIGSERIAL` and `UUID` are the most common primary key types.
  * When you have additional data that is unique, use `UNQIUE` constraints rather than a primary key.
  * Why? You never know when an external piece of information might change. Referencing primary keys that only exist in the database means that if an email address, student ID, product ID, etc. changes, then you will not need to manually maintain any foreign key relationships.
* Use `id` to name primary keys and foreign keys.
  * Most often, the primary of a table simply should be `id`
* Be consistent naming boolean attributes
  * It's often good to 'prefix
  * Example: Use `is_admin`, `is_...`, or `has_...`

#### Dates, Times, and Timestamps


## Query Syntax

### SQL Keywords

### Intendation
