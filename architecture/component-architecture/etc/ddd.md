* DDD
    * Structure and language of software should match business domain
    * Iterative, ongoing process (e.g. if service grows too much - break it apart)
    * For more info, look at `tech-books/ddd-red-book.md`
* Concepts
    * `Context` - setting in which a statement appears that determines its meaning
    * `Domain` - area of business relevant to the project (e.g. retail/medicine/delivery)
    * `Subdomain` - part of domain (e.g. product catalog, orders, shipping)
      * `Core domain` - most important and essential subdomain (without it business cannot exist)
      * `Supporting subdomain` - less important subdomain, without available existing solutions
      * `Generic subdomain` - less important subdomain, but with existing off-the-shelf solutions (e.g. grafana, salesforce, chatgpt)
    * `Bounded context` - boundary within a domain where a particular domain model applies
    * `Ubiquitous Language` - domain terminology, shared by all team members
    * One-to-one is a desirable goal. 1 subdomain = 1 bounded context = 1 ubiquitous language = 1 model = 1 service (e.g. product_catalog.jar)
    * `Model` - abstract description of part of the domain (e.g. diagram with entities, attributes and relationships) 
    * `Context map` - multiple bounded contexts
    * `Anemic model` (Anti pattern) - object has data (fields) but no behavior/business logic (methods)
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
    * `Entity` - object with ID, persists over time (e.g. customer, account)
    * `Value object` - no ID, only attributes, immutable
    * `Domain Event` - notify parts of system when something happens (e.g. delivery cancelled)
    * `Service` - implements logic, doesn't have state
    * `Repository` - contains methods for retrieving/saving domain objects (abstracts storage away)
    * `Factory` - creates domain objects
    * `Aggregate` - low level group of objects (e.g. java class)
    * `Module` - high level group of objects (e.g. java package)
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
    * Cost, complexity, time, a lot of unnecessary abstractions, suitable only for complex domains
* Advantages:
    * Communication, flexibility, maintainability
* Examples
    * https://docs.microsoft.com/en-us/azure/architecture/microservices/model/domain-analysis
    * https://github.com/ddd-by-examples/library
    * https://github.com/peholmst/DDDExample
    * https://github.com/mkopylec/project-manager/tree/step-10-finish
