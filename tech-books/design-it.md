### TLDR
* `Design It!` - Upgrade from programmer to architect
* For more info [click here](../architecture)
* Architect responsibilities:
  * Work with stakeholders (e.g. product managers) to define business goals and requirements for the software
  * Design architecture, select technologies
* Usually architect is not a separate role, but rather a part of developer responsibilities
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
* `Constraints` - unchangeable limitations
* Quantify system characteristics (e.g. 99.9% uptime, handle up to 50k concurrent users, build reports in less than 5 seconds)
* If 1 small feature significantly increases complexity and requires drastic changes to architecture \
  Make sure that stakeholders know about it, good chance they could live without the feature
* Human brains are very limited, there is a finite amount of information we can keep in our heads at any given time
  * Fix №1 - turn problem solving into a massively parallel operation by collaborating with other humans
  * Fix №2 - create new, abstract concepts to represent chunks of knowledge (hide details)
* Names are important, everybody should use the same vocabulary when discussing the project / creating architecture / writing code
* `Functionality-oriented modules` - all classes required to complete a functional area are contained within a single package
* `Sketch` - fast-to-create, imprecise model that favors communication over analysis
* `Viewpoint` shows architecture from different POV
  * E.g. to show performance bottlenecks - draw information flow, color-code components based on execution time
* Good diagrams always have legend and text hints
* `SAD` / `Software Architecture Descrption` - contains all the information about architecture (views, quality attributes, requirements etc)
* `ADR` / `Architecture Decision Record` - explanation of every important architectural decision
* `ATAM` / `Architecture Trade-off Analysis Method` - architecture evaluation and risk mitigation process (usable for very complex systems)
* "Mid architect" vs "Great architect":
  * "Select patterns and technology without input" vs "Collaboratively select with input from the team"
  * "Write documents by yourself, release on completion" vs "Incrementally build and review documents with the team"
  * "Make or approve all design decisions" vs "Delegate decision making, provide guidance, reviews and feedback"
  * "Dictate who builds specific elements" vs "Help the group self-organize and choose work"
  * "Avoid changes to the architecture" vs "Embrace the inevitability of change and make the architecture easy to change"
  * "Mandate technology decisions" vs "Build consensus for technology decisions"
* Constructive feedback is important for growth, always welcome it and be kind

### Examples
* Arrow labels can improve diagram clarity - [click](images/design-it/arrows-with-labels.png)
* Document all the data relevant to architecture development - [click](images/design-it/architecture-workbook.png)
* Good diagram example - [click](images/design-it/good-diagram.png)