#### Info
* `JFrog artifactory` - universal artifact storage (e.g. docker images, npm/maven packages)
* Persistence - `-v /opt/artifactory:/var/opt/jfrog/artifactory`

#### Getting started
* Install & run:
    * `docker run --name artifactory -d -p 8081:8081 -p 8082:8082 releases-docker.jfrog.io/jfrog/artifactory-cpp-ce:latest`
* Check it:
    * Open in browser `http://YOUR_SERVER_IP:8082/ui/login/`
    * Credentials - `admin/password`

#### Publish/Pull npm package (node.js)
* Log into artifactory -> Set me up -> npm -> Repository -> Insert password -> Copy commands
* Important! Password should be in weird form (looks like md5 hash), you have to copy it from "Set me up" form
* Example №1, configuration via console (password in base64):
```
npm config set registry https://artifactory.someit.com/artifactory/api/npm/libs-npm/
npm config set //artifactory.someit.com/artifactory/api/npm/libs-npm/:username hofls
npm config set //artifactory.someit.com/artifactory/api/npm/libs-npm/:_password QlS7sOPZJNSN2lkSD7fkDixXozSbDOF24dDk
npm config set always-auth true
```
* Example №2, configuration via .npmrc file (put file into project root, password in base64):
```
registry=https://artifactory.someit.com/artifactory/api/npm/libs-npm/
//artifactory.someit.com/artifactory/api/npm/libs-npm/:username=hofls
//artifactory.someit.com/artifactory/api/npm/libs-npm/:_password=QlS7sOPZJNSN2lkSD7fkDixXozSbDOF24dDk
//artifactory.someit.com/artifactory/api/npm/libs-npm/:always-auth=true
```
* Check config - `npm ping` (tries to authorize with given parameters)
* Build and publish package:
```
gulp build:someit
npm publish --registry https://artifactory.someit.com/artifactory/api/npm/libs-npm/
```
* Pull npm package - add `"hofls-package": "2.4.0"` to `dependencies` in `package.json`, run `npm install`
* If you need multiple registries - modify commands to use scope `@company:`
  * npm config set @company:registry https://artifactory.someit.com/artifactory/api/npm/libs-npm/
  * @company:registry=https://artifactory.someit.com/artifactory/api/npm/libs-npm/
  * "@company/hofls-package": "2.4.0"
