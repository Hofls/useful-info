### What its all about
There are 2 hard problems in computer science: cache invalidation, `naming things`, and off-by-1 errors

### Rules
* Search for existing names in project and reuse them. If not found - introduce a new name
* Use domain specific names (Trees - parent, node, child; Events - subscribe, notify)
* Do not invent your own names (Nanny, Rain, Fridge), only use widely accepted ones
* Look at popular frameworks/libraries in your language, use names from them

### Class names
* No need for introduction:
    * Storage, Filter, Handler, Listener, Provider, Generator, Scanner, Validator, Analyzer
    * Formatter, Parser, Extractor, Service, Manager, Processor, Handler, Converter, Provider, Tracker
    * Mapper, Filler
* Based on [OOP patterns](https://github.com/Hofls/design-patterns):
    * `Behavioral` - Chain, Command, Iterator, Mediator, Memento, Observer
    * `Creational` - Factory, Builder, Pool, Singleton
    * `Structural` - Adapter, Wrapper, Decorator, Proxy
* `Builder` - construct complex objects step by step
* `Utils` `Helper` - collection of static methods
* `Controller` - rest/soap endpoints
* `Repository` - access to data sources

### Method names
* No need for introduction:
    * get, set, create, add, remove, write, initialize, find, convert, update, validate, accept, check
    * should, load, generate, clear, process, reset, parse, clone, register, run, compute, increase

### Entity names
* Just name, without any postfixes (User, Company, Address)
* `Dto` `Data` `Info` - object with data, that does nothing
* `Entity` `Model` - database object
* `Request` `Response` - rest/soap
* `Metadata`
* `Specification`
* No need for introduction:
    * Options, Config, Lite
