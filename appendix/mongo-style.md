# MongoDB Style Guide

## PostgreSQL vs. MongoDB

|| PostgreSQL               | MongoDB |
|:-| :----------------: | :------: |
| Definition | Object-relational database management system | Document database that stores data as key-value pairs |
|Schema| Each row represents a data point and there is a predetermined schema|  Each document can hold various types of data without a predetermined schema |
|Basic Unit of Storage| Row (Tuple)     | Serialized JSON document |
|Foreign Key Relations| Define relationships between tables using foreign keys  |  Does not use predefined relationships between collections |

---

## MongoDB Query Syntax

Good structure for your queries will help make them easier to read.

For example, indenting and separating pairs of brackets:
```python
db.orders.insertMany( [
   { "_id": 0, "name": "Pepperoni", "size": "small", "price": 19,
     quantity: 10},
   { "_id": 1, "name": "Pepperoni", "size": "medium", "price": 20,
     "quantity": 20},
] )
```

### PyMongo
PyMongo is a Python library that provides an interface for interacting with MongoDB from Python code.

* All field names must be wrapped in double-quotations (`" "`) when using PyMongo because all field names are strings.

* **Note that because of this rule, the distiction between a \<field\> `"name"` and a string `"Pepperoni"` can be often difficult to find.**

### Use cases of $

1. **Indication of a Query Operator** \
`$` symbol is often used to indicate query operators that help filter documents in a collection.
    * `$eq`, `$gt / $gte`, `$lt / $lte`, `$in / $nin`, `$exists`, `$and / $or`, etc.
    ```python
    db.collection.find({ "age": { "$eq": 25 } });
    ```
    ```python
    db.collection.find({ "age": { "$gt": 25 } });
    ```

2. **Aggregation Operators** \
In MongoDB’s aggregation framework, `$` is often used to refer to specific stages, operators, and fields.
    * `$match`, `$group`, `$sort`, `$project`, etc.

3. **Referencing entire \<field\>s as an array** \
Depending on the operators used, you might want to use an entire \<field\> as an **value** array in the key-value pair operators. Then you would use `$<field>` instead of just `<field>`.
    * For example:

    ```python
    db.orders.aggregate( [
    { "$match": { "status": 'A' } },
    { "$group": {
        "_id": "$cust_id",
        "total": { "$sum": "$price" }
        }
      }
    ] )
    ```
    The query above wants to sum the `price` field for each unique `cust_id` with `status` `A`. So, the pipeline first filters out documents where the `status` field is `A` then groups based on the `cust_id` field to sum the `price` field.

    Notice how when we are referring to the `status` field as a **key** to be filtered through we don't use `$`. However, when we want to use the `cust_id` and `price` fields as **values** to be grouped on or summed, we use `$cust_id` and `$price`.

    Below is the equivalent query in SQL:
    ```sql
    SELECT cust_id, SUM(price) as total
    FROM orders
    WHERE status = 'A'
    GROUP BY cust_id
    ```

4. **Array Query Operator (Using \$ in Arrays)** \
When working with arrays in MongoDB, the `$` symbol can be used in special ways to match array elements in queries or update them.
    * The positional `$` operator is used to reference the first element in an array that matches the query condition when updating documents. It’s useful when you need to modify a specific element in an array.
    ```python
    db.collection.updateOne(
      { "comments.text": "Great post!" },
      { "$set": { "comments.$.status": "approved" } }
    );
    ```
    * This query finds the first element in the `comments` array where `text` field is `"Great post!"` and updates its `status` field to `"approved"`