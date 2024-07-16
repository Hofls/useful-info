## Services:
#### Compute
* `EC2` (Elastic Compute Cloud) - Virtual private servers (VPS)
    * `EC2 Spot Instances` - huge discount, but EC2 can reclaim the capacity at any moment. Anything you run here - should be fault-tolerant
    * `EBS` (Elastic Block Store) - Storage for EC2
    * `AMI` (Amazon Machine Images) - OS + installed software
    * `CLB` (Classic Load Balancing) - distributes incoming application traffic across multiple targets (e.g. EC2 instances), performs health checks
        * Old name - `ELB` (Elastic Load Balancing)
* `Elastic Beanstalk` (`PaaS`, runs on `EC2`) - installed runtime, configured reverse proxy (80 -> 8080), load balancer, monitoring
* `Lambda` (FaaS)- takes care of everything required to run and scale your code (runs code in response to events, idle time is free)
    * `Step Functions` - sequence `Lambda` functions, output of one step is input to the next step.
* `Amplify` - hosting for fullstack SPA with CI/CD
* `ECS` (Elastic Container Service) - containers orchestration, simple version of `EKS`
    * `AWS Copilot` - sets up `ECS` for you
    * `Fargate` - Serverless compute for containers
* `EKS` (Elastic Kubernetes Service) - Kubernetes as a Service, complex and flexible version of `ECS`
* `App Runner` -  takes a container and gives you an endpoint for it
    * Handles load balancing, autoscaling, and other operations automatically
* `Lightsail` - Servers with sane defaults, fixed price per month
* `Batch` - Batch jobs (scheduled, without user interaction)
#### Storage
* `S3` (Simple Storage Service) - File storage
    * `S3 Glacier` - low cost file storage with very slow retrieval (3-5 hours). Good for archival purposes
* `RDS` (Relational Database Service) - Set up, operate, and scale a relational database (Postgres/MySQL)
    * `Aurora` - fully managed alternative (you don't have to admin it)
    * `Aurora Serverless` - only runs when you need it, like Lambda (for bursty workloads that spike frequently)
* `DynamoDB` - Key-value storage (NoSQL)
    * `DocumentDB` - same thing, but with more complexity/control
* `Elasticache` - in-memory data store (Memcached/Redis)
#### Devops
* `CloudFormation` - Infrastructure as Code (declarative, high level of abstraction)
    * `Quick Starts` - gold-standard deployment templates
    * Alternatives:
        * `CDK` (Cloud Development Kit) - write code that will manage infrastructure (produces CloudFormation templates)
        * `CLI` - imperative, low level of abstraction
        * `Terraform`
* `OpsWorks` - use code to automate the configurations of your `EC2` servers (via Chef/Puppet)
* `Marketplace` - pre-packaged images with installed software (e.g. SonarQube, Grafana)
* `CloudWatch` - Application and Infrastructure Monitoring (Logs, Metrics, Alarms, Dashboards, KPIs)
* `CloudTrail` - monitor actions across your AWS infrastructure (e.g. who created that `EC2` instance? who deleted DB?)
* `CodeCommit` - hosted version control (github/gitlab)
* `CodeDeploy` - deploy code from git to `EC2` instances
* `CodePipeline` - CI/CD (CircleCI, Travis)
* `Managed services` - Prometheus, Grafana
* `Systems Manager` - automating operations across a fleet of machines (e.g. install/update software)
* `Protons` - build reusable templates that developers can use to deploy their services
#### Networking
* `Route 53` - DNS + Domains
* `CloudFront` - CDN (Content Delivery Network)
* `VPC` (Virtual Private Cloud) - logical network which you can provision resources into
    * Your resources may interact via LAN, which is faster and safer than internet
* `API Gateway` - front door for service APIs. Provides versioning, routing, rate limiting, API keys.
    * Works with Lambda, Elastic Beanstalk, EC2
* `ALB` (Application Load Balancer) - (OSI Layer 7. Application)
* `NLB` (Network Load Balancer) - OSI Layer 4. Transport (TCP/UDP, doesn't work with http/https)
#### Analytics
* `AWS Cost Explorer` - Visualize, understand, and manage your AWS costs and usage
* `AWS Cost & Usage Report` - In depth AWS costs and usage
* `Trusted Advisor` - scans AWS infrastructure, compares it to best practices, and provides recommendations
#### Messages
* `SQS` (Simple Queue Service) - Message queue (RabbitMQ)
* `SNS` (Simple Notifications Service) - send notifications to subscribers (e.g. via email/sms/http)
#### Security, identity
* `IAM` (Identity and Access Management) - AWS Account management (users, groups, permissions)
    * `ARN` (Amazon Resource Names) - identifiers for resources
* `KMS` (Key Management Service) - create, store, audit usage of cryptographic keys
* `Cognito` - Add Sign-up/Sign-in functionality to the app
* `Inspector` - security audit for `EC2` instances
* `WAF` (Web Application Firewall) - Blocks incoming requests, based on rules (e.g. by ip, by content)
    * Stands in front of API Gateway/ELB/CloudFront
* `Shield` - DDoS protection. `Route53`/`CloudFront` -> `Shield` -> `VPC`
* `GuardDuty` - IDS/IPS (Intrusion Detection System / Intrusion Protection System)
    * e.g. detects when somebody bruteforces password for your `EC2` instance
#### Cost management
* `Budgets` - Before costs incurred. Alerts, limits, forecasting
* `Cost Explorer` - After costs incurred. Reports, visualization
* `Pricing Calculator` - Estimate the cost for your architecture solution
* `Resource Groups` - check all your resources (EC2 instances, Lambda functions, DynamoDB tables etc)
#### Development
* `AppSync` - creates GraphQL API in front of backend sources
* `Cloud9` - Online IDE
* `Honeycode` - Create apps without programming
* `SDK` - Access AWS services from your app (e.g. write data to DynamoDB)


## Good learning resources:
* [Open Guide](https://github.com/open-guides/og-aws)
* 
* 