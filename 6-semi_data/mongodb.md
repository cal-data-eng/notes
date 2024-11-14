# MongoDB

**Last Updated:** November 14th, 2024

## MongoDB 

MongoDB is a very popular document store that very quickly evolved to meet a need to storing and querying JSON documents quickly. It follows a JSON-like definition wherein each MongoDB database, there are multiple **collections** (relation in RDBMS) which all contain multiple **documents** (record) of type **object**. Each of these objects contains **field-value pairs**, where a field is the MongoDB equivalent of an attribute in RDBMS. A value can be one of the following: primitive, object, or array of values. 

In MongoDB, we require an `id` field for each document that is used as a primary key and is always the first field of each document. 

## Querying Semi-Structured Data

To query semi-structured data, we'll look into the syntax of MongoDB Query Language (MQL). There are three main types of queries:

- **Retrieval**: restricted SELECT-WHERE-ORDERBY-LIMIT queries
- **Aggregation**: a pipeline of operators
- **Updates**: adding, changing, or removing data

Queries take inputs (the name of a collection in the database) and output a collection according to the query specifics. They are usually quite messy, as we'll see. This is because JSON itself is complex—you sacrifice simplicity when you give up the "flatness" of the data.

### Notation

There are two special forms of notation: **dot (`.`) notation** and **dollar (`$`) notation**. 
- `.` is used to drill deeper into nested objects/arrays, e.g., `person.address`.
- `$` is used to denote a special keyword, like an operator. For example, `$gt` means "greater than," and `$elemMatch` refers to the `elemMatch` function.

### Retrieval Queries

The most common query is of the form:

```javascript
db.collection.find(<predicate>, optional <projection>)
```
where predicates can be combined. Combining predicates looks something like:

```javascript
db.collection.find({ status: "D", qty: { $gte: 50 } })
```

We have an optional projection parameter that indicates the fields to include or exclude in each document of the output collection. If we want to include the field, we use 1. If we do not want to include the field, we use 0. When indicating the projection parameter, it should be the same (0 or 1) across the query, otherwise errors will occur. Note an exception: the primary key `id` is always present unless explicitly excluded (does not have to follow previous rule). 


Retrieval queries roughly follow this outline with optional operators:
```javascript
find() =   SELECT <projection> 
           FROM collection 
           WHERE <predicate>
limit() =  LIMIT
sort()  =  ORDER BY
```

### Aggregation Queries
Aggregation queries are essentially a linear pipeline of stages. Each stage corresponds to an operation, such as `$match`, `$project`, `$lookup`, `$group`, `$sort`, `$limit`, `$unwind`, etc., that manipulates the output collection from the prior stage. 

An example to find states with a population greater than 15 million, sorted by descending order:

```javascript
db.zips.aggregate([
  { $group: { _id: "$state", totalPop: { $sum: "$pop" } } },
  { $match: { totalPop: { $gte: 15000000 } } },
  { $sort : { totalPop : -1 } }
])
```
Note that there 3 pipelined operators, each of which follow the same JSON-like syntax. Group takes in `id`, which is how we specify the attributes to group by, as well as additional fields as the aggregation functions. In the example above, we group by `$state` and sum over each state's population to find the total population for each state. Some common accumulator operators are `$sum`, `$avg`, `$max`, and  `$first`. We then match or filter for documents that have a total population value of greater or equal to 15M, and the finally sort by total population in descending order with the use of -1. Use +1 to sort by ascending order.

### Unwind

The `$unwind` operator deconstructs an array field from the
input documents to output a document for *each* element. In other words,
each element of an array field will have its own document in which it is
the sole value for that field.

As an example, the aggregate query below will output a new document for
each element in the `$tags` array field.
```javascript
db.inventory.aggregate( [ 
  { $unwind : "$tags" }, 
  { $project : {_id : 0, instock: 0}}  
] )
```
If one of the documents in our collection `inventory` has the
tags `['blank', 'red']`. The `$unwind` operator will
output 2 new documents corresponding to the same `id` that
are identical with all the same field-values, except for the
`tag` field, one document having `'blank'` and another
having `'red'`

### Lookup
Lookup is MQL's way of performing left outer joins by matching local fields from the starting collection to foreign fields in the collection to be joined with. When it finds a match, it places the document into an array under the field named with the  `as` keyword. This new field is listed under the local document, which you can think of the records in the left relation for a left outer join.

`$lookup`  follows this template:
```javascript
{ $lookup: { 
    from: <collection to join>, 
    localField: <referencing field>, 
    foreignField: <referenced field>, 
    as:  <output array field> 
} }
```

### Updates

Update queries follow the syntax of \[insert/delete/update\]
\[one/many\]. We will focus on the Many() case, since it is more
general. for One(), read the docs.

If we want to add many documents to our collection, we utilize
`insertMany` which takes in a comma separated list of
documents/rows to insert:
```javascript
db.collection.insertMany([{thing: "A"}, {thing: "B"}])

db.inventory.insertMany( [    
{ item: "journal", instock: [ { loc: "A", qty: 5 }, { loc: "C", qty: 15 } ], tags: ["blank", "red"], dim: [ 14, 21 ] },    
{ item: "notebook", instock: [ { loc: "C", qty: 5 } ], tags: ["red", "blank"] , dim: [ 14, 21 ]},    
{ item: "paper", instock: [ { loc: "A", qty: 60 }, { loc: "B", qty: 15 } ], tags: ["red", "blank", "plain"] , dim: [ 14, 21 ]},    
{ item: "planner", instock: [ { loc: "A", qty: 40 }, { loc: "B", qty: 5 } ], tags: ["blank", "red"], dim: [ 22.85, 30 ] },    
{ item: "postcard", instock: [ {loc: "B", qty: 15 }, { loc: "C", qty: 35 } ], tags: ["blue"] , dim: [ 10, 15.25 ] } 
] );
```

Most of the time, you will want to use insertMany or updateMany. Rarely
do queries change or add only one thing at a time.

`updateMany` follows closely with the SQL version of
`UPDATE Relation SET <update> WHERE <filter>` and follows this format:
```javascript
db.collection.updateMany({<condition>}, {<change>})
```
For example, if we wanted to change the status of objects less than \$35
to have a status of food, we can do the following:
```javascript
db.aquarium.updateMany(
{price : {“$lt” : 35}},
{$set : {status : “food”}})
  ```