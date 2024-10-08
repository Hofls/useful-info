## API Design
#### API tech:
* Outdated: SOAP, RPC, CORBA
* `REST` - 
    * Write server-side code, generate client stub (swagger)
    * More - [rest.md](rest.md)
* `GraphQL` - 
    * Generate GraphQL schema from DB schema, then client/server stubs from GraphQL
    * GraphQL prevents over-fetching/under-fetching (Client can request only fields it needs)
    * Allows quick front-end development (No need to wait for backend guys to implement a new endpoint)
    * More - [graphql.md](graphql.md)
* `gRPC` - 
    * Define API in structured documents, generate client/server stubs
    * Use cases - microservice communication (internal APIs), when performance is critical
    * Advantages - good performance
    * Disadvantages - slow developing time
* Other:
  * `Websocket` - real-time, event-driven bidirectional communication between client and server
  * `SSE` - push updates from server to client (unidirectional)
  * `Webhook` - event-driven server to server communication (e.g. on push, gitlab sends http request to telegram server)
  * `Short-polling` - periodically ask server for new events via REST (usable for MVP/Prototype)
  * `Long-polling` - request events from server, keep connection open until server has new events or timeout occurs (better use sse/websocket)

#### API data formats:
* `XML` - outdated
* `Json` - human readable, parsable without a schema, fast developing time (default data format, used in vast majority of cases)
* `Protobuf` - human unreadable, not parsable without a schema, dense, slow developing time (but great if performance is critical)

#### Principles
* Pretend you are API user, what would be simplest and most convenient API?
    * Write pseudocode for client-side to test different ideas
* How easy is it to start using API?
    * Time to first hello world (TTFHW) is a key metric
    * Great starting experience: swagger-ui, GraphQL
* Each endpoint should have small amount of parameters
    * Good examples - get all countries (no parameters), search by id (1 parameter)
* Expose atomic operations (client can combine them to build complex ones)
* Create use cases and design API with them in mind
* Pick API tech and data format
* The product needs to be easily accessible
    * Quick and easy auth mechanism (or none at all), examples, great documentation
* Reduce cognitive load for your users
    * Consistent naming and code patterns
    * Introduce as few new concepts as possible (mental models)
    * Automate what can be automated
* Provide helpful feedback to your users
    * Catch user errors early and anticipate common mistakes
    * Provide detailed feedback messages upon user error, possibly with hints now to fix error
    * Have a place where users can ask questions
