* `Brute force` - attacker submits many login-password pairs with the hope of eventually guessing one correctly.
    * Usually involves multiple proxies and dictionary of leaked passwords.
    * Fix 1: captcha after couple of failed login attempts.
    * Fix 2: avoid this attack completely by using OAUTH.
* `Clickjacking` - 
    * Page controlled by malicious actor contains iframe with 0 opacity (invisible).
    * With completely different, visible interface on behind it. 
    * When user tries to interact with visible interface - he actually interacts with invisible one. 
    * E.g. victim can unknowingly press "retweet" button, facebook "like", etc.
    * Fix: proper CSP header (Content-Security-Policy: frame-ancestors 'none';)
* `Cross-Site Request Forgery (CSRF)`
    * Bad actor can send requests from users browser to legitimate websites, when user visits malicious website (or by tricking user into clicking link)
    * For backend such request will not look suspicious (because cookies are here, IP is the same, etc)
    * Fix 1: Server should require that POST requests include a user-specific site-generated secret (token). 
    * The secret would be supplied by the server when sending the web form used to make transfers.
* `Insecure Direct Object Reference`
    * Occurs when system does not perform authorization checks. Blindly accepts IDs received from user.
    * Malicious actor can send requests with any ids, thus getting access to restricted data or perform undesirable actions.
    * Fix: implement backend-side authorization.
* `Persistent XSS vulnerability (Cross-Site Scripting)`
    * Lets say there is user profile page, in which you can set profile message that will be displayed to all visitors of the page.
    * Malicious actor can set his script as a profile message.
    * When any user opens this profile - evil script will be executed.
    * This script can steal cookies, perform unauthorized activities, do phishing to steal user credentials, inject a keylogger, steal sensitive information from the page, etc.
    * Fix: input sanitization (most modern frameworks are already doing it).
* `Reflected (or Non Persistent) XSS vulnerability (Cross-Site Scripting)`
    * Lets say there is search function, in which search words are transferred as URL parameters, and displayed alongside the search results.
    * Malicious actor can construct url with his script as a parameter and send it to unsuspecting user.
    * When user clicks on the link - script is getting executed.
    * This script can steal cookies, perform unauthorized activities, do phishing to steal user credentials, inject a keylogger, steal sensitive information from the page, etc.
    * Fix: input sanitization (most modern frameworks are already doing it).
    * P.S. difference between Reflected XSS and DOM Based XSS: in Reflected - script goes to the server before returning to the client, in DOM Based - script stays on the client side.
* `SQL Injection`
    * Vulnerability happens when data goes directly from user to the SQL query.
    * Malicious actor can execute any SQL query. e.g. - get access to any info in the database, drop tables, modify data etc.
    * Fix: input sanitization (most modern frameworks are already doing it).
* `Insecure Cryptographic Storage` - sensitive data should be encrypted (passwords, credit cards..)
* `Insufficient Transport Layer Protection` - should use https to avoid man-in-the-middle attack
* `Components with vulnerabilities` - should scan app dependencies, to check if there are any known vulnerabilities in them
* `Insufficient Logging & Monitoring` - to detect attacks early you should securely log & monitor application
* `Insecure Deserialization` - should not trust any data received from the client side (such as item price, discount, etc)
* `Information Leakage` - should not leak any info about application (e.g. error stacks)
* `CORS vulnerability` - should not rely on CORS to prevent undesired requests, because it is enforced on the client side (browser). 
    * Can be easily bypassed by alternative clients (curl/wget etc)
* `Remote code execution` - should not use user input inside functions that are evaluating code (e.g. `eval`)
