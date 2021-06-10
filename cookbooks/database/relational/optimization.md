* Execution plan is main metric, less cost means better performance (`EXPLAIN` / `ANALYZE`)
* Replace `Sequential scan` with `Index scan` by adding indexes
* First priority - minimize an amount of rows by applying filters
    * Only after that use functions, aggregates, etc
* Try to avoid using functions/type conversions (especially in `WHERE`/`JOIN`)
    * If you have 1 million rows, function will be called on every one of them
* Never use wildcards for beginning of the phrase, because it disables indexes
    * Good: `name like 'Benjami%'` 
    * Bad: `name like '%enjamin%'`
* Pick specific columns, don't use `*`
* Use `UNION ALL` instead of `UNION` (`UNION` wastes resources to remove duplicates)
* Use pagination if possible
* Use connection pool to avoid constantly creating new connections (it's expensive)
    * e.g. HikariCP (best used as fixed-size connection pool)