* `ACID` - properties of database transactions
    * `Atomicity` - transaction is either succeeds completely, or fails completely
    * `Consistency` - transaction can only bring the database from one valid state to another (constraints are satisfied)
    * `Isolation` - concurrent execution of transactions leaves the database in the same state that would have been obtained if the transactions were executed sequentially
    * `Durability` - once a transaction has been committed, it will remain committed even in the case of a system failure
* `Abstraction`:
    * Process of removing (hiding) details
    * Creation of abstract objects composed from common features/attributes of non-abstract objects
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
* `Fail-fast` - system which immediately reports at its interface any condition that is likely to indicate a failure
* `Gall's law` - good complex systems start as good simple systems and gradually evolve 
* `GRASP` - guidelines for assigning responsibility to classes in object-oriented design
    * `Controller` - first object beyond the UI layer that receives and coordinates ("controls") a system operation
        The controller should delegate the work that needs to be done to other objects
    * `Creator` - creates objects (e.g. Factory pattern)
    * `Indirection` - assigns responsibility of mediation to an intermediate object (e.g. Controller in MVC)
    * `Information expert` - assign responsibility to the class that has the information necessary to fulfill the responsibility
    * `High cohesion`
    * `Low coupling`
    * `Polymorphism` - single interface with multiple implementations
    * `Protected variations` - identify points of likely variation or instability, create a stable interface around them
    * `Pure fabrication` - class that does not represent a concept in the problem domain, specially made up to achieve low coupling, high cohesion, and the reuse potential
        (e.g. Service in DDD)
* `Information hiding (Encapsulation)` - prevents implementation details from being accessible to its clients (details can change without disrupting clients)
* `Modular programming` - separation of code into independent, interchangeable modules, each module contains everything necessary to execute one aspect of functionality:
	* Independent - low coupling, not dependent on different modules
	* Interchangeable - interface with different implementations
* `Scalability` - ability to handle growing amount of work by adding resources to the system
	* `Horizontal` - adding more nodes (computers) to the system
	* `Vertical` - adding more resources (CPU/RAM) to a single node
* `Extensibility` - ability to add new functionality/change existing functionality
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