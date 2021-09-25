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
    * Sacrificing precision to reduce resources consumption + increase speed
* `Cache`
    * Agrees to tolerate stale data, to reduce resources consumption + increase speed
* `Compression`
    * Increases load on CPU to reduce file size (for storage/transfer)
* `CDN` (Content Delivery Networks)
* `Denormalization`
    * Increases read performance by reducing write performance + increasing complexity
* `Fingerprint` / `Hash`
    * Input - data of any size. Output - fixed size value. Same input always produces same output
* `Index`
    * Occupies space, makes inserts/updates a bit slower. But takes search from `O(n)` to `O(log n)`
    * `Composite index` (index on multiple columns):
        * Index on (organization_id, date) = finds area of rows with specific organization_id, then inside this area - finds date
    * `Trigram index` - looks for text in any place of the string (e.g. address ilike '%charles street%)
        * Standard indexes can only look for text in the beginning (e.g. address ilike 'charles street%')
        * Also can be configured to search for text that's pretty similar (e.g. smoke == stoke)
* `Pagination` (with infinite scroll)
* `Fuzzy search` - used to find approximately equal text 
* `Minification`
    * Removes all unnecessary characters from source code to reduce file size (for storage/transfer)
* `Lazy loading` (on-demand, just in time)
    * Make sure all loaded data needed for computations (nothing excessive)
    * Only load data that is visible to the user
* `Prefetching` (eager)
    * If you can predict that data will be needed soon - fetch it in advance 
* `Using storage with smaller latency numbers` (e.g. RAM)
* `Decrease computational complexity`
* `Parallel computing`
    * Divide task into parts, process each part simultaneously
* `Remove everything` (that is not necessary)
* `MapReduce` - used to process big data (>1 TB) on a cluster
    * Map - Split data into chunks, distribute them to different computers
    * Reduce - Consolidate results of processing each chunk into single result
    * Example - to count words in text, split text into even parts, process them, sum all the results
* `Metadata`/`Delta` as primary object descriptor (e.g. size, elements sum, count, borders)
* Look at hints in [algorithms](computer-science/algorithms.md)

