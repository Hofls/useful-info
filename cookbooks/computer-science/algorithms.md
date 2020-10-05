### Glossary
* `Algorithm` - sequence of computational steps
* `Algorithm running time` - number of executed operations
    * log n < n < n*(log n) < n^2
* `Asymptotic analysis` - estimates resource consumption of algorithm
* `Computational complexity` - amount of resources required to run an algorithm
* `Logarithm` - inverse function to exponentiation (10^2=100;log 100 = 2)
* `NP-complete` problems have no known fast solution (best bet - approximation algorithm)
* `n` - number of input elements

### Algorithm design paradigms
* `Divide-and-conquer` - breaks down problem into multiple sub-problems, solves them, then combines them back
    * Examples: `Mergesort`, `Quicksort`
* `Decrease and conquer` - reduces problem to a smaller problem, tries to solve it, if not solved - reduces again
    * Examples: `Binary search`
* `Backtracking` - builds solution candidates, then abandons (backtracks) those that do not satisfy the constraints
    * Examples: `Sudoku`
* `Brute-force` - enumerates all possible solution candidates, until finding one which satisfies problem statement
* `Dynamic Programming` - if problem has overlapping subproblems - solve each subproblem once and cache the result
* `Kernelization` - stage before a main algorithm, in which input reduced to a smaller input, called "kernel" 
* `Hybrid algorithm` - combination of multiple algorithms to solve the same problem.
    * Example: Use approximation algorithm to find imprecise solution. Then use it as starting point for precise algorithm
* `Heuristic algorithm` - provides approximate solution
    * `Greedy algorithm` - makes locally optimal choice at each step
* `Evolutionary algorithm` - generates a bunch of solution candidates, picks good ones, inflicts random changes on them, repeats the process

### Hints
* Use metadata as primary object descriptor (e.g. size, elements sum, count, borders)
* No need to calculate each element independently, maybe it is possible to derive values from its neighbours
* Maybe its possible to think in terms of intervals, rather than specific points (1-7 is better than 1,2,3,4,5,6,7)
* Think in terms of deltas (differences between objects/ranges)
* Use different data-structures to solve different problems (e.g. hashmap to store metadata, stack to store order of elements)
* Think in terms of events (0-def_start, 1-def_start, 2- atk_start, 3-def_end (x2), 4-atk_end)
* Sometimes makes sense to move from the opposite direction
    * E.g. "are those areas overlapping?" is hard, while "are those areas not overlapping?" is easy (just use negation)
* On exploration problems - makes sense to set depth limit
* No need to recalculate every value in an array, just move borders around
* Think about the worst case, best case and average. The worst case is usually easy to optimize


### Algorithms essence
* `Mergesort`:
    * Divide array into 2 partitions recursively, until you hit partition with 1 element
    * Now merge the partitions, by comparing first elements of each partition, and moving smaller one in result
    * Explanation - each partition has a property that we use, to merge them
* `Binary search`:
    * Compare target value to middle of sorted array, if not equal - middle of array becomes border (top or bottom)
    * Thus, after each step search space becomes smaller and smaller
    * Inserts to array cost a lot, better use `Binary search tree`
* `Quicksort`:
    * Pick middle element as pivot, gather all elements less than pivot in one partition, elements greater than pivot - in another 
    * Call quicksort on each partition and combine the result - `quicksort(lesser) + pivot + quicksort(greater)`
    * Explanation - each partition has property that we use, to combine result
* `Breadth-first search`:
    * Go to the node, save all child nodes in todo list. Visit each node from list, while filling next todo list
* `Dijkstra's algorithm`:
    * Visit node, check neighbours cost, if its lower - update their weights. Go to a next unvisited node
    * After assigning weights, to find the cheapest path from A to Z - move backwards from Z, picking nodes with the lowest weight
    * Details - only save the lowest cost, do not visit same node more than once
* `K nearest neighbors`:
    * Use numbers to describe categories, start with a bunch of manually categorized items.
    * To categorize new item - check his nearest neighbors, pick category with most occurrences.
* `Bloom filter`:
    * Like `Hash table`, but ignores collisions, meaning it takes way less space and provides approximate answers
* `SimHash`, `MinHash`:
    * Quick estimation of how similar two sets are (hashes for two similar texts will be similar too)
* `Recursion`:
    * Function that calls itself. Useful when solution depends on solutions of smaller instances of same problem
    * Is limited (problems start about 1k calls deep - e.g. StackOverflow). In such case - use iteration

#### How to solve a problem
* Preparation:
    * Visualize a problem, ask clarifying questions
    * Simplify problem description, use IRL terms
    * If problem is big - break it into subproblems
* Prototype:
    * Solve small instances of problem manually, save expected values in unit tests
    * Identify all edge cases, write tests for them
    * Implement solution (possibly starting with pseudocode)
        * Don't think about optimizations yet, just solve the problem in any way (naive/brute force)
* Improvements:
    * Optimize solution
        * Use prototype to test optimized solution (via unit tests)
        * If unsure - generate big amount of input data (e.g. millions of random numbers), check if algorithm processes it instantly
    * Refactor code
