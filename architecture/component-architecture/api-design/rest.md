#### REST
* Every action (except POST) should be idempotent
    * No matter how many times you send same request - it should result in the same state
* Return correct HTTP status code
* Think about implementing HATEOAS
* Don't return exception stack trace to client. Return only error message
* Handle exceptions consistently (Global error handling on backend)
* Log information about errors
* Use caching/pagination for optimization
* Provide asynchronous support for long-running operations
    * One endpoint to start task (returns task id)
    * Another endpoint to check status and get result (when ready)
* Use single endpoint for entity search, for example:
    * Bad - findByRoomId, findByStatus, findByRoomIdAndStatus
    * Good - find (roomId and status - optional parameters)
