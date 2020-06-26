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
* Approximate computing
* Cache
* Compression
* CDN (Content Delivery Networks)
* Denormalization
* Hash
* Index
* Pagination
* Minification
* Lazy loading (on-demand)
* Prefetching
