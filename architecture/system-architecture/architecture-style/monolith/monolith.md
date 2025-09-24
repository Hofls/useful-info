# Monolithic architecture

* `Monolith` - all the application code is in one project, which produces single executable (e.g. shop.jar)
* `Modular monolith` - code is organized into modules (e.g. instead of creating 20 microservices, create 20 modules/folders within monolith)
* Example:
    * News site page with weather broadcast, exchange rates, most popular news articles, feedback form
    * All of those located in same backend service
* This approach works great for small applications, because of its simplicity
    * It is simple to develop/test/deploy/scale (run multiple copies behind load balancer)
* As a rule of thumb - always start with monolith, if problems arise - move some features into new service
* Once the application becomes large and the team grows in size, number of drawbacks show their face:
    * It is difficult to work with huge code base, IDE is overloaded
    * App start time is becoming too slow, same as linters/prettifiers/tests/IDE
    * Problems in code affect entire application (e.g. leaking memory)
    * Impossible scale each component independently (e.g. if one component got hit with a lot of requests)
    * It is hard to assign different components to different teams
    * Requires sticking to one technology stack
* `Distributed Monolith` - Anti pattern, botched combination of monolith and microservices
  * If one service breaks - entire system stops working
  * All services must be deployed/scaled together
  * Different services use same database schema
  * Only synchronous communication (even when async makes sense, e.g. guarantee delivery with kafka/rabbit)
  * Services are heavily coupled and dependent (to implement a new feature you need to edit multiple microservices)
