### Glossary
* `Algorithm` - sequence of computational steps
* `Algorithm running time` - number of executed operations
    * log n < n < n*(log n) < n^2
* `Asymptotic analysis` - estimates resource consumption of algorithm
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
* `Kernelization` - stage before main algorithm, in which input reduced to a smaller input, called "kernel" 
* `Hybrid algorithm` - combination of multiple algorithms to solve the same problem.
    * Example: Use approximation algorithm to find imprecise solution. Then use it as starting point for precise algorithm
* `Heuristic algorithm` - provides approximate solution
    * `Greedy algorithm` - makes locally optimal choice at each step
    * https://en.wikipedia.org/wiki/Heuristic_(computer_science)
    * https://en.wikipedia.org/wiki/Category:Heuristic_algorithms
* `Genetic algorithm` - https://en.wikipedia.org/wiki/Genetic_algorithm


### Algorithms essence
* `Mergesort`:
    * Divide array into groups (2 elements in each), sort every group. Now groups have new property - being sorted
    * We can use it to combine groups together
* `Binary search`:
    * Compare target value to middle of array, if not equal - middle of array becomes border (top or bottom)
    * Thus, after each step search space becomes smaller and smaller
* `Sudoku`:
    * Like depth-first tree search, with checking for constraints and going to parent nodes if check failed
