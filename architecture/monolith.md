# Monolithic architecture

* Monolith - all of the application code is in one project.
* This approach works great for small applications, because of its simplicity.
* It is simple to develop/test/deploy/scale (run multiple copies behind load balancer)
* Once the application becomes large and the team grows in size, number of drawbacks show their face:
    * It is difficult to work with huge code base, IDE is overloaded
    * App start time is becoming too slow, same as linters/prettifiers/tests/IDE
    * Problems in code affect entire application (e.g. leaking memory)
    * Impossible scale each component independently (e.g. if one is CPU intensive, while another is all about memory)
    * It is hard to assign different components to different teams
    * Requires sticking to one technology stack
        * (the only way to change it - is to rewrite entire app, you cannot rewrite one component at a time)
