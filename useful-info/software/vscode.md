# Visual Studio Code / VS code
* `VS Code` - Universal IDE (install plugin to add a language support)
* If you need to change githab/gitlab password: \
  `Windows` -> `Credential Manager` -> `Windows Credentials` -> `Edit`
* If you need to use gitlab token - install `Gitlab Workflow` extension
* If ctrl+click or F12 now working (No definition found) you most likely mixed up CommonJS and ESM syntax
    * Fix - replace `import fetch from "node-fetch";` with `const fetch = require("node-fetch");`
* [Remove yellow rectangles](https://stackoverflow.com/questions/70336593/fix-issue-with-vs-code-yellow-orange-border-box-around-characters) \
  `File` -> `Preferences` -> `Settings` -> `Highlight Ambiguous Characters` -> `False`
* Turn on auto save - `File` -> `Auto Save`
* Find any action on UI - `Ctrl + Shift + P`
* Configure user & email for current project: \
  `git config --local user.name "hofls"` \
  `git config --local user.email hofls@someit.com`
