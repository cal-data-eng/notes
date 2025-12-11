# SQL Style Guide

```{tableofcontents}
```

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
  * It's often good to 'prefix' a boolean attribute that could be ambiguous, like 'student', or 'instructor'
  * Example: Use `is_admin`, `is_...` (`is_student'`), or `has_...` (`has_won_awards`)

#### Dates, Times, and Timestamps

Dates and times are some of the trickiest things to get right. Partially because it's incredibly difficult to reconcile bad data.

You may make a lot of assumptions about how dates and times work in your life today, but many of these assumptions are not guaranteed to be true. Not everywhere observes daylight savings time, for example. And while we often think timezones are hour long blocks, there are some 15 minute timezone boundaries!

```{admonition} Info:
Some background on dates and times.

* **Date**: A `date` is 24 hour period in time. Typically we format these a `YYYY-MM-DD`, largest to smallest which makes it easy to sort dates.
* **Time**: A `time` value is an hours, minutes, seconds (and maybe microseconds) pair that identifies a particular time of a day. These are typically formatted `HH:MM:SS.ssss` (where `s` is an optional set of microseconds).
* **Timestamp**: A `timestamp` is a (date, time) pairing. To precisely identify when a timestamp occurs, it must contain a timezone.
* **Timezone**: A timezone comes in many formats, such a name like 'America/Los_Angeles', or "US Pacific Time". A Timezone is technically about a place, and the time depends on the _laws and customs_ of that place. Most often we store and represent timezones as an _offset_ from [UTC Time][utc] (or 'zulu time'). We typically write timezones as `+-HH:MM`, e.g. `-07:00` is 7 hours before UTC time, which is also 'Pacific Daylight Time' (or the Western US' timezone during daylight savings time.) Postgres and SQL typically omit the `:` in a timezone, so we'd write `-0700`.

When we format timestamps, we try to follow [ISO 8601][iso8601], a (mostly) universal standard for displaying time. A proper timestamp looks like this: `YYYY-MM-DDTHH:MM:SS:.ssss+-XX:YY`, e.g. `2024-07-14T14:32:00.0000-07:00`

Postgres supports many additional types, like intervals, and has many more features we won't get into. In addition, the date/time utilties in Postgres support many formats in additional to ISO8601.
```

[utc]: https://en.wikipedia.org/wiki/Coordinated_Universal_Time
[iso8601]: https://en.wikipedia.org/wiki/ISO_8601

* Where possible use the column type `TIMESTAMP WITH TIME ZONE` or `TIMESTAMPTZ` (in Postgres).
  * This datatype accept a complete timestamp with a UTC offset, and always ensures the date is converted back to UTC time in internal storage.
  * `TIMESTAMPTZ` is simply Postgres-specific shorthand, but it is interchangable with the full SQL name.
* Always store timestamps with consistent timezones.
  * _Most often_ you should store timestamps in UTC time, and ensure the timestamp is explicitly UTC time.
  * When presenting data to users, or aggregrating it across reports, _then_ convert to the local timezone.
* If you need to know the origianl timezone (e.g. the location or specific rules), then you should store that separately.
* When naming columns which are timestamps, it's helpful to use the `_at` suffic to indicate an event, e.g. `created_at`, `updated_at`, `last_saved_at`... Without the `_at`, it can be easy to make these columns sound like booleans.

---

## Query Syntax

Good structure for your SQL queries will help make them easier to read.

### SQL Keywords

* Use ALLCAPS for all built-in SQL keywords, like `SELECT`, `FROM`, `CREATE TABLE` etc.
* Ideally, start 'components' of a query on a new line:

### Intendation

* Align keywords to the left of the line.
* Indent the contents of subqueries and CTEs, typically by 2 spaces.
  * Place the opening `(` on the first line, and the closing `)` on its own line.

### Miscelleanous

* Always remember end queries with a `;`, even in jupysql where this is handled for you.
* Use `AS` or aliasing for clarity within a query.
    * This is the best way to abbreviate long names.

For example:

```sql
WITH some_table AS (
  SELECT column1, column2, COUNT(*) AS my_count
  FROM another_table
)
SELECT *
FROM some_table
JOIN big_table as bt on bt.id = some_table.big_table_id
WHERE bt.some_value > 5;
```
