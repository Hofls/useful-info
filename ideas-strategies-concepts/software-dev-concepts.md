### Main
* `Abstraction`:
    * Process of removing (hiding) details
    * Creation of abstract objects composed from common features/attributes of non-abstract objects
* `Black box` - system with known input/output and unknown internal workings
* `Code reuse` - usage of existing code to write new code/software
* `Cohesion`:
    * `Low` - class does a great variety of actions - it is broad, unfocused
    * `High` - class is focused on one specific task
* `Composition over inheritance` - classes should achieve polymorphic behavior and code reuse by their composition
    * (by containing instances of other classes that implement the desired functionality) rather than inheritance 
* `Coupling` - degree of interdependence between software modules; a measure of how closely connected they are
* `Defensive programming` - anticipate failures in your code, then add supporting code to detect, isolate, and in some cases, recover from the anticipated failure.
* `Discoverability` - degree of ease with which the user can find all the elements and features of a new system when they first encounter it
* `DRY` - Don't repeat yourself (Every piece of knowledge must have a single representation in the system)
* `Fail-fast` - system which immediately reports at its interface any condition that is likely to indicate a failure
* `Gall's law` - good complex systems start as good simple systems and gradually evolve 
* `GRASP` - guidelines for assigning responsibility to classes in object-oriented design
    * `Controller` - first object beyond the UI layer that receives and coordinates ("controls") a system operation
        * The controller should delegate the work to other objects
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
* `Extensibility` - ability to add new functionality / change existing functionality
* `KISS` - simplicity should be a key goal in design, unnecessary complexity should be avoided
* `Load balancing` - process of distributing a set of tasks over a set of resources (computers)
* `Cloud computing` - computing resources on demand
* `Separation of concerns` - separation of a program into distinct sections (1 section = 1 concern)
* `Convention over configuration` - paradigm that attempts to decrease number of decision that developer is required to make (sane defaults)
* `SOLID` - principles intended to make software designs more understandable, flexible and maintainable:
	* `Single-responsibility` - every module should have one responsibility, that is entirely encapsulated by the module
	* `Open–closed` - modules should be open for extension, but closed for modification 
		* (e.g. extend code by adding new implementation of interface)
	* `Liskov substitution` - superclass objects should be replaceable with objects of its subclasses without breaking the application.
		* (e.g. design by contract - write code on interface level first, add implementations later)
	* `Interface segregation` - many client-specific interfaces are better than one general-purpose interface
	* `Dependency inversion` - one should "depend on abstractions, not implementations
* `Inversion of control` - inverts traditional control flow. 
	* Traditional approach - code explicitly calls constructor of specific implementation (new BoxService())
	* Inverse approach - code describes type, framework provides implementation (@Autowired)
* `Worse is better` - Software that is limited (worse), but simple to use, may be more appealing to the users (better)
	* `Simplicity` - The design must be simple, both in implementation and UX. Simplicity is the most important consideration in a design
	    * Simple UX example - TikTok. Just open app and scroll, no other actions are necessary
	* `Correctness` - The design should be correct
	* `Consistency` - The design must not be overly inconsistent
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
        * `Functional` - programs constructed by applying and composing functions (e.g. Haskell)
        * `Dataflow` - models a program as a directed graph of the data flowing between operations (e.g. Tensorflow)
        * `Reactive` - deals with data streams and the propagation of change (sequences of events), e.g. react
* `Chaos engineering` - causing failure of system components in production, in order to build resilient system:
  	* `Chaos Monkey` - shuts down random servers
  	* `Latency Monkey` - introduces communication delays
* `A/B testing` - testing a subject's response to variant A against variant B, and determining which of the two variants is more effective
* `Smoke test` - preliminary testing to reveal obvious failures
* `Configuration management` - automatically interacting with multiple servers to conduct sysadmin tasks (e.g. Ansible)
* `Infrastructure as code (IaC)` - managing IT infrastructure using configuration files (e.g. provisioning VMs in cloud)
* `Compliance Automation` - auto scan infrastructure to identify security issues
* `Deep modules` - individual unit of abstraction should do a lot of work, but with simple interface
* `Opinionated system` - provides one easy way of doing things (way chosen based on opinion of system's authors)
* `Vendor lock-in` - dependency on one specific vendor, without ability to switch
* `UUID` - Universally unique identifier. When systems need to generate unique numbers without coordination
* `QR code` - Quick Response code. Allows quick transfer of real world information to computer (e.g. link to a web page)
* `Digital signature` - guarantees that the contents of a message have not been altered in transit
    * Server generates hash using private+public keys, adds it to the message and sends to client
    * Client generates hash and compares them. If hashes are different - message was altered
* `Public key certificate` (digital/identity certificate) - electronic document used to prove the ownership of a public key
    * Client requests page. Server sends public key + cert. Client checks everything and continues keys exchange. 
    * After exchange - everything is encrypted with symmetric key
* `Data mining` is a process of discovering patterns in large data sets
* `Vendor lock-in` - dependency on a vendor for products and services, unable to use another vendor without substantial switching costs
* `Blue-green deployment` - two prod environments, release updates only one (if something goes wrong - you can easily rollback to another one)
* `Profiling` - runtime analysis of performance and resource usage
* `Twelve factor app` - methodology for building SAAS
    * `Codebase` - one codebase, many deployments (dev/stage/prod)
    * `Dependencies` - all dependencies should be explicit
    * `Config` - store config in the environment
    * `Backing services` - treat them (e.g. DB, MQ, Cache) as attached resources (URL in config)
    * `Build, release, run` - "must have" pipeline stages
    * `Processes` - apps should be stateless, with state stored in backing service
    * `Port binding` - services should make themselves available to other services by specified ports
    * `Concurrency` - scale horizontally (by launching multiple instances of an app)
    * `Disposability` - fast startup and shutdown
    * `Dev/Prod parity` - keep environments as similar as possible
    * `Logs` - write all logs to stdout (terminal)
    * `Admin Processes` - any admin/maintenance tasks should be a part of the application
* `MVP` - minimum viable product
* `Cargo cult` - development characterized by rituals that serve no real purpose
* `User-agent` - tool that acts on the behalf of the user (e.g. web browser)
* `TCP/IP` - separate protocols that work together to deliver data over network
    * `IP` - obtains address to send data
    * `TCP` - transmits data to the address
* `TCP/IP vs OSI` - OSI is theoretical (never got implemented), TCP/IP is practical (describes what's actually happening)
* Metrics
    * `Four key metrics` of DevOps
        * `Deployment Frequency` - how often releases go to production (multiple times a day)
        * `Lead Time For Changes` - time until a commit goes to production (<1 day)
        * `Mean Time to Restore` - time it takes to resolve a service impairment in production (<1 hour)
        * `Change Failure Rate` - how often deployments lead to failure in production (0-15%)
* `Expand and contract` - implement breaking change in API by adding new element, wait for clients to migrate from old to new, remove old element
* `Strangler fig` - bunch of small `Expand and contract`, aimed to replace an entire legacy system
* `BFF` (Backend for frontend) - each frontend has its own backend (one for mobile, one for browser, one for 3rd party apps, etc) 
* `Templates` - replace placeholders with values
    * Examples - Helm (generates yaml configs for k8s), Reports (pdf), Documents filling (simi)
* `Canary release` - make new features available to a limited selection of users (to reduce risk, gather metrics)
* Thoughtworks `core values`: fast feedback, simplicity, clean code, repeatability (automation)
* `Hook` - inject custom code at specified points (e.g. when app stops - write to logs)
* `Design sprint` - Idea -> Build prototype -> Launch -> Get feedback
    * Necessary to make sure you build product that market wants
* `Lean canvas` - key assumptions of business model:
    * Problem, Solution, Target customers, Unique value proposition, Advantage
    * Revenue streams, Cost structure, Key metrics, Channels (path to customers)
* `Death march` - project with unreachable goals, that requires unsustainable overwork
* `Feature creep` - excessive addition of new features (results in software bloat and over-complication)
* `Outsourcing` - hiring a party outside a company to perform services / create goods
* `Obfuscation` - code that is difficult for humans to understand (e.g. to prevent reverse-engineering)
* `Observability` - ability to measure a system state (logs, metrics, request tracing, alerts)
* `OAuth` - way to grant websites/apps access to user information on other websites (e.g. sign in Amazon with Facebook account)
* `LDAP` - stores logins/passwords, which allows different apps to authenticate users (e.g. same credentials for gitlab, grafana and nexus)
    * Also see - `Active directory`
* `SPOF` - single point of failure (part of a system that, if it fails, will stop the entire system from working)
    
### Others
* Pick the right tool for the job
* Embrace the tools, don't fight them
    * Use library/framework in a default/standard way
* Always look at problems from business POV
    * E.g. software is bloated and built with outdated tech? Only do something about it, if profits outweigh costs
* Take initiative - don't wait to be told, think what needs doing and advocate for it
* Always learn and improve, keep up with times
* If object oriented, put API on a thing instead of elsewhere. Java is worst at this.
    * Bad - two classes Employee (data), EmployeeUtils (behaviour)
    * Good - one class Employee (data + behaviour)
* Design for simple/frequent cases with simple API, make complex/rare cases possible with more complex API
* Bad API creators think in terms of implementation or domain of API, rather than in terms of use of API
