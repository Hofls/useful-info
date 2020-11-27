
### Glossary
* `User Experience` - Useful, Usable, Findable, Credible, Desirable, Accessible, Valuable
* `Affordances` - cues which give a hint how users may interact with something
* `Discoverability` - degree of ease with which the user can find all the elements and features of a new system when they first encounter it
* `Low-hanging fruit` - Tasks that have the greatest positive effect for the least effort
* `Progressive disclosure` - defering some advanced or rarely used features to a secondary screen
* `Signal–to–Noise Ratio` - Relevant information is “signal” irrelevant information is “noise”. A high signal–to–noise ratio is a key target of good UI

### Cookbook
* If common problem occurred - notify user and propose a solution.
	* Discord notices when there is no microphone available, shows popup that leads to microphone settings.
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
        * If you try to run not install program, installation instruction appears `Command 'mc' not found, but can be installed with: apt install mc`
    * Windows:
        * Automatically downloads and installs drivers
        * You can configure elements by right-clicking on them (date widget, taskbar, audio, etc)
    * AWS:
        * Each disabled option has a hint that explains why it is disabled
        * To delete something - you have to type its name (for confirmation)
    * VLC media player:
        * You stop watching video without reaching its end. Next time VLC asks if you want to continue watching.
* In-app search - allows searching inside application options, great navigation technique (IntelliJ IDEA => Find Action)
* Sane defaults - couple clicks and everything is working out of the box
* Simple installation process (minimum user involvement)
* Instant Sign Up / Log In - via OAUTH, using social network account
* Infinite-scroll - provides seamless experience when looking at endless content
* Try to predict user actions and make them easier - e.g. in article with code blocks there is button to copy it
* Use information visualization (charts/graphs/..) instead of showing a lot of numbers
* Good setting up experience:
    * Snyk.io:
        * Asks what user wants to do (analyze open source code)
        * Asks where code is located (github)
        * Asks what snyk is allowed to do (with sane defaults)
