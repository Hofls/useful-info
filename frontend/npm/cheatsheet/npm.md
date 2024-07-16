### npm
* https://docs.npmjs.com/cli-documentation/cli
* Install everything in package.json
    * `npm install`
* Install `http-server` package globally
    * `npm install http-server -g`
* List globally installed packages
    * `npm list -g --depth 0`
* Run `http-server` package without installing it
    * `npx http-server`
* Run script named `prettify` in package.json
    * `npm run prettify`
* Update dependencies to the latest versions
    * `npm update`
* Check dependencies for known vulnerabilities
    * `npm audit`
* Show dependency tree (packages)
    * `npm ls`
* Check for outdated packages
    * `npm outdated`
* Check environment (node, npm, repo)
    * `npm environment`
* If npm public registry not always available, use company registry first:
    * `npm config set registry https://nexus.someit.com/repository/npm-registry`