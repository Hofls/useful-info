##### Big flaws
* Not found yet

##### Installation
* Install `Java`
    * Add `/bin` to `PATH`
* Install proxy extension for `Google Chrome` (for more info - `proxy.md`)
    * Configure HTTP proxy `localhost:8000`
* Install `Gatling`

##### Record test
* Run `%GATLING_HOME%\bin\recorder.bat`
    * `Blacklist -> No static resources`
    * `Start!`
* Run `Google Chrome` 
    * Activate http proxy
    * Go to http://computer-database.gatling.io/computers
    * Browse around, click buttons
* `Gatling recorder` -> `Stop & Save`
    * Test should appear in folder `%GATLING_HOME%\user-files\simulations`
    * Requests should appear in folder `%GATLING_HOME%\user-files\resources`

##### Run test
* Run `%GATLING_HOME%\bin\gatling.bat`
* Pick recorded test
* Html report should appear in folder `%GATLING_HOME%\results\`

##### Known errors:
* [*request.json not found](https://github.com/gatling/gatling/issues/4056)
    * Fix: specify package before test recording
