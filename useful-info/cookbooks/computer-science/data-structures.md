
### Data structures essence
* `Array` - O(1) Access (via index)
* `Hash Table` / `Map` / `Associative array` - O(1) Everything. Key-value storage
    * Hash function converts current_input to hash code, then hash code to array index `index = hashcode % array.getLength()`
    * Using index, jumps to array element in constant time (element_size * index = position_in_memory)
    * Because of collisions, element has list of {value, original_input}, pick value of object where (original_input == current_input)
* `Set` - Collection of unique elements. Used to remove duplicates
* `Linked list` - O(1) Insertion & Deletion    
* `Stack` / `Queue` - LIFO / FIFO
* `Graph` - represents connectivity using nodes (e.g. roads between cities)
* `Tree` is a restricted form of `graph` (it has direction - parent/child, doesn't contain cycles)
    * `Binary search tree` - formed with rule (element < parent ? to the left : to the right)
        * When searching for a specific element - at each step search space becomes smaller and smaller
        * Usage - search for values in range, sorting. O(log(n)) search/insert/delete 
    * `Binary heap` - tree with property (value of parent >= child's value). It is max heap, min heap is opposite.
        * Usage - finding min/max values O(1)
    * `Trie` - each value is a letter, you can construct words by traversing down the tree.
        * Usage - autocomplete, fulltext search, sorting
    * `Segment tree` - supports searching for all the intervals that contain a given point in log(n)
        * 
    * `Spatial tree` - used to store spatial objects (locations)
        * Example - find all museums within 2 km of my current location
    * `Quadtree` - 
    * `Balanced tree` - For each node, condition is true: left and right subtrees heights differ by at most one
    * `Binary tree` - each node has at most two children
* `Disjoint set` - collection of non-overlapping sets (each set has unique values)
* `Matrix` - 
    * Images (1 cell = 1 pixel)
