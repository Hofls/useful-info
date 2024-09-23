* `n-tier` divides an app into logical layers and physical tiers (e.g. web, business, data) or (infrastructure, application, domain)
  * Also known as `Layered architecture`
* `Closed/Open`
  * `Closed` layer architecture - layer can only call the next layer immediately down
  * `Open` layer architecture - layer can call any of the layers below it
* `Centralized/Distributed`
  * `Monolithic/Centralized` layered architecture - all layers are in the same executable
  * `Microservices/Distributed` layered architecture - layers are in different executables, communicating over a network
* Example
> ![](n-tier.png)
