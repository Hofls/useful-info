### Overview
* [DB types](overview/db-types.png)
  * `Relational` - stores data in tables, which have relationships with each other (e.g. one to one, one to many)
  * `Columnar / Column-oriented` - at high level looks just like any relational DB. But at low level, stores data on disk in columns (instead of rows)
    * So regular DB gives fast access to entire row (e.g. data about a specific user)
    * While columnar DB gives fast access to entire column (e.g. to calculate average purchase value of all users), useful for reports/analytics
  * `Key-value` - records are retrieved using unique key (e.g. like HashMap in Java)
    * O(1) reads, often used as cache
  * `In-memory` - stores data in RAM (instead of disk)
  * `Wide-column` - uses tables, rows, and columns, just like a relational database
    * But names and format of the columns can vary from row to row in the same table
  * `Time series` - stores data as time and value
  * `Immutable Ledger` - data can't be modified or deleted in any way
  * `Geospatial` - stores spatial data (that represents objects defined in a geometric space)
  * `Graph` - stores data as graph (with nodes and edges)
    * High performance for data models with very complex relationships (e.g. social network)
  * `Document` - stores data as documents (JSON)
  * `NoSQL` - stores data without tables & relationships, in CAP chooses AP
    * Consists of following DB types - `Key-Value`, `Document`, `Wide-column`, `Graph`
    * Advantages - easy horizontal scaling, does not require a schema  
