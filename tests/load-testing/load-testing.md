* Load test - check how system behaves under high load
* What to test:
    * Suspicious methods
        * Suspicious example 1 - report with custom date range
        * Suspicious example 2 - bunch of complex queries in one method
    * Normal user activity, but with a lot of concurrent users
        * Example - user logs in, browses around, adds items to the basket, logs out
    * Normal user activity, but with a bunch of actual records in DB
        * Example - seller that has thousands of buy requests
