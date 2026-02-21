### Other architecture styles
* `Microfrontends` - same idea as microservices but for frontend (1 team = 1 microfrontend) [diagram](microfrontends.png)
* `Peer-to-peer` / `P2P` - peers communicate and share resources directly with one another
  * Decentralized, each peer acts as a client and server at the same time
  * Examples - BitTorrent, Bitcoin
* `Microkernel` - small core with essential functions, all other functions are plugins
* `Broker architecture` - central broker manages communication between services
* `Pipes and Filters` - [diagram](pipes-and-filters.png)
  * Filters process input and produce output
  * Pipes responsible for data flow between filters
  * Simplest example - `cat phone_numbers.txt | grep 808 | wc -l`
* `Zero trust architecture` - every request is authenticated, authorized, and validated
* `Data Fabric` - single point of access to all the different data sources
  * Fabric means "connective tissue" that connects and harmonizes data across the enterprise
  * This enables:
    * Data analysts to run complex queries across multiple systems
    * Developers to build applications that leverage unified data
    * Data governance teams to enforce compliance and security policies across the entire data landscape
* `Big ball of mud` - no rules, everything goes
  * Advantages - short-term boost to development speed
  * Disadvantages - everything related to long-term
* `Web-queue` - Simple domain, long running jobs, batch operations ![diagram](web-queue.png)