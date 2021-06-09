#### How to find a leak
* Check metrics (e.g. grafana)
* Get heap dump, analyze it
* Reproduce the problem in test environment
    * Non-stop send requests from 100 threads
    * Each request should be unique (different parameters)
* Typical problems:
    * [IN clause](https://stackoverflow.com/questions/31557076/spring-hibernate-query-plan-cache-memory-usage)
        * Gradually increment parameters count (e.g. from 1 to 10000). Plan for each query should be stored in RAM.
        * https://stackoverflow.com/questions/31557076/spring-hibernate-query-plan-cache-memory-usage
        * Fix - decrease 'query plan' cache size (Hibernate)
            * `hibernate.query.plan_cache_max_size=16`
            * `hibernate.query.plan_parameter_metadata_max_size=8`
    * Big amount of queries text in dump
        * Fix - turn off 'prepared statement' cache (Postgres connection)
            * `jdbc:postgresql://potr-db-t:5432/puds2?preparedStatementCacheQueries=0`
