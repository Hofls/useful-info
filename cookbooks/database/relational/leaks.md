#### How to find a leak
* Check metrics (e.g. grafana)
* Get heap dump, analyze it
* Reproduce the problem in test environment
    * Non-stop send requests from 100 threads
    * Each request should be unique (different parameters)
* Typical problems:
    * [IN clause](https://stackoverflow.com/questions/31557076/spring-hibernate-query-plan-cache-memory-usage)
        * Gradually increment parameters count (e.g. from 1 to 10000). Plan for each query should be store in RAM.
        * https://stackoverflow.com/questions/31557076/spring-hibernate-query-plan-cache-memory-usage
        * Fix - decrease 'query plan' cache size (Hibernate)
    * Big amount of queries text in dump
        * Fix - turn off 'prepared statement' cache (Postgres connection)
