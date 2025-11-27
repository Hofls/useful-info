#### Info
* `JFrog artifactory` - universal artifact storage (e.g. docker images, npm/maven packages)
* Persistence - `-v /opt/artifactory:/var/opt/jfrog/artifactory`

#### Getting started
* Install & run:
    * `docker run --name artifactory -d -p 8081:8081 -p 8082:8082 releases-docker.jfrog.io/jfrog/artifactory-cpp-ce:latest`
* Check it:
    * Open in browser `http://YOUR_SERVER_IP:8082/ui/login/`
    * Credentials - `admin/password`

#### Experiments
* To experiment with package.json & force download dependency without local cache:
  * Remove dependency from node_modules, remove package-lock.json and /node_modules/.package-lock.json
  * Run `npm install --prefer-online --no-cache`
  * To make sure it actually goes online each time - try to set wrong username in npmrc

#### Publish npm package (Node.js)
* Log into artifactory -> Set me up -> npm -> Repository -> Insert password -> Copy commands
* Important! Password should be in encrypted form (looks like md5 hash), you have to copy it from "Set me up" form
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

#### Via scope - Publish/Pull 1 custom npm package from 1 custom registry, all other packages pulled from default registry (Node.js)
* Warning! Wrong registry in package-lock.json will break everything
* Publish:
  * Get .tgz file (result of building package), extract it
  * In package.json add scope to the name
    * Before - "name": "ng-zorro-antd",
    * After - "name": "@custom-libs/ng-zorro-antd",
  * Create .npmrc
  ```
  registry=https://artifactory.someit.com/artifactory/api/npm/libs-npm-local/
  //artifactory.someit.com/:_password=QlS7sOPZJNSN2lkSD7fkDixXozSbDOF24dDk
  //artifactory.someit.com/:username=hofls
  //artifactory.someit.com/:always-auth=true
  ```
  * Publish scoped package - `npm publish`
* Pull:
  * Create .npmrc
  ```
  @custom-libs:registry=https://artifactory.someit.com/artifactory/api/npm/libs-npm-local/
  //artifactory.someit.com/:_password=QlS7sOPZJNSN2lkSD7fkDixXozSbDOF24dDk
  //artifactory.someit.com/:username=hofls
  //artifactory.someit.com/:always-auth=true
  ```
  * Add to package.json:
  ```
  "dependencies": {
    "@custom-libs/ng-zorro-antd": "13.4.62"
  }
  ```
  * Test - look at "force download" in "Experiments" section above
* Also you gotta modify usage:
  * Before - `import { NzMessageModule } from 'ng-zorro-antd/message';`
  * After - `import { NzMessageModule } from '@custom-libs/ng-zorro-antd/message';`

#### Withou scope - Publish/Pull 1 custom npm package from 1 custom registry, all other packages pulled from default registry (Node.js)
* Warning! Wrong registry in package-lock.json will break everything
* .npmrc
```
ng-zorro-antd:registry=https://artifactory.someit.com/artifactory/api/npm/libs-npm-local/
//artifactory.someit.com/:_password=QlS7sOPZJNSN2lkSD7fkDixXozSbDOF24dDk
//artifactory.someit.com/:username=hofls
//artifactory.someit.com/:always-auth=true
```
* .package.json
```
{
  "name": "hell-world",
  "version": "0.0.1",
  "dependencies": {
	"ng-zorro-antd": "https://artifactory.someit.com/artifactory/libs-npm-local/ng-zorro-antd/-/ng-zorro-antd-13.4.62.tgz"
  }
}
```
* Test - look at "force download" in "Experiments" section above

#### Publish/Pull maven library (Java)
* Important! Password should be in encrypted form (looks like md5 hash), you have to copy it from "Set me up" form
* Log into artifactory -> Set me up -> Maven -> Repository -> Configure -> Insert password -> Generate Settings
  * Save `settings.xml` into `%USERPROFILE%\.m2\`
* Log into artifactory -> Set me up -> Maven -> Repository -> Deploy -> save into `pom.xml` in your java project
```
<distributionManagement>
    <repository>
        <id>central</id>
        <name>EMIAS Artifactory-releases</name>
        <url>https://artifactory.someit.com/artifactory/mvn-release</url>
    </repository>
    <snapshotRepository>
        <id>snapshots</id>
        <name>EMIAS Artifactory-snapshots</name>
        <url>https://artifactory.someit.com/artifactory/mvn-snapshot</url>
    </snapshotRepository>
</distributionManagement>
```

