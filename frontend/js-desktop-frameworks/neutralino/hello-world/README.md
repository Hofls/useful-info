### Neutralino js. Getting started
* Advantage - Very lightweight compared to electron
* Disadvantage - Windows users might get blank white screen
* Install neutralino globally - `npm install -g @neutralinojs/neu`
* Generate hello-world - `neu create hello-world`
* Run app: 
  ```
  cd .\hello-world\
  neu run
  ```
* Look at the console (lists files in current folder, reads first file)
* Build app - `neu build`
  * To hide dev tools, in `neutralino.config.json`set `"enableInspector": true`
* Look at `dist` folder for windows/linux/mac executables

### Errors
* `neu run` throws error `The system cannot find the path specified`
  * Means `bin` folder is missing, run `neu create temp` to generate it, then copy to your project
* `neu build` generates empty `dist` folder
  * Means `bin` folder is missing, run `neu create temp` to generate it, then copy to your project
