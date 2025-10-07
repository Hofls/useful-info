### Find unused methods in java http api
* Run e2e tests (use API to the fullest)
* Save list of URLs from actuator to `api-urls-actuator.json`
  * Example actuator URL - http://someit.com/ms-service/actuator/metrics/http.server.requests
* If that's not the first run - add urls from list of known false positives
* Run `api-extract.py`, look at `api-diff.json`
* Check suspicious methods
  * If unused - delete
  * If used - make sure to also use them in e2e tests
  * Other - add to list of false positives
