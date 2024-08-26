# Auth
* Implementation examples in a `java-dependencies` repository

### Basic Auth
* `Basic Auth` essence
  * Each request should contain header with login and password (encoded with base64)
  * E.g. `Authorization: Basic ZGVtbzpwQDU1dzByZA==`
* Pros:
  * Simplest auth method
* Cons:
  * Logout is very hacky
  * Have to send login and password on each request

### JWT
* `JWT` - JSON Web Token, used to encode and verify claims
* `Claim` - e.g. I am John with ID 1982783, I can use the system without re-authentication for 5 more days.
* Use case: API authentication mechanism
* Great alternative to plain tokens (which require access do db to verify them)
  * https://stackoverflow.com/a/40375745
* Parts, separated by `.`:
  * `Header` (algorithm name, token type)
  * `Payload` (your json)
  * `Signature` (secret)
* Example:
  * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
* JWT usually located in `Authorization:` header of http request
* Auth schema:
  * User enters login and password on frontend
  * Frontend sends data to auth service
      * If credentials are correct - auth service generates JWT and signs it with private key
  * Frontend sends JWT with each request to any service
      * Services get public key from auth service and cache it
      * Then they use public key to check that JWT is legit (by decrypting it)
  * Then check if JWT has necessary roles/privileges to execute method

### OAUTH2
* `OAUTH2` - standard for access delegation. Example - login to 3rd party site/app using google/facebook/github
* All that user have to do - is click one button. UX is very good

### Session based auth
Essence:
* User registered on a site, login and password are stored on the backend.
* User sends login and password to the `/auth/login` endpoint.
    * If credentials are correct - backend send sends cookie with session id.
* Session ID is stored in the cookies on the frontend and sent with each request to the backend.
    * Each time backend checks that session id is present in DB (e.g. redis)

### Token based auth
Essence:
* API user generates token, then sends token in header with each request.
