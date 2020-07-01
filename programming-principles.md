* `ACID` - properties of database transactions
    * `Atomicity` - transaction is either succeeds completely, or fails completely
    * `Consistency` - transaction can only bring the database from one valid state to another (constraints are satisfied)
    * `Isolation` - concurrent execution of transactions leaves the database in the same state that would have been obtained if the transactions were executed sequentially
    * `Durability` - once a transaction has been committed, it will remain committed even in the case of a system failure
* `Abstraction`:
    * Process of removing details
    * Creation of abstract objects composed from common features/attributes of non-abstract objects.
* `Black box` - system with known input/output and unknown internal workings
* `Code reuse` - usage of existing code to write new code/software
* `Cohesion`:
    * `Low` - class does a great variety of actions - it is broad, unfocused
    * `High` - class is focused on one specific task
* `Composition over inheritance` - classes should achieve polymorphic behavior and code reuse by their composition
 (by containing instances of other classes that implement the desired functionality) rather than inheritance 
* `Coupling` - degree of interdependence between software modules; a measure of how closely connected they are
* `Defensive programming` - anticipate failures in your code, then add supporting code to detect, isolate, and in some cases, recover from the anticipated failure.
* `Discoverability` - degree of ease with which the user can find all the elements and features of a new system when they first encounter it
* `DRY` - Don't repeat yourself (Every piece of knowledge must have a single representation in the system)
* 
* 
    * 
    * 
* 
    * 
    * 
* 
    * 
    * 
* 
    * 
    * 
* 
    * 
    * 
* 
    * 
    * 
* `SOLID`
    * 
    * `Dependency inversion` - dependencies should be injected via DI Framework (opposed to instantiating them yourself)