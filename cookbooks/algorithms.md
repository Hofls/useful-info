### Glossary
* `Algorithm` - sequence of computational steps
* `Algorithm running time` - number of executed operations
    * log n < n < n*(log n) < n^2
* `Asymptotic analysis` - estimates resource consumption of algorithm
* `Computational complexity` - amount of resources required to run an algorithm
* `Logarithm` - inverse function to exponentiation (log 100 = 2)
* `n` - number of input elements

### Algorithm design paradigms
* `Divide-and-conquer` - breaks down problem into multiple sub-problems, solves them, then combines them back
    * Examples: `Mergesort`
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
    * `Malware detection` - looks for behavioral patterns
* `Evolutionary algorithm` - generates a bunch of solution candidates, picks good ones, inflicts random changes on them, repeats the process

### Algorithms essence
* `Mergesort`:
    * Divide array into groups (2 elements in each), sort every group. Now groups have new property - being sorted
    * We can use it to combine groups together
* `Binary search`:
    * Compare target value to middle of array, if not equal - middle of array becomes border (top or bottom)
    * Thus, after each step search space becomes smaller and smaller
* `Tree sort`: 
    * Create binary search tree (element < parent ? to the left : to the right)
    * Now tree has some property, which we can use to traverse it: (1.left 2.current 3.right)
    * Also we can find any specific element (using rule from beginning)

