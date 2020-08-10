# Project review
Want to figure out what to improve in the project? Here is checklist. Technologies are specific to java ecosystem, but ideas are universal.

### Smoke test
* Just go around each folder, look at files randomly, see if you notice anything crazy

### Architecutre
* System architecture is good, diagram is present in the project
* High level architecture style should suit the project needs (microservices/monolith etc)
* Folders structure makes sense
* ? Architecture is enforced via ArchUnit

### Devops
* Continuous delivery is automated
* Notification is sent in dev chat whenever merge request is open
* Each commit should have link to task (and check for the link is automated)
* All related configs is present in the project (nginx, apache2, gitlab-ci, docker, kubernetes..)
* There is README.md with information on how to install/build/run project
* Endpoint with metrics (e.g. micrometer-actuator) for monitoring
* There is at least three different environments - dev, test, production
* Git branching schema makes sense
* Gitlab is [configured properly](../commands-links/gitlab.md)
* Logs are accessible via `graylog` or alternatives
* There is no passwords/tokens hardcoded in the project (those should be stored as environment variables)
* Make sure that request is merged only after review from another person
* Project runs inside of a container (docker)

### Database
* Migrations are done via liquibase/flyway
* Database schema makes sense
* There is indexes/validations

### Tests
* Unit tests and integration tests is a must. Mutation tests is a possibility
* Everything should be tested! e.g. - auth, rest, db...
* Should be possible to run specific test in isolation (Ctrl+Shift+F10)

### Code
* At least two profiles:
    * Run locally - fast, without plugins/tests 
    * Build - slow, with all the plugins and tests.
* Hot-swap (code reloading) should be present
* Linter and code formatter should be present
* Code that is executed on the frontend should be minifed and obfuscated
* All errors should be logged
* Expected dependencies (or their alternatives): lombok, mapstruct, mockito, h2db, spring-boot-starter-test
* Swagger (or alternative) is used to generate frontend code
* Web interface is restful
* Each complex method/class has comments (javadoc)
* If something goes wrong - backend returns descriptive error messages

### Security
* Database backup is done periodically
* Data flows over secure connection (https)
* There is no common [vulnerabilities](https://github.com/Hofls/computer-security/tree/master/vulnerabilities-examples/frontend/src/vulnerability)
* Authentication is working correctly

### Outside of review scope, but if you have extra time:
* Acessibility
* Optimization
* UX
* Wiki