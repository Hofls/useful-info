### Info
* Design Pattern - typical solutions to commonly occurring problems
* Implementation examples located at `java-dependencies` repository

### Behavioral patterns
* `Chain of responsibility` - pass requests along a chain of handlers
    * Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain
    * Example - new NegativeProcessor(), new ZeroProcessor(), new PositiveProcessor()
* `Command` - Turns a request into a stand-alone object that contains all information about the request
    * This transformation lets you parameterize methods with different requests, delay or queue a request's execution, and support undoable operations
    * Example - new RenameCommand(file), new CopyCommand(file), new DeleteCommand(file)
* `Iterator` - traverse elements of a collection without exposing its underlying representation
    * Example - while (iterator.hasNext()) { var element = iterator.next() }
* `Mediator` - restricts direct communications between the objects and forces them to collaborate only via a mediator object
    * Example - new Producer(mediator), new Consumer(mediator)
* `Memento` - save and restore the previous state of an object
    * Example - history.addState(state); var state = history.pollPrevious()
* `Null object` - prevents NPEs by providing object that does nothing
    * Example - new ClassicWriter(), new NullWriter()
* `Observer` - subscription mechanism to notify listeners about events that happen to the object they're observing
    * Example - manager.addListener(sub); manager.notify("New video is out!");
* `State` - alters object behavior when its state changes
    * Example - press "space" while video is playing - it stops. press again, video starts playing
* `Strategy` - defines family of algorithms, puts each of them into a separate class, and make their objects interchangeable
    * new Classes.QuickSorting(), new Classes.SlowSorting()
* `Template method`
    * Defines the skeleton of an algorithm in the superclass 
    * Lets subclasses override specific steps of the algorithm without changing its structure
* `Visitor` - separates algorithms from the objects on which they operate
    * It allows adding new operations to existing object structures without modifying them

### Creational patterns
* `Abstract factory` - produces families of related objects
    * Abstract factory is an object that has multiple factory methods on it
    * Pattern is similar to Factory Method, but with emphasis on families of objects
    * Example - buildUI(new WindowsFactory()); buildUI(new LinuxFactory());
* `Builder` - constructs complex objects step by step
    * Recognizeable by creational methods returning the instance itself
    * Example - builder.addHeader(x).addBody(y).addFooter(z):
* `Dependency injection` - one object supplies the dependencies of another object. Based on "Inversion Of Control"
    * Example - new spamBot(rotatingClient); new spamBot(fastClient);
* `Factory Method` - method for producing object
    * Pattern is similar to Abstract Factory, but without emphasis on families of objects
    * Example - pngReader.decodeImage(img); svgReader.decodeImage(img);
* `Lazy initialization` - delaying object creation until the first time it is needed
* `Object Pool` - usable when cost of creating object is high
    * Example - con = pool.acquireConnection(); pool.releaseConnection(con);
* `Prototype` aka `Clone` - lets you copy existing objects
    * Example - SerializationUtils.clone(new Long("23"));
* `Singleton` - makes sure class has only a single instance

### Structural patterns
* `Adapter` - allows objects with incompatible interfaces to collaborate
    * Useful when you can't change object interface (e.g. it comes as external dependency)
    * rechargeUsbPhone(android); rechargeUsbPhone(lightningToUsb(iphone));
* `Bridge` - separates an object's interface from its implementation
    * Usually designed up-front, letting you develop parts of an application independently of each other
    * Example - document interface with a bunch of implementations; documentProcessor interface with a bunch of implementations
* `Composite` - compose objects into tree structures of simple and composite objects
    * Example - directory.addElement(file); directory.addElement(anotherDirectory);
* `Decorator` aka `Wrapper` - allows you to add new behavior to objects dynamically
    * Example - decorator.addProcessor(compressionProcessor); decorator.addProcessor(encryptionProcessor); decorator.process("Some text")
* `Delegation` - object handles a request by delegating to another object
* `Facade` - simplified interface to a complex set of classes
* `Flyweight` - shares common parts of state between multiple objects instead of keeping all the data in each object
* `Marker` - declares metadata about class. Marker is outdated, better use annotations
    * Example - class Dto implements Serializable, Cloneable, Remote
* `Proxy` - object representing another object
    * Controls access to the original object, allowing you to perform something either before or after the request gets through to the original object

### Other patterns