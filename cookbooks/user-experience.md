
##### Glossary
* `User Experience` - Useful, Usable, Findable, Credible, Desirable, Accessible, Valuable
* `Affordances` - cues which give a hint how users may interact with something
* `Discoverability` - degree of ease with which the user can find all the elements and features of a new system when they first encounter it
* `Low-hanging fruit` - Tasks that have the greatest positive effect for the least effort
* `Progressive disclosure` - deferring some advanced or rarely used features to a secondary screen
* `Signal–to–Noise Ratio` - Relevant information is “signal” irrelevant information is “noise”. A high signal–to–noise ratio is a key target of good UI

##### Cookbook
* Create `MVP` to start gather feedback, metrics and analytics early
* Use widespread, standard UI elements (something novel/rare might be hard for users to learn)
* In-app search - allows searching inside application options, great navigation technique (IntelliJ IDEA => Find Action)
* Sane defaults - couple clicks and everything is working out of the box
* Simple installation process (minimum user involvement)
* Instant Sign Up / Log In - via OAUTH, using social network account
* Infinite-scroll - provides seamless experience when looking at endless content
* Try to predict user actions and make them easier - e.g. "copy" button in an article with code blocks
* Use information visualization (charts/graphs/..) instead of showing a lot of numbers
* Good setting up experience:
    * Snyk.io:
        * Asks what user wants to do (analyze open source code)
        * Asks what snyk is allowed to do (with sane defaults)
        * Asks where code is located (github)
        
##### Great usability examples. Product first
* Amazon QuickSight:
    * Allows asking questions in natural language. To build graph: `What is weekly sales in Paris vs London this year`
* Discord:
    * Notices when there is no microphone available, shows popup that leads to microphone settings.
* IntelliJ IDEA:
    * Proposes auto-import of project dependencies
    * Reminds to setup project SDK (with link to SDK settings)
    * Notices when new files appear and asks if they should be checked in version control
    * If you write code in outdated style - IDEA asks to rewrite it for you in modern style
* Grafana. Readable error messages:
    * If config is incorrect (missing necessary parameters / wrong values etc)
    * If external dependency not installed - asks user to install it 
* DBeaver:
    * Warning appears if you try to execute `DELETE` without `WHERE` clause
* apache2:
    * After adding configuration via `a2ensite`, appears text `To activate the new configuration, you need to run: systemctl reload apache2`
* systemctl:
    * After failing to start, appears text `See "systemctl status apache2.service" and "journalctl -xe" for details.`
* Ubuntu:
    * If you try to run not installed program, installation instruction appears `Command 'mc' not found, but can be installed with: apt install mc`
* Windows:
    * Automatically downloads and installs drivers
    * You can configure elements by right-clicking on them (date widget, taskbar, audio, etc)
* AWS:
    * Each disabled option has a hint that explains why it is disabled
    * To delete something - you have to type its name (for confirmation)
* Azure:
    * When you open something for a first time - shows hints
    * If table is empty - in background appears short description of service
    * Helps choose 1 of 4 load balancers based on a questionnaire
* VLC media player:
    * If you stop watching video without reaching its end, then next time VLC asks if you want to continue watching
* Google chrome:
    * Alerts if you use leaked password
    * Updates automatically 
* Swagger UI:
    * Increases discoverability by providing list of available endpoints. 1 click to send example request
* Yandex Cloud:
    * When spinning new VM - all the fields filled with sane defaults. User is one click away from running it.
* npm:
    * Looks for a new version after each run. If found - `New major version of npm available! "Run npm install -g npm to update!"`
* GitLab:
    * If no runners available - shows how to configure them (link to guide)
    * If project moves to another namespace - sends email with git commands to update remote url
* InfluxDB:
    * 1 command to install & run: `docker run...`
    * Great onboarding via web UI:
        * 3 paths - novice, intermediate, expert
        * Getting started - Load your data, Build dashboard, Set up alerting
    * After picking language, provides code snippets:
        * Add dependency (gradle/maven)
        * Initialize a client (token, ip/port, bucket)
        * Typical usage examples (send requests, process responses)
    * Each non-trivial field has `?` icon, with short description and link to detailed documentation (all links are unique)
* Certbot:
    * Asks for your load balancer and OS, generates unique instruction
    * Automatically renews certificate
* Docker:
    * `docker run` automatically pulls image (if not found locally)
    
##### Great usability examples. Feature first
* Most useful/important things come first:
    * Youtube/Reddit comments, Stackoverflow answers
* Automatically generated code
    * Azure/AWS - use/configure services via UI. Export as YAML/JSON for automation
    * Airtest/Poco/Gatling - work in app like a normal user would. 1 action = 1 generated line of code.
