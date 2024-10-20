### TLDR
* `Building Secure & Reliable Systems` - Best practices used in Google

### Ideas
* `Security` Vs `Reliability` - "Main threat is malicious adversary" Vs "Main threat is random accidents"
* `Security` and `Reliability`
  * Require ongoing effort and testing throughout entire system lifecycle (e.g. call endpoints without token each hour, expected response code - 403)
  * Invisible if everything goes well, people tend to neglect them (but cost neglect can be severe)
* `CIA triad`:
  * `Confidentiality` - access to the sensitive information should be authorized
  * `Integrity` - data should be accurate and consistent (e.g. compare checksum/hash)
  * `Availability` - system is accessible (e.g. high system uptime)
* `Assessment` - use risk-based approaches to estimate costs of negative events and costs of preventing them (if prevention is cheaper - do it)
  * `Adversarial testing` - simulated attacks to evaluate system's security

* `Simplicity` - reduces attack surface, decreases amount of bugs, makes it easy to comprehend and reason about the system
* `Defense in depth` - application of multiple different defense mechanisms
* `Canary reelase` / `Slow rollout` - deploy new version to small subset of users
* Maintain checklists, playbooks, and protocols to be prepared for failure/crisis
* `Red Team` / `Penetration tester` - attack system to find and report security problems
* `Bug bounty` program - provides incentives for white hat hackers outside the org to take a look at the system

* `Least privilege` - employees should have just enough privileges to do their job (e.g. to limit damage if employee goes rogue)
* `Zero trust` - don't trust requests coming from inside, always verify/authorize
* `Multi-party authorization` - require input from multiple people to commit serious actions (now 1 compromised account can't do anything)
* `Business justifications` - employees should provide reason for accessing sensitive data/systems
* `Auditing and detection` - review all activity in the system (e.g. via logs)
* `Recoverability` - ability to recover systems after a destructive action (e.g. recover DB from backup)
