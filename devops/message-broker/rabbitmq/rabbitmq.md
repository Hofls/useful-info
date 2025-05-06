#### Info
* RabbitMQ - message broker
* Queues - Messages are stored in queues, waiting for consumers to process them
* Producers - Applications that send messages to RabbitMQ
* Consumers - Applications that receive messages from queues
* Exchanges - Producers send messages to exchanges, which route them to queues based on rules (bindings)
* Exchange Types
  * Direct - Routes messages to queues based on an exact routing key match
  * Topic - Routes messages using pattern-based routing keys (e.g., “logs.*”)
  * Fanout - Broadcasts messages to all bound queues
  * Headers - Routes based on message headers
* Bindings - Rules that connect exchanges to queues
* Acknowledgements - Consumers can acknowledge messages to confirm processing, ensuring reliability
* Durability - Queues and messages can be marked durable to survive broker restarts

#### Getting started. CLI
* `docker run --name some-rabbit -p 5672:5672 -p 15672:15672 --detach rabbitmq:3.9`
* `docker exec -it some-rabbit bash`
    * `rabbitmqctl help`
    * `rabbitmq-diagnostics help`
    * `rabbitmq-plugins help`

#### Getting started. GUI
* Prerequisite: RabbitMQ installed on server
* `docker exec -it some-rabbit bash`
    * `rabbitmq-plugins enable rabbitmq_management`
    * `rabbitmqctl add_user hofls qwerty`
    * `rabbitmqctl set_user_tags hofls administrator`
* Open in browser `http://YOUR_SERVER_IP:15672`
* Features:
    * Connections, Channels, Exchanges, Queues, Admin
