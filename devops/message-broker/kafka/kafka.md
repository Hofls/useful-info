#### Info
* Kafka - event streaming platform (publish/subscribe)
* Topics - Data is organized into topics (like categories or channels). Producers send messages to topics, and consumers read from them
* Partitions - Topics are split into partitions for scalability and parallelism. Each partition is an ordered log of messages
* Brokers - Kafka runs as a cluster of servers (brokers) that store and manage data
* Producers - Applications that send messages to Kafka topics
* Consumers - Applications that read messages from Kafka topics
* Consumer Groups - Consumers can group together to share work. Each partition is consumed by one consumer in the group
* Replication - Partitions are replicated across brokers for fault tolerance
* Offsets - Each message in a partition has a unique offset (like an index) to track consumer progress
* Retention - Kafka retains messages for a configurable time (or size limit), allowing consumers to replay or catch up

#### Install locally (Docker)
* Run ZooKeeper:
  ```
  docker run --name some-zookeeper -p 2181:2181 --detach \
    -e ZOOKEEPER_CLIENT_PORT=2181 \
    -e ZOOKEEPER_TICK_TIME=2000 \
    confluentinc/cp-zookeeper:7.3.0
  ```
* Run Kafka:
  ```
  docker run --name some-kafka -p 9092:9092 --detach \
    -e KAFKA_ZOOKEEPER_CONNECT=host.docker.internal:2181 \
    -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
    -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
    confluentinc/cp-kafka:7.3.0
  ```
* To check if its working correctly:
  * [kafka-gui.md](kafka-gui.md) 
  * `kafka/hello-world` project in `java-dependencies` repo

#### Install on kubernetes
* Install kafka & zookeeper:
  * `OpenLens` -> `Pods` -> `Create resource` -> [insert text](yaml/kafka-k8s.yaml)
* Install kafka-ui:
  * `OpenLens` -> `Pods` -> `Create resource` -> [insert text](yaml/kafka-ui-full.yaml)
* Test:
  * Create topic, produce message, look at messages list

#### Install directly on a server
* Install Java:
    * `apt update && apt install default-jre`
    * `java --version` (should be 8+)
* Install & run Kafka:
    * `wget https://dlcdn.apache.org/kafka/3.1.0/kafka_2.13-3.1.0.tgz`
    * `cd kafka_2.13-3.1.0`
    * `nohup bin/zookeeper-server-start.sh config/zookeeper.properties &`
    * `nohup bin/kafka-server-start.sh config/server.properties &`
* Create topic:
    * `bin/kafka-topics.sh --create --topic quickstart-topic --bootstrap-server localhost:9092`
    * `bin/kafka-topics.sh --describe --topic quickstart-topic --bootstrap-server localhost:9092`
* Write events:
    * ```
      bin/kafka-console-producer.sh --topic quickstart-topic --bootstrap-server localhost:9092
      First event!
      Second event.
      ```
* Read events:
    * `bin/kafka-console-consumer.sh --topic quickstart-topic --from-beginning --bootstrap-server localhost:9092`
* To read/write events with client - look at `java-dependencies` repository

#### Getting started. GUI
* Use [kafka-ui](kafka-gui.md)

#### Problems
* Unable to connect to `kafka:9092` (docker)
    * Fix - set parameter `KAFKA_CFG_ADVERTISED_LISTENERS: CLIENT://kafka:9092,EXTERNAL://localhost:9094`
