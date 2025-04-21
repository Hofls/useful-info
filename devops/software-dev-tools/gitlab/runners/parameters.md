* How to change parameters?
  * Just edit `config.toml`, runner will automatically apply changes (check runner logs to make sure)
* Each build will have 1 cpu and 3gb RAM available (2 builds in parallel = 6gb RAM) \
  Makes sense to limit resources if build takes them all and makes server non responsive (even ssh disconnects) 
  ```
  [runners.docker]
  cpus = "1"
  memory = "3g"
  ```
  Make sure that limits are working, via `docker stats`
