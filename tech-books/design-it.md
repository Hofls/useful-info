### TLDR
* `Design It!` - Upgrade from programmer to architect
* For more info [click here](../architecture)
* Architect responsibilities:
  * Work with stakeholders (e.g. product managers) to define business goals and requirements for the software
  * Design architecture, select technologies
* `Quality attributes` - used to evaluate quality of a system (e.g. accessibility, scalability, simplicity)
* Every decision is a trade-off (e.g. increase complexity to improve performance)
* `Design thinking principles`:
  * Design for humans (stakeholders, developers, users) \
    Respectfully collaborate with people, listen, assume positive intent, use human-centered design methods
  * Keep design open (e.g. draw "message queue" instead of "rabbitmq")
  * All design is redesign. Never start from scratch, always take heavy inspiration from existing (public) designs
  * Make architecture tangible (draw it, build prototypes, provide explanations)
* Design mindsets (stages):
  * Understand the problem (extract information from people)
  * Explore ideas (brainstorm, create multiple design concepts)
  * Make it tangible
  * Evaluate (e.g. walk through a piece of the architecture with different scenarios)
* Design everything upfront or let design emerge during implementation? Usually best approach is in the middle
  * Big systems require a lot of upfront design. Small systems can cruise on emergent architecture
* To make a good design - experiment, reduce risks, simplify, quickly iterate
* Ways to deal with risk - Reduce probability / Reduce impact / Accept and do nothing
* `ARS` / `Architecturally significant requirement` - requirement that has big influence on architecture \
  Architect should discover them and adapt architecture
* `Functional requirement` - describes desired behavior of the system (everything else is non-functional requirement) \
  Often captured as use cases / user stories
* Quantify system characteristics (e.g. 99.9% uptime, handle up to 50k concurrent users, build reports in less than 5 seconds)
* If 1 small feature significantly increases complexity and requires drastic changes to architecture \
  Make sure that stakeholders know about it, good chance they could live without the feature
* 


### Examples
* Arrow labels can improve diagram clarity - [click](images/design-it/arrows-with-labels.png)
* Document all the data relevant to architecture development - [click](images/design-it/architecture-workbook.png)