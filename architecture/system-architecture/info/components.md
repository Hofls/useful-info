#### Components
* `Message Queue (MQ)`
    * Advantages: 
        * Guaranteed delivery (if system is down - messages just sit and wait) 
        * Limits load (systems can process messages at their own tempo)
        * Decoupling (system that sends messages to the queue don't know who consumes it)
    * Disadvantages:
        * Complexity
* `Database`
    * For more info, look at `devops` repo
* `In-memory data store` (as cache)
* `Content delivery network (CDN)`
* `Reverse proxy`
    * Functions: caching, filtering, load balancing, authentication, logging
    * Almost the same thing: `Load balancer`, `API Gateway`
* `Web Application Firewall`
* `File storage` - e.g. Minio, S3, NFS, Database
* `Cache` - Client / CDN / Reverse proxy / Database / Application (e.g. redis)

#### Comparison
* `Managed > Your own`
    * Your own = high complexity, time-consuming (e.g. install, support, update)
    * Managed examples: managed grafana/k8s/prometheus/docker/elk...
