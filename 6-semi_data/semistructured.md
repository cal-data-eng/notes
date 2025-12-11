(semistructured)=
# Semistructured Data

**Last Updated:** November 4th, 2024

## Semi-Structured Data
Semi-structured data is a data representation or data model that is less “rigid” than structured or rectangular data. The schema is flexible and attributes can be nested and multivalued. Common data models for semi-structured data are key-value stores and document stores. NoSQL databases provide the ability to store and query such semi-structured data. Why do we use semi-structured data in modern day? As a data exchange format, semi-structured data provides the benefits of being really flexible, portable, and self-describing. 

### Issues with Semi-Structured Data
Although semi-structured data predates structured data, it fell out of
vogue for several reasons.

-   Complex and cumbersome to traverse nested relations

-   Nested model mixes physical and logical data organization and so
    cannot be optimized for queries

-   Contains lots of redundancy, leading to update and deletion
    anomalies

However, with the rise of data transfer lake/lakehouse applications,
semi-structured data is now in vogue again.

## JSON and XML
To work with semi-structured data effectively, we often rely on data formats that can represent nested or flexible structures. Two common formats for this purpose are JSON (JavaScript Object Notation) and XML (Extensible Markup Language). Both formats enable us to represent complex data in a readable and organized way.

Sometimes the values in a key-value store will be complex, and we can
represent them via JSON (Javascript Object Notation) or XML (Extensible
Markup Language). JSON and XML formats are textual representations of
nested data. **JSON** is human-readable and looks like a dictionary:

    {
      key1: val1,
      key2: {key2.1: val2.1}
    }
while **XML** is a markup language:

    <head>
      <key1> val1 </key1>
      <key2>
        <key2.1> val2.1 </key2.1>
      </key2>
    </head>

XML predated JSON. JSON is widely used for transmitting data between
applications and storing complex data. It is widely used in internet
applications (e.g., transferring data to the browser), can be
manipulated easily by JavaScript within the browser, and is accessible
in many different interfaces.

Values in JSON may be of type primitive (number, string, boolean, NULL),
object (collection of key-value pairs), or array (ordered list of
values). Because JSON is nested, it can be viewed as a recursive object,
which also allows us to traverse through JSON objects like a tree.

We may want to represent JSON data in rectangular format which we can
attempt by splitting them into one or more schemas. However, the
trade-off we face with neat structured data is that we potentially lose
lots of information, especially with attributes that we have chosen not
to include in our resulting schemas. We also face a fixed schema, so we
may need to coerce some of our data into a chosen type or perform text
wrangling. Another issue we face is converting nested values to atomic
values.

Let us now look at transforming rectangular data into JSON. We can
represent our rectangular data with a balanced tree, and then transform
that into JSON. When doing this, we fix an order in JSON even if it was
arbitrary before. However converting our data into JSON can lead to
redundancy especially if multiple relations are related. The way we
might choose to represent this data in JSON format is by nesting the
related information.

**teams**

| name      | state |
|-----------|-------|
| Warriors  | CA    |
| Celtics   | MA    |
| Lakers    | CA    |

**players**

| name           | age | team     | position      |
|----------------|-----|----------|---------------|
| Stephen Curry  | 34  | Warriors | point guard   |
| Draymond Green | 32  | Warriors | forward       |
| Jaylen Brown   | 25  | Celtics  | forward       |
| LeBron James   | 37  | Lakers   | forward       |

### JSON Representation

```json
{
    "teams": [
        {
            "name": "Warriors",
            "state": "CA",
            "players": [
                {
                    "name": "Stephen Curry",
                    "age": 34,
                    "position": "point guard"
                },
                {
                    "name": "Draymond Green",
                    "age": 32,
                    "position": "forward"
                }
            ]
        },
        {
            "name": "Celtics",
            "state": "MA",
            "players": [
                {
                    "name": "Jaylen Brown",
                    "age": 25,
                    "position": "forward"
                }
            ]
        },
        {
            "name": "Lakers",
            "state": "CA",
            "players": [
                {
                    "name": "LeBron James",
                    "age": 37,
                    "position": "forward"
                }
            ]
        }
    ]
}

```


## Document Store

Since JSON and XML allow us to model nested and flexible data structures, they are ideal formats for **document stores**. Document stores are databases that primarily operate on JSON-like structures, treating each JSON element as a 'document' that can be individually retrieved and queried.

Document stores support the following operations:
- Searching across documents
- Primitive aggregation
- Typically fails to support (beyond denormalization)
- Possibly primitive indexing

### Using Document Stores

There are certain times where using document stores makes more sense than other database systems. This includes:
- When we want to operate on the denormalized data as a whole
- When we do not need to perform joins upon the data
- When the schema often changes, and yet we rarely update the old data

For example, we may choose to keep all Facebook user profiles in a single JSON document. This allows us to keep all user information together, but we face drawbacks if we wish to find all the friends of a given user who is based in Berkeley because we are unable to perform joins. A promising alternative is to use JSON or XML *within* relational databases.

## NoSQL
Document stores are a subset of a larger category of databases known as NoSQL. NoSQL databases, including document stores, are designed to handle semi-structured and unstructured data, providing an alternative to traditional relational databases. They are particularly useful in applications that need to manage massive, evolving datasets.

### Motivation
NoSQL comes from the idea of "No SQL used" in database design. Its distinction comes from its ability to store semi-structured **and** unstructured data, unlike other database systems. It does not support joins; instead, it is optimized for querying giant stores of data or scaling rapidly. It performs well in situations where there are constantly changing data requirements, such as adding a new attribute to a Facebook profile, and where data workloads need to respond to large changes in scale.

### Scaling

Because NoSQL databases do not face the constraints of structured data, they can be easily distributed across different data stores and scaled horizontally (to even millions of users).

However, there is a consistency-availability tradeoff: NoSQL does not ensure strong consistency, which means that it does not guarantee that transactions started in the future necessarily see the effects of other transactions committed in the past.

Strong consistency means data isn't always available (because all replica updates need to be synchronized). In general, strong consistency is easier to achieve with relational databases. NoSQL databases can only guarantee *eventual consistency*, or that transactions will *eventually* be consistent across the database.

There are two ways to think about scaling a database (e.g., storing more data, processing more queries): partitioning and replicating. In both ways, we need to guarantee consistency, or the fact that the database must reflect the most recent changes (e.g., INSERTS).

- **Partitioning** spreads the database across many machines in the cluster. This is good for writes but bad for reads, since we have to read from the exact partition the data is written on.
- **Replication** creates multiple copies of the same piece of data and spreads them across different replicas, or machines in a cluster. This is good for reads (because you can query any of the relevant replicas for a piece of data) but bad for writes, since we must write to all the replicas.
