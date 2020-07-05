
### Glossary
* `User Experience` - Useful, Usable, Findable, Credible, Desirable, Accessible, Valuable
* `Affordances` - cues which give a hint how users may interact with something

### Cookbook
* If common problem occurred - notify user and propose a solution.
	* Discord notices when there is no microphone available, shows popup that leads to microphone settings.
	* IntelliJ IDEA:
		* Proposes auto-import of project dependencies
		* Reminds to setup project SDK (with link to SDK settings)
		* Notices when new files appear and asks if they should be checked in version control
		* If you write code in outdated style - IDEA asks to rewrite it for you in modern style
* In-app search - allows searching inside application options, great navigation technique (IntelliJ IDEA => Find Action)
* Sane defaults - couple clicks and everything is working out of the box
* Instant Sign Up / Log In - via OAUTH, using social network account
* Infinite-scroll - provides seamless experience when looking at endless content
* Try to predict user actions and make them easier - e.g. in article with code blocks there is button to copy it
* Use information visualization (charts/graphs/..) instead of showing a lot of numbers
* Setting up:
    * Snyk.io:
        * Asks what user wants to do (analyze open source code)
        * Asks where code is located (github)
        * Asks what snyk is allowed to do (with sane defaults)
