## Services:
#### Compute
* `Virtual Machines`
* `Functions` - FaaS, serverless (runs code in response to events, idle time is free)
* `App Service` - PaaS (run backend in fully managed environment)
* `Kubernetes services` - managed kubernetes
* `Service Fabric` - distributed systems platform (runs on premises and on cloud)
* `Container Instances` - fastest way to run container on Azure
* `Batch` - big compute
* `Hosts` - dedicated physical servers
* `Marketplace` - ready to run solutions (e.g. grafana, postgres)

#### Network
* Load balancer:
    * `Front Door` - ingress point for traffic (Edge)
    * `Application Gateway` - OSI Layer 7. Application (Load balancer for http/https)
    * `Load Balancer` - OSI Layer 4. Transport (TCP/UDP, doesn't work with http/https)
    * `Traffic manager` - DNS based traffic load balancer
* `Web Application Firewall` - restricts inbound traffic, protects against OWASP vulnerabilities (OSI Layer 7. Application)
* `Firewall` - restricts outbound traffic (OSI Layer 4. Transport)
* `DNS` - your domain on Azure DNS (converts domain name to IP address)

#### Databases
* SQL DB:
    * `SQL Database` - relational database-as-a-service (based on Microsoft SQL Server)
    * `Database for PostgreSQL` / `Database for MySQL` / `Database for MariaDB`
* `Cosmos DB` - fully managed NoSQL DB
    * APis - `MongoDB`, `Cassandra`, `Gremlin` 
* `Cache for Redis` - in-memory data store

#### Storage
* `Blob Storage` - REST-based object storage for unstructured data
* `Archive Storage` - for rarely accessed data
* `Queue Storage` - stores large numbers of queue messages that can be accessed by an application

#### Security
* `Active directory` - identities platform, single sign-on
* `Key Vault` - secrets/keys storage (e.g. store database connection string)
* `Defender` - detects unusual and potentially harmful activity (AU based)

#### DevOps
* `DevOps` - CI/CD pipelines (build, test, deploy), git repos, package repository
* `Resource Manager templates` - infrastructure as code
* `Monitor` - logging, monitoring, and alerting for applications
* `Pipelines` - CI/CD

#### Web
* `API Management` - publishing, routing, securing, logging, and analytics of APIs
* 
* 

#### AI
* `Cognitive Services` - Vision, Language, Speech, Decisions, Search
* `Form Recognizer` - Extracts text and structure from your forms (e.g. photo of page)
* `Face` - Identify faces on photos
* `Personalizer` - delivers a personalized UX for every user

#### Analytics
* `HDInsight` - Managed Hadoop, Spark, Hive, Kafka (big data, mapreduce, distributed computing)
* 
* 
