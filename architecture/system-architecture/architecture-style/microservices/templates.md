### Auth
* 1 auth service, returns token (jwt?), stores it in Redis
* Frontend sends token with each request to microservices
* Microservice checks token in redis
