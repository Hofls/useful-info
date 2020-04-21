* Microservices - defines application that consist of a set of loosely coupled, collaborating services
* Solves all the problems described in monolith.md
* Each service is:
	* Loosely coupled with other services (enables independent work, scope of problem is small and simple)
	* Highly maintainable and testable (fast development and deployment)
	* Easily scalabale
* App as a whole is more durable. Even if one service falls down - another one quickly jumps on its place.
* Drawbacks:
	* Development complexity (inter-service communication, testing interactions between serices)
	* Deployment complexity 
