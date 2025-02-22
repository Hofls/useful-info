* Run [penetration testing](penetration-testing)
* Scan your project. Examples:
    * Generic - Snyk, Sonarqube
    * Docker - `docker scan` (based on snyk integration)
    * Java - [dependency-check-gradle](https://github.com/dependency-check/dependency-check-gradle)
    * npm - `npm audit`
* Cloudflare - great protection from DDOS and bots
    * Traffic goes through cloudflare services, all suspicious requests are being blocked
* Always update to the new version, old versions have known vulnerabilities
* 