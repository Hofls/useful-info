## Microservices/distributed patterns

#### Data/Database
* `Database per service`
    * Data accessible only via API
    * Each service can pick DB that suits its needs (e.g. PostgreSQL, Elasticseach, MongoDB)
    * If 1 DB dies, other services won't even notice it (Loose coupling)
* `Saga` - sequence of local transactions that span multiple services
    * `Choreography` based - local transaction publishes domain events that trigger next local transaction
        * Example:
            * Clients service receives "order event", produces "not enough money" event
            * Inventory service receives "order event", produces "out of stock" event
    * `Orchestration` based - orchestrator tells the participants what local transactions to execute
        * Example - Orchestrator checks is item in inventory, is a client has enough money, then approves/rejects order
    * High complexity, any local transaction can be undone
* `API Composition` - invokes services and joins their results
    * Example - send request to organization service, user service and event service. Then combine responses into one JSON.
* `CQRS` - write operations go to one DB, read operations to another
    * Examples - main and replica; tables and materialized view;
* `Domain event` - something that happened, and other parts of system should know about
    * Example - order created/cancelled/edited/done
* `Event sourcing` - persist state of entity as a sequence of state-changing events
    * Provides audit log and time travel

#### Observability
* `Log aggregation` - centralized logging service, has logs from each instance/container (e.g. graylog, elk)
* `Application metrics` - gather data/statistics about service operation (e.g. prometheus + grafana)
* `Audit logging` - record user activity in a database (e.g. JaVers, envers)
* `Distributed tracing` - 
    * Assign ID to external request, pass ID to all other services involved in handling the request.
    * This way you can search in logs by ID, and find all related actions
* `Exception tracking` - report all exceptions to a centralized tracking service, send notifications
* `Health check API` - http endpoint that returns service health (for load balancing and monitoring)

#### Integration
* `API Gateway` aka `Facade` - single entry point for all the clients.
    * Frontend shouldn't know about all the microservices. It should know only about API Gateway.
    * Some requests are simply proxied to the appropriate service, others require multiple calls
* `Composite microservice` - same as API Gateway, but with business logic (multiple service calls + calculations)
* `Aggregator` - alternative name for API Gateway / Composite microservice
* `Backends for frontends` - each frontend has its own backend (with API Gateway)
    * One for android app, another for web app, another for 3rd party apps

#### Etc
* `Circuit Breaker` - proxy, that stops working if failure rate exceeds a threshold
    * To prevent further load on already overloaded service
* `Access Token` - token, securely stores information about user, that is exchanged between services (e.g. JWT)
* `Configuration management` - automatic interaction with multiple servers to conduct sysadmin tasks (e.g. Puppet, Ansible, Chef)
* `Service discovery` - send request through load balancer, that will pick one of service instances to handle it (e.g. nginx, ingress)
* `Blue-Green Deployment` - two identical prod environments - one is old and serving requests, other is new and does nothing
    * To update without any downtime - move all the traffic to the new environment
* `Service mesh` - smart proxy (all traffic flows through it), that implements cross-cutting concerns:
    * Service discovery, circuit-breaking, retries on request failures, load-balancing, logging, rate-limiting...
* `Emulator` / `Simulator`
    * Problem - you need to integrate with external system, but that systems has only production environment
    * Solution - create simulator that implements same API (with minimal behavior), use it for dev/test purposes
* Run in containers
    * To take advantage of fixed and isolated environment, autoscaling, portability.
* Externalized configuration
    * Get DB credentials and service URLs from the environment. So same executable can run anywhere (local, test, prod)
* Communication:
    * Request/Response (REST, GraphQL, gRPC)
    * Messaging (Kafka, RabbitMQ)
* Service Template
    * Project example with Security, Logging, DB, REST, Tests, etc. Speeds up new service development.
* API Gateway, Service mesh, Load balancer - can mean the same thing. Lines are getting blurry.
