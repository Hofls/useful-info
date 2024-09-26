### TLDR
* `Design It!` - Upgrade from programmer to architect
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

### Examples
* Arrow labels can improve diagram clarity - [click](images/design-it/arrows-with-labels.png)