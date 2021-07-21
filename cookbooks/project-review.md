# Project review
Want to figure out what to improve in the project? Here is checklist. Technologies are specific to java ecosystem, but ideas are universal.

### Architecture
* System architecture is good, diagram is present in the project
* High level architecture style should suit the project needs (microservices/monolith etc)
* Folders structure makes sense
* Architecture enforced automatically (e.g. via ArchUnit)

### Devops
* Continuous delivery automated
* Notification sent in dev chat whenever merge request is open
* Each commit should have a link to task (and check for the link automated)
* All related configs is present in the project (nginx, apache2, gitlab-ci, docker, kubernetes..)
* There is a README.md with information on how to install/build/run project
* Endpoint with metrics (e.g. micrometer-actuator) for monitoring
* Monitoring is present, with automatic alerts if something goes wrong
* There is at least three different environments - dev, test, production
* There is no stale branches
* Logs are accessible via `graylog` or alternatives
* No passwords/tokens hardcoded in the project (those should be stored as environment variables)
* Project runs inside of a container (docker), possibly in kubernetes

### Git
* Git branching schema makes sense
* Gitlab is [configured properly](../commands-links/gitlab.md)
* Request merged only after review from another person

### Code review
* Moved to [code-review.md](code-review.md)

### Database
* Migrations are done via liquibase/flyway
* Database schema makes sense
* All the necessary indexes/validations present
* No abuse of weird features (e.g. triggers)

### Tests
* Unit tests and integration tests is a must. Mutation tests is a possibility.
* Everything should be tested! e.g. - auth, rest, db...
* Should be possible to run specific test in isolation (Ctrl+Shift+F10 in `IDEA`)
* E2E tests (UI) (e.g. puppeteer/cypress/selenium)
* [Load tests](load-testing/load-testing.md) (e.g. sending bunch of requests at same time)
* Stress tests (e.g. turning off a random microservice)
* A/B testing

### Code
* At least two profiles:
    * Run locally - fast, without plugins/tests 
    * Build - slow, with all the plugins and tests
* Hot-swap (code reloading) should be present
* Linter and code formatter
* Static code analyzer
* Unique and searchable names for global parameters (cache names, profiles, environment-variables...)
    * Otherwise, it's hard to find their usage in codebase 
* Code that is executed on the frontend should be minified and obfuscated
* All errors should be logged, possibly with user ID
* Expected dependencies (or their alternatives): lombok, mapstruct, java-verbal-expressions, mockito, h2db, spring-boot-starter-test
* Swagger (or alternative) is used to generate frontend code
* DB Changesets (e.g. liquibase) generated from code
* Web interface is restful (or graphql)
* Each complex method/class has comments (javadoc)
* If something goes wrong - backend returns descriptive error messages
* There is no old "// TODO" comments
* Rest request examples for each endpoint (e.g. via swagger)
* Look at `zero-to-one` in `architecture` repository

### Versions
* Sane versioning schema (e.g. [Semantic Versioning](https://semver.org/))
* All versions are explicit, otherwise they may change and break stuff (e.g. playwright 1.9.1 changed selectors behavior)
    * package-lock.json:
        * Bad: `"playwright": "^1.9.1"`. Good `"playwright": "1.9.1"`
    * Dockerfile:
        * Bad: `FROM mcr.microsoft.com/playwright:bionic`. Good: `FROM mcr.microsoft.com/playwright:v1.9.1-bionic`
* package-lock.json checked in version control (to force same exact versions everywhere)
* No outdated dependencies/systems
    * People don't want to work with outdated tech. It affects hiring/retention. 

### Security
* Automatic vulnerability scanning
* Database backup is done periodically
* Data flows over secure connection (https)
    * https://letsencrypt.org/
* There is no common [vulnerabilities](https://github.com/Hofls/computer-security/tree/master/vulnerabilities-examples/frontend/src/vulnerability)
* Authentication is working correctly
* Software on the server should be updated regularly (to patch all known vulnerabilities)

### Etc:
* [Team](social/team.md)
* [Optimization](optimization.md)
* [UX](human-computer/user-experience.md)
* [Wiki](wiki.md)
* [SEO](seo.md)
* [Accessibility](human-computer/accessibility.md)
