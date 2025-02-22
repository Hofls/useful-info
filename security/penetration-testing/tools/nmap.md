##### Info
* GUI - Zenmap

##### Port scanning:
* Scan top 1k ports (fast)
    * `nmap scanme.nmap.org`
* Scan all ports (slow) 
    * `nmap -p- scanme.nmap.org`

##### Version Detection:
* Detect Services (1k ports, fast)
    * `nmap -sV scanme.nmap.org`
* Detect Services (specific ports, fast)
    * `nmap -sV scanme.nmap.org -p 80,9929`
* Detect OS and Services (1k ports, not-so-fast)
    * `nmap -A scanme.nmap.org`

##### Scripts. Info
* Scripts list
    * https://nmap.org/nsedoc/index.html
* Script description:
    * `nmap --script-help http-csrf`
* Run set of scripts:
    * `nmap --script vuln scanme.nmap.org`
* Run script on specific port
    * `nmap --script http-robots.txt habr.com -p 443`
* More output
    * Script trace:
        * `nmap --script http-csrf --script-trace scanme.nmap.org`
    * Verbose:
        * `nmap --script http-csrf -v scanme.nmap.org`
    * Debug:
        * `nmap --script http-csrf -d scanme.nmap.org`

##### Useful scripts
* Whois:
    * `nmap --script whois* scanme.nmap.org`
* Check common subdomain names:
    * `nmap -Pn --script=dns-brute scanme.nmap.org`
* Check common directory names (noisy)
    * `nmap --script=http-enum scanme.nmap.org`
    * e.g. - `/images/`, `/shared/`
* Check for disallowed entries in robots.txt
    * `nmap --script http-robots.txt habr.com`
* Discover directory structure
    * `nmap -Pn --script=http-sitemap-generator scanme.nmap.org`
* Find CSRF vulnerabilities
    * `nmap --script http-csrf scanme.nmap.org`
