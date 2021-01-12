##### Run 20 tests in parallel
* Open test from `\Gatling\user-files\simulations` in IDE
* Replace `atOnceUsers(1)` with `atOnceUsers(20)` 
    * Alternatives: `rampUsers(), constantUsersPerSec()`

##### Run from command line
* `gatling.bat -s RecordedSimulation`
