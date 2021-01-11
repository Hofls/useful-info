* `Decision influencing factors`
    * Simplicity, Performance, Ease of writing/reading SQL queries
* `3rd normal form` is a good default
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
