* DDD
    * Structure and language of software should match business domain
    * Iterative, ongoing process (e.g. if service grows too much - break it apart)
* Concepts
    * `Context` - setting in which a statement appears that determines its meaning
    * `Domain` - subject area of a project
    * `Model` - describes parts of a domain. If model becomes too complex - fragment into multiple models.
    * `Ubiquitous Language` - shared by all team members
    * `Bounded context` - boundary within a domain where a particular domain model applies
    * `Context map`
* Steps
    * Analyze domain
        * Organize business knowledge, create business model, provide common language
    * Define bounded contexts
    * Define entities, aggregates, services (within each subdomain)
    * Identify microservices
* Phases
    * `Strategic` - define large-scale structure of the system
    * `Tactical` - design patterns that help to create domain model
* Building blocks
    * `Entity` - object with ID, persists over time (e.g. customer, account)
    * `Value object` - no ID, only attributes, immutable
    * `Aggregate` - group of objects
    * `Domain Event` - notify parts of system when something happens (e.g. delivery cancelled)
    * `Service` - implements logic, doesn't have state
    * `Repository` - contains methods for retrieving/saving domain objects (abstracts storage away)
    * `Factory` - creates domain objects
* Project structure example:
    * `domain` - business logic, domain models/exceptions/validation/events
        * Domain expert should be able to understand what's happening here (Ubiquitous language)
    * `application` - drives workflow of an application, thin (work should be delegated to other layers)
        * Calls methods from other modules (e.g. `domain`, `infra`), error handling, data conversion/format, events
        * @Service, @Transactional, @RestController, @EventListener
    * `infrastructure` - communication with external systems
        * e.g. API client (GraphQL/REST/SOAP), Database (+schema), MQ, Metrics, Hibernate config
        * @Repository, @Entity, @Table
* Disadvantages:
    * Cost, complexity, time (suitable only for complex domains)
* Advantages:
    * Communication, flexibility, maintainability
* Examples
    * https://docs.microsoft.com/en-us/azure/architecture/microservices/model/domain-analysis
    * https://github.com/ddd-by-examples/library
    * https://github.com/peholmst/DDDExample
    * https://github.com/mkopylec/project-manager/tree/step-10-finish
