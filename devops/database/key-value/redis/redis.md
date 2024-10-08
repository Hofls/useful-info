#### Info
* Redis - in-memory key value store (e.g. cache, sessions)
* Other use cases: [messaging (pub/sub)](../../../message-broker/redis/redis.md)

#### Getting started. CLI
* `docker run --name some-redis -p 6379:6379 --detach redis:6.2.6`
* `docker exec -it some-redis bash`
    * `redis-cli`
    * `SET greeting "hello"`
    * `GET greeting`
    * `KEYS *`
    * `EXPIRE greeting 5` (wait for 5 seconds, try GET again)

#### Getting started. GUI
* Prerequisite: Redis installed on server, accessible via `http://YOUR_SERVER_IP:6379`
* Install and run [RedisInsight](https://redis.com/redis-enterprise/redis-insight/#insight-form)
* `ADD REDIS DATABASE` -> Fill IP, Port 6379, Any DB name
* Features:
    * Key/Value - CRUD
    * CLI, Profiler, Command helper, Performance metrics
