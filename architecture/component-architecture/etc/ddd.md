* DDD
    * Structure and language of software should match business domain
    * Iterative, ongoing process (e.g. if service grows too much - break it apart)
    * For more info, look at `tech-books/ddd-red-book.md`
* Q&A
    * What to do if devs write code in english, but team speaks in different language?
        * Make a table that defines how the Ubiquitous Language translates to English
* Concepts
    * `Context` - setting in which a statement appears that determines its meaning
    * `Domain` - area of business relevant to the project (e.g. retail/medicine/delivery)
    * `Subdomain` - part of domain (e.g. product catalog, orders, shipping)
      * `Core domain` - most important and essential subdomain (without it business cannot exist)
      * `Supporting subdomain` - less important subdomain, without available existing solutions
      * `Generic subdomain` - less important subdomain, but with existing off-the-shelf solutions (e.g. grafana, salesforce, chatgpt)
    * `Bounded context` - boundary within a domain where a particular domain model applies
    * `Ubiquitous Language` - domain terminology, shared by all team members
      * Nouns that name things, adjectives that describe them, and verbs that indicate what the things do (e.g. VIP user registration)
    * One-to-one is a desirable goal. 1 subdomain = 1 bounded context = 1 ubiquitous language = 1 model = 1 team = 1 project/executable (e.g. product_catalog.jar)
    * `Model` - abstract description of part of the domain (e.g. diagram with entities, attributes and relationships) 
    * `Context map` - visual representation (e.g. diagram) of relationships between bounded contexts (used for communication between teams)
    * `Anemic model` (Anti pattern) - object has data (fields) but no behavior/business logic (methods)
    * `Cross-Cutting Concerns` - aspects of a system that affect multiple parts of the app (e.g. logging, security, error handling)
    * `Translation layer` - bridge/adapter that translates requests and responses between the two parties
    * Types of relationships between projects/teams:
      * `Partnership`, `Shared Kernel`, `Customer-Supplier`, `Conformist`, `Anticorruption Layer`
      * `Open Host Service`, `Published Language`, `Separate Ways`, `Big Ball of Mud`
    * `Surrogate identity` - id of an entity (e.g. user.id), which has no meaning from domain POV
* Steps
    * Analyze domain
        * Organize business knowledge, create business model, provide common language
    * Define bounded contexts/subdomains (try to make them 1-to-1)
    * Define entities, aggregates, services (within each subdomain)
    * Identify services
* Phases
    * `Strategic` - define large-scale structure of the system
    * `Tactical` - design patterns that help to create domain model
* Building blocks
    * `Module` - high level group of objects (e.g. java package)
    * `Aggregate` - low level group of objects (e.g. java class, contains entities and value objects)
      * `Aggregate Root` - top level class of an aggregate (e.g. class University (root) contains List<Student> and List<Teacher>)
    * `Entity` - object with ID, persists over time (e.g. customer, account)
    * `Value object` - no ID, only attributes, immutable, usually implemented as @Embeddable (e.g. address)
    * `Domain Event` - notify parts of system when something happens (e.g. delivery cancelled)
    * `Domain Service` - implements logic, doesn't have state (methods that won't fit in Entity/Value object)
    * `Repository` - contains methods for retrieving/saving domain objects (abstracts storage away)
    * `Factory` - creates domain objects
    * `Specification` - defines complex business logic in a reusable and composable way
* Project structure example:
    * `domain layer` - business logic, domain models/exceptions/validation/events
        * Domain expert should be able to understand what's happening here (Ubiquitous language)
    * `application layer` - drives workflow of an application, thin (work should be delegated to other layers)
        * Calls methods from other modules (e.g. `domain`, `infra`), error handling, data conversion/format, events
        * @Service, @Transactional, @RestController, @EventListener
    * `infrastructure layer` - communication with external systems
        * e.g. API client (GraphQL/REST/SOAP), Database (+schema), MQ, Metrics, Hibernate config
        * @Repository, @Entity, @Table
* Disadvantages:
    * Cost, complexity, time, a lot of unnecessary abstractions, suitable only for complex domains
* Advantages:
    * Communication, flexibility, maintainability
* Examples
    * https://docs.microsoft.com/en-us/azure/architecture/microservices/model/domain-analysis
    * https://github.com/ddd-by-examples/library
    * https://github.com/peholmst/DDDExample
    * https://github.com/mkopylec/project-manager/tree/step-10-finish
