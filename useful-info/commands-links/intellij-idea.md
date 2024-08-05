# Intellij Idea
## Community vs Ultimate
* Community is free, Ultimate is paid
* Community lacks Spring Boot integration:
  * All properties in `application.yaml` marked as `unused`. No autocomplete.
  * All beans and rest endpoints marked as `unused`
* Ultimate supports all the languages (js, python, go, etc)

## Plugins
#### Java:
* Lombok - to teach IDEA about Lombok
* GenerateAllSetter - to generate calls to all setters of a class

## Customization
* Right click on tabs => `Configure editor tabs...` => 
    * `Tab placement: Right`
    * `Tab limit: 30`
* To turn off imports auto-ordering (e.g. when project has auto-formatter)
    * `File -> Settings -> Editor -> General -> Auto Import -> Optimize imports on the fly`
* To enable auto imports:
    * `File -> Settings -> Editor -> General -> Auto Import`
    
## Features
* Execute any code during debug
    * `ctrl + shift + a` => `evaluate`
* Generate method comment
    * On top of the method, write `/**`, press `enter`
* Fix some weird problems
    * `File` => `Invalidate caches / Restart`
* If unable to import `gradle` project:
    * Install `gradle` locally
    * Use it: `File` => `Settings` => `Build, Execution` => `Build Tools` => `Gradle` => `Use Gradle from:`
* If repository mirror not working (e.g. because of vpn), do it manually:
    * `R.Click -> Git -> Repository -> Remote -> Add`
    * `R.Click -> Git -> Repository -> Push -> Pick new remote`
  
## Update
* Use `JetBrains Toolbox`

## Bugs
* To avoid problems with the cache, don't change code while background task is running (e.g. indexing)
    
## Hotkeys
* Go to class/method implementation
    * `ctrl + click`
* Code completion
    * `ctrl + space`
* Code completion (with Smart Type)
    * `ctrl + shift + space`
* Quick documentation
    * `ctrl + q`
* Class hierarchy
    * `ctrl + h`
* Code generation
    * `alt + insert`
* Refactoring recommendation
    * `alt + enter`
* Insert live template
    * `ctrl + j`
* Code refactoring
    * `ctrl + alt + shift + t`
* Method call hierarchy
    * `ctrl + alt + h`
* Evaluate expression (during debug)
    * `alt + f8`
* Add a bookmark, open bookmark
    * `f11`, `shift + f11`
* Search everywhere
    * `shift+shift`
