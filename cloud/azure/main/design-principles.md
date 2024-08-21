* `Design for self healing`
    * Retry failed operations
    * Protect failing remote services (Circuit Breaker)
    * Isolate critical resources (Bulkhead)
    * Perform load leveling (Queue based)
    * Failover (always run multiple instances)
    * Compensate failed transactions (avoid distributed transactions)
    * Checkpoint long-running transactions
    * Degrade gracefully (e.g. recommendation system failure shouldn't affect anything else)
    * Throttle clients (slow down clients that create excessive load, use quotas)
    * Block bad actors
    * Use leader election (If the coordinator fails, a new one selected, e.g. zookeeper)
    * Test with fault injection (usually only success path is tested)
    * Embrace chaos engineering (randomly inject failures in production)
* `Make all things redundant` (no single points of failure)
    * Consider business requirements (cost and complexity must be justified)
    * Place VMs behind a load balancer (distributes traffic to healthy VMs)
    * Replicate databases
    * Partition for availability (failure in one shard will have limited impact)
    * Deploy to more than one region
* `Minimize coordination` (to achieve scalability)
    * Embrace eventual consistency (e.g. via Compensating Transaction)
    * Use domain events to synchronize state (Interested services can listen for the events)
    * CQRS and event sourcing (Reduce contention between read workloads and write workloads)
    * Partition data (don't put all your data in one schema)
    * Design idempotent operations (e.g. via queue)
    * Use asynchronous parallel processing
    * Use optimistic concurrency (DB validates transaction after a commit)
    * Parallel, distributed algorithms (e.g. MapReduce)
* `Design to scale out` (horizontally)
    * Avoid instance stickiness (same request always goes to the same instance)
    * Identify bottlenecks (e.g. backend database)
    * Offload resource-intensive tasks (run them as background jobs)
    * Design for scale in (when instances get removed)
* `Partition around limits`
    * Partition a database (Avoid limits on size, data I/O, sessions)
        * `Horizontal` - each DB has same schema, but different data (Sharding, e.g. mmorpg servers)
        * `Functional` - each DB has unique schema, unique subdomain
    * Partition a queue (Avoid limits on requests number, connections)
* `Design for operations`
    * Make all things observable - write logs, traces
    * Instrument for monitoring - availability, performance, and system health
    * Standardize logs and metrics - each microservice should have the same format
    * Automate management tasks - provisioning, deployment, and monitoring
    * Treat configuration as code - check them into git
* `Use managed services (PaaS > IaaS)`
    * PaaS is simpler, cheaper, on higher level of abstraction
* `Use the best data store for the job`
    * Don't use a relational DB for everything (expensive join, schema on write, lock contention)
    * Consider the type of data 
        * Transactional data into SQL, JSON into document DB, telemetry into time series DB
        * Logs into Elasticsearch, Blobs in Azure Blob Storage
    * Use compensating transactions (when writing data to multiple stores)
    * Look at bounded contexts (subdomains are natural borders)
* `Design for evolution` (e.g. use microservices)
    * Enforce high cohesion and loose coupling (high focus, low interdependency)
        * Cohesive - service provides functionality that logically belongs together
        * Loosely coupled - you can change on service, without changing another
    * Encapsulate domain knowledge (1 service = 1 subdomain)
    * Use asynchronous messaging (decouple producer from consumer)
    * Expose open interfaces (rest/graphql)
    * Abstract infrastructure away from domain logic (e.g. messaging and persistence)
    * Offload cross-cutting concerns to a separate service (e.g. auth)
    * Deploy services independently (possible thanks to loose coupling)
* `Build for the needs of the business`
    * Every design decision must be justified by a business requirement (e.g. 100k users, each saves documents)
    * Objectives - RTO, RPO, MTO, SLA, SLO
    * Model the application around the business domain (e.g. DDD)
    * Capture both functional (app does right thing) and nonfunctional (app does things well) requirements
    * Plan for growth (e.g. scaling without major architectural changes)
    * Manage costs (price of cloud)