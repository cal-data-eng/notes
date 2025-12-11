(spreadsheet)=
# The Spreadsheet Data Model

**Last Updated:** December 13th, 2024

A Spreadsheet Workbook comprises many sheets. Each of these sheets have
cells, and a spreadsheet is structured around those cells.

Cells contain one or more of:

-   a value, e.g., numbers, strings, date/time; or

-   formula expressions can involve arithmetic +/- (e.g., =A1+B1) or
    special functions (e.g., `=AVERAGE(B1, D1)`)

Let us now look closer into the conceptual cell model representation:

-   Each cell must have a type, declared explicitly or implicitly by the
    Value/Formula. There are no constraints about types across rows or
    columns.

-   Each cell has an address: Sheet #, Row #, Column #. Sheet \# is not
    important if there is only one sheet.

Within cells, we are able to embed **formulae**. These are essentially
**materialized views**! They are always kept up-to-date as changes are
made, can take a long time on complex formula networks. To work around
this, instead, we can make these formulae be computed on demand. We do
this by turning off "automatic recalculation," i.e., manual computation
mode. However, it is not good practice to do this, as it may lead to
stale values, inconsistent shared access, etc.

Note, because we are in cell model form, rows and columns are
equivalent! We can have columns correspond to "records" and rows to
"attributes".

# Basic Spreadsheet Functions

Within spreadsheets, we can take advantage and utilize standard
mathematical and statistical functions, including PEMDAS, average, SUM,
MIN, etc. These last several functions perform like relational GROUP BY
aggregation functions. When we put in formulae into our cells,
oftentimes we want to use values from other cells. We can pass in other
cells as arguments to our formulae, and these can contain values or
other formulae.

Spreadsheets do relative referencing by default. If we set cell F3 to
the formula `=D3-E3`, i.e., "subtract the cell one step to the left from
the step two steps to the left". We can drag F3 down to F4 to implicitly
copy this formula row-wise. In general, dragging aways preserves formula
intent

Sometimes we may need to force absolute referencing, which we can do
with `$`. Let us set set cell G3 to the formula `=D3 * $D$13`. If we
"drag" this down, the 2nd argument correctly refers to the same fixed
cell.

Inserting/deleting rows and columns will (usually) not break
relative/absolute referencing!

# XLOOKUP

In 2019, Microsoft deprecated VLOOKUP and implemented XLOOKUP as an
improved version for lookups. The X stands for different directions:
horizontal or vertical.

To see when to use XLOOKUP, let us take an example of a spreadsheet,
where each row is a purchase record. What if we wanted the name of the
Employee who made the purchase, but we can only access the EmployeeID.

We take the the EmployeeID as the key, find out what row that key is at
in our result range, and look up the corresponding Name for that row and
return that Name.

XLOOKUP follows these steps:

-   Search for value `search_key` in `lookup_range` in order from first
    entry to the last

-   If exact match with i-th entry of `lookup_range`, fetch the i-th
    entry of `result_range` and return it

-   If not found, return #N/A

The syntax is as follows:
`=XLOOKUP(lookup_value, lookup_array, return_array, , [match_mode], [search_mode])`

# HCI Research and Direct Manipulation

## Popularity of Spreadsheets

Why are spreadsheets so popular?

Spreadsheets are so widespread because of the ease of access: we can
\"export to Excel\" and easily work with CSVs. In addition, with the
\"table-oriented layout\" you can compute things without needing to know
programming. Furthermore, spreadsheets facilitates collaboration across
users. Most importantly perhaps, the user interface of spreadsheets
supports direct manipulation, which is easy to use, flexible, and
provides immediate feedback.

## Direct Manipulation

Direct manipulation (coined by Shneiderman in 1982) user interfaces have
three properties:

-   Continuous representations of the objects and actions of interest;

-   Physical actions instead of complex syntax; and

-   Rapid, incremental, reversible operations whose effect on the object
    of interest is immediately visible.

Key benefits:

-   Novices can learn via demonstration; experts can define new
    features/functions for rapid work.

-   Users experience less anxiety because the system is comprehensible &
    actions can be reversed.

-   Users gain confidence and mastery because they are initiators of
    actions, they feel in control, and system responses are predictable.

Direct manipulation is applicable far beyond just spreadsheets. We see
direct manipulation in using a steering wheel to drive a car, smartphone
screens, document/word editing, and so much more in daily life!

# Scalability Challenges

Spreadsheets are slow and struggle with scalability. Spreadsheets can't
handle large datasets, oftentimes this is when the dataset has more than
a million rows. It can also face challenges with interactivity, where
changes causes delays or worse, crashes.

**Why are spreadsheets so slow?** Because there's no real DBMS (database
management system) handling optimizations across cells:

-   Execute each formula as written. Extremely limited query
    optimization

-   No shared optimization across cells (e.g., no "join"; each VLOOKUP
    cell formula is executed separately)

-   No indexes, even for find-and-replace

-   Formulae often recomputed from scratch when one single value
    changes!

# Spreadsheet Data Model, Recap

**Spreadsheet Data**

-   ad-hoc and **cell-structured**

-   can be **directly manipulated**

-   are **ordered**, and **positions are core** to (formula) meaning.

-   does not need to follow a schema.

**Spreadsheet "Queries"**

-   are **formulae**

-   can operate on collections of cells at a time

-   are therefore embedded as **materialized views** along with data.