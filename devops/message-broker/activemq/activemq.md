#### Info
* ActiveMQ - message broker
* Destinations - Messages are sent to either queues (point-to-point) or topics (publish-subscribe)
* Producers - Applications that send messages to destinations
* Consumers - Applications that receive messages from destinations
* Queues - Messages are delivered to one consumer (point-to-point)
* Topics - Messages are broadcast to all subscribed consumers (pub-sub)
* Message Types - Supports text, binary, object, and streaming messages
* Persistence - Messages can be stored (e.g., in a database or file) to ensure delivery even if the broker restarts
* JMS (Java Message Service) - ActiveMQ follows JMS standards, making it interoperable with Java applications
* Protocols - Supports AMQP, MQTT, STOMP, and OpenWire for flexibility
* Acknowledgements - Ensures reliable delivery with message acknowledgments

#### Getting started. GUI
* `docker run --publish 61616:61616 --publish 8161:8161 --detach rmohr/activemq:5.15.9`
* Open in browser `http://YOUR_SERVER_IP:8161/admin`
    * Warning! Web UI has basic auth (modern browsers cant really handle it, use incognito mode)
    * Credentials - admin/admin
* Features:
    * Queues, Topics, Subscribers, Connections, Network, Send message
