# General info
* Latency numbers: RAM < HDD < SSD < Network
* Optimization starts with picking `architecture` that suits project needs
* `Computational complexity` should be constant O(1), logarithmic O(log n) or linear O(n)
* A general technique to improve performance is to avoid work
* It is necessary to make `trade-offs`. By giving something abundant you get something scarce
    * E.g. by implementing cache, you sacrificing disk space to get processor time
    * Also often you decrease computational complexity by increasing cognitive complexity.
        And it is not always a good thing.
* Use `profilers` to analyze performance and identify areas that need improvement

# Ways to optimize
* `Approximate computing`
* `Cache`
* `Compression`
* `CDN` (Content Delivery Networks)
* `Denormalization`
* `Hash`
    * Input - data of any size. Output - fixed size value. Same input always produces same output
* `Index`
    * Occupies space, makes inserts/updates a bit slower. But takes search from `O(n)` to `O(log n)`
    * Composite index (index on multiple columns):
        * Index on (organization_id, date) = finds area of rows with specific organization_id, then inside this area - finds date 
* `Pagination` (with infinite scroll)
* `Minification`
* `Lazy loading` (on-demand)
    * Make sure that all loaded data is needed for computations (nothing excessive)
    * Only load data that is visible to the user
* `Prefetching` (eager)
    * If you can predict that data will be needed soon - fetch it in advance 
* `Storage with smaller latency numbers` (e.g. RAM)
* `Decrease computational complexity`
* `Parallel computing`
    * Divide task into parts, process each part simultaneously
* `Remove everything` (that is not necessary)

