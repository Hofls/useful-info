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
* `KISS` - simplicity should be a key goal in design, and unnecessary complexity should be avoided
* `Load balancing` - process of distributing a set of tasks over a set of resources (computers)
* `Cloud computing` - computing resources on demand
* `Separation of concerns` - separation of a program into distinct sections (1 section = 1 concern)
* `Convention over configuration` - paradigm that attempts to decrease number of decision that developer is required to make (sane defaults)
* `SOLID` - principles intended to make software designs more understandable, flexibe and maintainable:
	* `Single-responsibility` - every module should have one responsibility, that is entirely encapsulated by the module
	* `Open–closed` - modules should be open for extension, but closed for modification 
		(e.g. extend code by adding new implementation of interface)
	* `Liskov substitution` - superclass objects should be replaceable with objects of its subclasses without breaking the application.
		(e.g. design by contract - write code on interface level first, add implementations later)
	* `Interface segregation` - many client-specific interfaces are better than one general-purpose interface
	* `Dependency inversion` - one should "depend on abstractions, not implementations
* `Inversion of control` - inverts traditional control flow. 
	* Traditional approach - code expliciltly calls constructor of specific implementation (new BoxService())
	* Inverse approach - code describes type, framework provides implementation (@Autowired)
* `Worse is better` - Software that is limited (worse), but simple to use, may be more appealing to the users (better)
	* `Simplicity` - The design must be simple, both in implementation and interface. Simplicity is the most important consideration in a design
	* `Correctness` - The design should be correct, but It is slightly better to be simple than correct
	* `Consistency` - The design must not be overly inconsistent. However consistency can be sacrificed for simplicity in some cases.
	* `Completeness` - Completeness must be sacrificed whenever implementation simplicity is jeopardized
* `YAGNI` - implement things when you actually need them, not when you just foresee that you need them
* `Overengineering` - act of designing a product to be more robust or have more features than necessary for its intended use, or for a process to be unnecessarily complex.
* `Gold plating` - phenomenon of working on a project past the point of diminishing returns
* `Bus factor` - minimum number of team members that have to suddenly disappear from a project before the project stalls
* `Bottleneck` - occurs when capacity of an application is limited by a single component
* `Programming paradigm`
    * `Imperative` - programmer instructs the machine how to change its state
        * `Procedural` - groups instructions into procedures (e.g. Pascal)
        * `Object-oriented` - based on the concept of "objects", which can contain data + methods (e.g. Java)
    * `Declarative` - programmer declares properties of the desired result, but not how to compute it
        * `Functional` - programs are constructed by applying and composing functions (e.g. Haskell)
        * `Dataflow` - models a program as a directed graph of the data flowing between operations (e.g. Tensorflow)
        * `Reactive` - deals with data streams and the propagation of change (sequences of events), e.g. react
* `Chaos engineering` - causing failure of system components in production, in order to build resilent system:
  	* `Chaos Monkey` - shuts down random servers
  	* `Latency Monkey` - introduces communication delays
* `A/B testing` - testing a subject's response to variant A against variant B, and determining which of the two variants is more effective
* `Smoke test` - preliminary testing to reveal obvious failures
* `Configuration management` - automatically interacting with multiple servers to conduct sysadmin tasks (e.g. Ansible)
* `Infrastructure as code (IaC)` - managing IT infrastructure using configuration files (e.g. provisioning VMs in cloud)
* `Deep modules` - individual unit of abstraction should do a lot of work, but with simple interface
* `Opinionated system` - provides one easy way of doing things (way chosen based on opinion of system's authors)
* `Vendor lock-in` - dependency on one specific vendor, without ability to switch
* `UUID` - Universally unique identifier. When systems need to generate unique numbers without coordination
* 
    * 
    * 
* 
    * 
    * 
* `SOLID`
    * 
    * `Dependency inversion` - dependencies should be injected via DI Framework (opposed to instantiating them yourself)