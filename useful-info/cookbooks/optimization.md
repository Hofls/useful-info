# General info
* Latency numbers: RAM < SSD < HDD < Network
* Optimization starts with picking `architecture` that suits project needs
* `Computational complexity` should be constant O(1), logarithmic O(log n) or linear O(n)
* A general technique to improve performance is to avoid work
* It is necessary to make `trade-offs`. By giving something abundant you get something scarce
    * E.g. by implementing cache, you sacrifice disk space to get processor time
    * Also often you decrease computational complexity by increasing cognitive complexity (not always a good thing)
* Use `profilers` to analyze performance and identify areas that need improvement

# Ways to optimize
* `Approximate computing`
    * Sacrifice precision to reduce resources consumption + increase speed
* `Cache`
    * Agrees to tolerate stale data, to reduce resources consumption + increase speed
* `Compression`
    * Increases load on CPU to reduce file size (for storage/transfer)
* `Fallback`
    * Maintain two solutions: 1. Simple and fast; 2. Complex and slow.
    * Try to solve a problem with simple solution. If it doesn't work (e.g. on edge cases) - fallback to complex solution.
* `CDN`, `Edge` - use servers that located geographically close to users
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
* `Buffer` - if file is bigger than available memory, divide file in small chunks, load and process them one by one
* `Prefetching` (eager)
    * If you can predict that data will be needed soon - fetch it in advance 
* `Using storage with smaller latency numbers` (e.g. RAM)
* `Subjective optimization`
    * Objectively load speed stays the same, but people perceive it as being faster
    * E.g. - display interesting animation; Or first load approximation of image, then load original
* `Decrease computational complexity`
* `Parallel computing`
    * Divide task into parts, process each part simultaneously
* `Remove everything` (that is not necessary)
* `MapReduce` - used to process big data (>1 TB) on a cluster
    * Map - Split data into chunks, distribute them to different computers
    * Reduce - Consolidate results of processing each chunk into single result
    * Example - to count words in text, split text into even parts, process them, sum all the results
* `Metadata`/`Delta` as primary object descriptor (e.g. size, elements sum, count, borders)
* `Partition data` - divide data into independent parts (e.g. shards, tables) Less data means higher processing speed
* `Limits` - limit amount of requests (e.g. each user has maximum 3000 requests per hour)
* Look at hints in [algorithms](computer-science/algorithms.md)


# Ways to optimize (Java specific)
* TreeMap:
  ```
  // Quickly find indicators that fit between "start" and "end"
  var indicatorMap = new TreeMap<LocalDateTime, List<Indicator>>();
  var indicatorsInRange = indicatorMap.subMap(start, true, end, false).values(); // O(log n)
  ```
* Binary search:
  ```
  List<Integer> sortedList = List.of(1, 3, 5, 7, 9);
  int index = Collections.binarySearch(sortedList, 5); // O(log n)
  ```

* Data bucketing:
  ```
  Map<Integer, List<Integer>> buckets = new HashMap<>();
  for (int num : nums) {
    int bucketKey = num / 10; // Group by range 0-9, 10-19, etc.
    buckets.computeIfAbsent(bucketKey, k -> new ArrayList<>()).add(num);
  }
  List<Integer> rangeBucket = buckets.get(1); // Numbers 10-19; complexity - O(1)
  ```
* NavigableSet
  ```
  NavigableSet<Integer> treeSet = new TreeSet<>(List.of(10, 20, 30));
  int floor = treeSet.floor(25);  // 20; closest element that is less than 25
  int ceiling = treeSet.ceiling(15); // 20; closest element that is bigger than 15
  ```
* HashMap:
  ```
  Map<String, User> userIndex = new HashMap<>();
  User user = userIndex.get("userId123"); // O(1) lookup
  ```
