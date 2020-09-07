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
* https://en.wikipedia.org/wiki/Algorithmic_paradigm

### Algorithms essence
* `Mergesort`:
    * Divide array into groups (2 elements in each), sort every group. Now groups have new property - being sorted
    * We can use it to combine groups together
* `Binary search`:
    * Compare target value to middle of array, if not equal - middle of array becomes border (top or bottom)
    * Thus, after each step search space becomes smaller and smaller
* `Sudoku`:
    * https://en.wikipedia.org/wiki/Backtracking
    * 