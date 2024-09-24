### Data Management
* `Cache-Aside` - load data on demand into a cache from a data store
    * Reading form cache is fast, but it may expire
* `CQRS` - separate read and update operations 
* `Event Sourcing` - store history of changes
* `Index Table` - create indexes for frequently accessed fields
* `Materialized View` - generate prepopulated views
* `Sharding` - each shard has same schema but different data
* `Static Content Hosting` - static content to a cloud-based storage service (e.g. CDN)
* `Valet Key` - token which gives access to specific resource

### Design and Implementation
* `Ambassador` - client-side proxy (retry, circuit breaking, monitoring, security)
* `Anti-Corruption Layer` - adapter between modern and legacy application
* `Backends for Frontends` - different backend for each frontend (e.g. for desktop/mobile)
* `Compute Resource Consolidation` - combine tasks into single unit
* `External Configuration Store` - move config to centralized location
* `Gateway Aggregation` - use gateway to combine multiple requests into a single one
* `Gateway Offloading` - move shared functionality to a gateway (e.g. traffic decryption)
* `Gateway Routing` - route requests to multiple services (via gateway)
* `Leader Election` - elect one instance as leader (to manage other instances)
* `Pipes and Filters` - break complex processing to simple parts
* `Sidecar` - move part of app to different container (for isolation and encapsulation)
* `Strangler Fig` - incrementally modernize legacy system by replacing its parts with new services

### Messaging
* `Asynchronous Request-Reply`
    * Client sends request to server, server starts long running operation and returns id, client periodically checks operation status
* `Claim Check` - send claim check to the messaging platform, store blob on external service
* `Choreography` - decisions made collectively by each component (alternative to central control)
* `Competing Consumers` - concurrent consumers process messages from the same channel (first to grab)
* `Priority Queue` - messages with high priority processed first
* `Publisher-Subscriber` - publisher produces events, subscriber - consumes
* `Queue-Based Load Leveling` - queue as a buffer to smooth sudden load
* `Scheduler Agent Supervisor` - coordinate actions across distributed services
* `Sequential Convoy` - process messages in strict order

[Source](https://docs.microsoft.com/en-us/azure/architecture/patterns/index-patterns)
