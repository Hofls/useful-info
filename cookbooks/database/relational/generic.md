* `Decision influencing factors`
    * Simplicity, Performance, Ease of writing/reading SQL queries
* `Primary key` - person.id
* `Foreign Key` - person.university_id
* `Names` should be singular, lowercase, snake case
    * user, extra_coupon
* `Identifier column name` = table name + id
    * customer_id, event_id, shop_id
* `Index` = column names + index
    * `shop_purchase_product_index`
* `Directory table` (id, directory, value, value_description)
    * (1, 'CancelReason', 'TOO_LATE', '7 days passed after purchase')
* `Distributed DB`:
    * `Horizontal partitioning` - different rows in different tables (e.g. customers_europe, customers_africa)
    * `Vertical partitioning` - different columns in different tables (e.g. infrequently used data, very wide columns)
* `Connections`
    * 1 connection = 1 operation at the same time
    * Connections are expensive to create. Solution - `connection pool`. Create n connections once, use them forever
    * [Connections formula](https://stackoverflow.com/questions/28987540/why-does-hikaricp-recommend-fixed-size-pool-for-better-performance)
        * For most servers optimum is 10-20
* `Cache`
    * Makes sense only if app has fixed amount of query plans (different parameters = different plan)
    * `Query plan` cache
    * `Prepared statement` cache