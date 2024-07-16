### Quick overview
* Generic cloud computing platforms
    * AWS, Azure, GCP, DigitalOcean, Alibaba, Yandex
* Provides environment to run apps
    * Heroku
* Backend as a service
    * Firebase
* Hosting for static/serverless web apps
    * Netlify, Vercel
* Run your own cloud on your hardware
    * VMware vSphere

### Cloud
* `Cloud computing` - on-demand delivery of IT resources over the Internet (e.g. computing power, data storage)
    * The main enabling technology for cloud computing is `virtualization` (separates a physical device from virtual devices)
* Types of computing:
    * `On premises` - you manage everything
    * `IaaS` (Infrastructure as a Service) - service manages networking, storage, servers, virtualization
        * AWS, DigitalOcean, Azure, GCE, Alibaba Cloud
    * `PaaS` (Platform as a Service) - IaaS + service manages OS, middleware, runtime
        * AWS Elastic Beanstalk, Heroku
    * `SaaS` (Software as a Service) - PaaS + service manages data and application (service manages everything)
        * Dropbox, Salesforce
    * `FaaS` (Function as a Service), aka Serverless - servers abstracted away. 
        * Not suitable for complex apps. With lots of functions interacting with one another - complexity grows very quickly.
        * Azure functions, 
    * `BaaS` (Backend as a Service) - provides auth, db, hosting, logs, analytics. You can focus on the frontend.
* Goals for the state of infrastructure:
    * `Visibility` - what services you are using, how you use them. Notifications when somebody makes changes. Detection of misconfigurations and incidents
    * `Automation` - automatically scale solutions, resolve incidents, rollback to previous configurations
    * `Flexibility` - how easy it is to make changes/improve your configurations
* Interfaces:
    * `Web interface` (e.g. AWS console) use cases:
        * Read-only usage (to understand state of the system)
        * When learning new service
        * Unique tasks (e.g. run EC2 isntance, check something, throw it away)
    * `CLI` (Command Line Interface):
        * Basic way to save and automate operations 
    * `API` (Application Programming Interface):
        * Do not call `API` directly, better use `SDK` 
    * `SDK` (Software Development Kit):
        * e.g. add SDK as dependency to build.gradle, write code that launches `EC2` instances
* Levels
    * Architecture style -> Technology choices -> Application architecture -> Well-Architected framework
* Best practices:
    * Package your application and all dependencies in a `Docker` image
    * Introduce random instance termination during business hours (e.g. Chaos Monkey)
    
### Cloud Comparison
* [Service matrix](https://github.com/open-guides/og-aws#service-matrix)
    * AWS vs Google Cloud vs Azure vs Openstack vs BYO (Open source)

### Traditional (on premises) vs Modern (cloud)
| On-premises                          | Cloud                                              |
|--------------------------------------|----------------------------------------------------|
| Monolithic                           | Decomposed                                         |
| Designed for predictable scalability | Designed for elastic scale                         |
| Relational database                  | Polyglot persistence (mix of storage technologies) |
| Synchronized processing              | Asynchronous processing                            |
| Design to avoid failures (MTBF)      | Design for failure (MTTR)                          |
| Occasional large updates             | Frequent small updates                             |
| Manual management                    | Automated self-management                          |
| Snowflake servers                    | Immutable infrastructure                           |
