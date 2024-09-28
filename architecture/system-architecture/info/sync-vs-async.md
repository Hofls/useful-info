# Sync vs Async

#### Synchronous communication
* Synchronous - blocking communication (waits for response)
    * E.g. Rest, GraphQL
* Use cases:
    * The operation is a simple query which does not change any state
        * e.g. user opened a product list
    * The operation result needed to move forward in the current process
        * e.g. bff gathers data from 4 services, sends result to frontend
    * The operation can fail and does not require a complex retry mechanism

#### Asynchronous communication
* Asynchronous - non-blocking communication (throw in a request and forget about it)
    * E.g. ActiveMQ, Kafka
* Use cases:
    * The operation involves multiple services reacting to it
        * e.g. something happened, 5 different services need to know about it
    * The operation cannot fail or need a retry mechanism
        * e.g. even if service is down right now - should process the queue when it gets up
    * The operation takes a lot of time
* Implementation advices:
    * When interacting with other systems asynchronously, the client must generate an unique ID \
        Situation - client sent a request to create, but did not receive a response from server yet (maybe response will never come) \
        If the server generates an ID - client can't send request again, because the server may create duplicates with different IDs \
        If the client generates an ID - client can send again, the server will create only 1 document with this ID \
    * 
