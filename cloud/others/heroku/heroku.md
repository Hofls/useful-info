### Terminology
* `Dyno` - smart container (runtime environment)
    * To scale app - just increase number of dynos
* `Slug` - app bundle ready for execution on dyno (source code, dependencies, runtime..)
* `Buildpack` - transforms source code into a Slug 
* `Addon` - 3rd party service (e.g. managed PostgreSQL)
* `Button` - run 3rd party app in one click (e.g. hasura, owasp juice shop)
* `DX` - Developer experience. Developers can focus on creating apps, without being distracted by servers/infra
* `OpEx` - Operational experience. Platform monitors key indicators, provides alerting, autoscaling, logs, metrics
 
### Commands
* App:
    * Open app url
        * `heroku open`
    * Run app locally
        * `heroku local`
    * Check logs
        * `heroku logs`
    * Show app config
        * `heroku config`
* Dynos:
    * SSH to dyno
        * `heroku run bash`
    * Scale dynos to 0
        * `heroku ps:scale web=0`
    * List dynos for an app
        * `heroku ps`
* Addons:
    * Add addon
        * `heroku addons:create heroku-postgresql:hobby-dev`
    * Open addon console
        * `heroku addons:open heroku-postgresql:hobby-dev`
    * Used addons list
        * `heroku addons`