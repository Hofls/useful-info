### TLDR
* `Site Reliability Engineering` - How Google runs production systems

### Ideas
* "Site" in "SRE" is a misnomer, actually it's not limited to websites, applies to any software/service 
* Software engineering focuses only on a part of software lifecycle (designing and building)
* SRE focuses on the whole lifecycle - inception, deployment and operation, refinement and eventual decommissioning
* Always aim to `just enough`, do not waste resources chasing diminishing returns
* SRE falls under Devops umbrella, with focus on reliability and scalability
* Main responsibilities - availability, latency, performance, efficiency, change management, monitoring, emergency response, and capacity planning
* `Blame-free postmortem` is necessary to find root cause of a failure and prevent it from happening again
* Keep track of a system’s health, availability and performance with `Monitoring`
* If something goes seriously wrong - send `Alerts`
* `Logging` - store information for diagnostic or forensic purposes
* `MTTR` - Mean time to repair (e.g. on average it takes 5 minute to fix the service)
* `MTBF` - Mean Time Between Failures (e.g. on average 1 failure per week)
* On-call `Playbook` - description of typical problems and solutions (used by on-call engineer to fix the system)
* Most outages happen because of changes in a live system, fixes - Progressive rollout or Rollback
* `Capacity planning` - make sure system has enough resources to handle growth (e.g. influx of new users during marketing campaign)
* Automate everything (e.g. infrastructure, monitoring, scaling, recovery)
* Extreme reliability comes at a cost of high complexity, high cost and slow development

* Use intuition, experience, and an understanding of what users want, to define most important metrics - `SLA`, `SLO` and `SLI`
* `Availability` - Can system respond to the request?
* `Latency` - How long did it take to respond?
* `Throughput` - How many requests could be handled?
* `Durability` - Will data persist in the system despite failures? 
* `Correctness` - Is the answer right?

* `Toil` - work related to running a production service that tends to be manual, repetitive, automatable, tactical, devoid of enduring value. Minimize toil
* `Engineering` - novel/creative work, requires human judgement, produces a permanent improvement to service. Maximize engineering
* If a human operator needs to touch your system during normal operations, you have a bug (better automate it)
* 