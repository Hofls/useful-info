##### Generic
* Execution plan is main metric, less cost means better performance (`EXPLAIN` / `ANALYZE`)
* Replace `Sequential scan` with `Index scan` by adding indexes
    * Index for `name like 'Joh%'` is `varchar_pattern_ops`
* First priority - minimize an amount of rows by applying filters
    * Only after that use functions, aggregates, etc
* Try to avoid using functions/type conversions (especially in `WHERE`/`JOIN`)
    * If you have 1 million rows, function will be called on every one of them
* Only use wildcards for beginning of the phrase if you use special indexes
    * Standard indexes only work with this: `name like 'Benjami%'` 
    * Special indexes (`gin_trgm_ops`) can work with this: `name like '%enjamin%'`
* Pick specific columns, don't use `*`
* Use `UNION ALL` instead of `UNION` (`UNION` wastes resources to remove duplicates)
* Use pagination if possible
* Use connection pool to avoid constantly creating new connections (it's expensive)
    * e.g. HikariCP (best used as fixed-size connection pool)
    
##### Index not working / query execution plan is slow
* `name like '%enjamin%'`
    * Replace your old index with GIN trigrams:
        ```
        CREATE EXTENSION IF NOT EXISTS pg_trgm; 
      	CREATE INDEX CONCURRENTLY idx_guest_address ON VISIT USING GIN(guest_address gin_trgm_ops);
        ```
    * (Optional) To search multiple columns at once - combine them:
        ```
        ALTER TABLE visit
        ADD COLUMN guest_address text GENERATED ALWAYS AS (city || ' ' ||  street || ' ' || house) STORED;
        ```
* `OR clause`
    * Problem:
        * Scans all rows in both tables - `where visit.customer_id = 23 or passive.customer_id = 23`
    * Fix:
        ```
        visit_with_passive (
            select * from visit 
            where visit.customer_id = 23
            union
            select visit.* from passive 
            join visit on passive.id = visit.passive_id
            where passive.customer_id = 23
        )
        ```
* `CASE, WHEN, ELSE, END`
    * Problem:
        * `WHEN :branchId IS NOT NULL THEN visit.spec_id = 23 ELSE passive.spec_id = 47 END`
    * Fix:
        ```
        visit_with_passive (
            select * from visit 
            where :branchId IS NOT NULL and visit.spec_id = 23
            union
            select visit.* from passive 
            join visit on passive.id = visit.passive_id
            where :branchId IS NULL and passive.spec_id = 47
        )
        ```
* `Function call`
    * Problem:
        * UNNEST executes for each row in jump table - `jump.id IN (SELECT * FROM UNNEST(parameters.ids))`
    * Fix:
        ```
        jumps_unnested AS (
            SELECT UNNEST(parameters.jumpIds) AS ids
            FROM parameters
        ) 
        select * from jumps
        where jump.id IN (SELECT * FROM jumps_unnested)
        ```