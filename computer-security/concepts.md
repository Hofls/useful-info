* `Threat model` - provides defenders with knowledge of the probable attacker's profile, the most likely attack vectors, and the assets most desired by an attacker
* `Secure by design` - system that has been designed from the foundation to be secure
    * `Minimize attack surface area`
    * `Secure defaults`
    * `Principle of Least privilege`
    * `Defense in depth` - Multiple layers of security
    * `Separation of duties` - Entity that approves an action, the entity that carries out an action, and the entity that monitors that action must be separate.
        The goal is to eliminate the possibility of a single user from carrying out and concealing a prohibited action.
    * `Keep security simple`
    * `Fix security issues correctly` - Once a security issue has been identified, it is important to develop a test for it, and to understand the root cause
    * `Don’t trust (infrastructure/services/users)`
    * `Code reviews and unit testing`
* `Obfuscation` - conversion of human-readable code to unreadable code (usually used on client-side code)
* `Authentication` - process of verifying identity (e.g. by asking to provide password that only this person knows)
* `Backup` - copy of information, to recover it in case of loss.
* `Cryptography` - secure communication in presence of adversaries (via data encryption)
* `Fault tolerant system` - is able to operate in case of failure of its components
* `Sandbox (Vritualization)` - allows ot run untrusted programs in isolation (to limit possible harm)
* `Vulnerability assessment` - identify, quantify and prioritize the vulnerabilities in a system (fully automated process)
* `Penetration test` - authorized simulated cyberattack on a computer system, performed to evaluate the security of the system (partially automated)
    * In short = `Vulnerability assessment` + exploitation of vulnerabilities
* `Fingerprint (Browser)` - unique id of user (e.g. timezone, screen resolution, OS, browser plugins, fonts, system language)  
    * [Check your fingerprint](https://coveryourtracks.eff.org/)
* `DevSecOps` - development, security, and operations (e.g. auto scan for vulnerabilities after build)