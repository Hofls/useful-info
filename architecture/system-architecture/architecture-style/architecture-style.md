#### Styles comparison
| Architecture style         | Division (Dependency management)                                                 | Use case (Domain type)                                           |
|----------------------------|----------------------------------------------------------------------------------|------------------------------------------------------------------|
| N-tier                     | Horizontal tiers divided by subnet                                               | Traditional business domain. Frequency of updates is low.        |
| Web-Queue-Worker           | Front and backend jobs, decoupled by async messaging.                            | Relatively simple domain with some resource intensive tasks.     |
| Microservices              | Vertically (functionally) decomposed services that call each other through APIs. | Complicated domain. Frequent updates.                            |
| Event-driven architecture. | Producer/consumer. Independent view per sub-system.                              | IoT and real-time systems                                        |
| Big data                   | Divide a huge dataset into small chunks. Parallel processing on local datasets.  | Batch and real-time data analysis. Predictive analysis using ML. |
| Big compute                | Data allocation to thousands of cores.                                           | Compute intensive domains such as simulation.                    |

#### How to pick style
* `Domain fit` (look at Styles comparison)
* `Complexity` level of the architecture should be justified for your domain
* `Manageability` ease of managing app, deploying updates, monitoring, etc
* `Inter-service communication` - is latency between services acceptable? (e.g. microservices communicate via network)
