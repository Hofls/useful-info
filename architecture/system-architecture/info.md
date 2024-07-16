* `CAP theorem` - it is impossible for a distributed data store to simultaneously provide more than two guarantees (CP or AP): 
    * `Consistency` - Every read receives the most recent write or an error
    * `Availability` - Every request receives a (non-error) response, without the guarantee that it contains the most recent version of the information
    * `Partition tolerance` - The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes
    * NoSQL = AP, SQL = CP
* `PACELC theorem` - in case of network partitioning (P) one has to choose between availability (A) and consistency (C) (as per the CAP theorem), 
but else (E), even when the system is running normally in the absence of partitions, one has to choose between latency (L) and consistency (C).
* `Jamstack`:
    * An entire frontend is prebuilt into highly optimized static pages and assets
    * Frontend served directly from a CDN, reducing the cost, complexity and risk
    * Use JavaScript to talk to backend services
    * Use 3rd party APIs to outsource backend features like auth, payments, content management, search...
    * If you need to implement your own backend - use serverless functions
* `Latency` - amount of time it takes for a system to respond to a request
* `Throughput` - number of requests that a system can handle at the same time
* `Consistency Patterns`:
    * `Weak Consistency` - read may not see the recent write (high availability, low latency)
    * `Eventual Consistency` - read will eventually see the recent write (high availability, high integrity)
    * `Strong Consistency` - read immediately sees recent write (high data integrity)
* `Fail-Over` - system can continue to function in the event of a failure (one pod fails, others go on)
* `Replication` - copy of data stored in different locations (one db fails, others go on)
