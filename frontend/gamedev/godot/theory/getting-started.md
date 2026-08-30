### Godot concepts
* Node - smallest building block 
  * Node can display an image, play a sound, represent a camera, etc
  * Nodes can have children and form a tree (Scene)
* Scene - container for nodes & other scenes
  * E.g. - a character, a weapon, a menu, a house, an entire level or anything else
  * Aim to make them reusable, independent & self-contained (no leaks, no external dependencies!)
  * Once saved, scenes work like new node types (can have many instances, can add them as child of a node)
* Signal - method of communication between nodes (node emit signals on events)

### Build & run
* To run in deepseek harness sandbox:
  * Open Project -> Project Settings -> Toggle on Advanced Settings -> Debug -> File Logging -> Uncheck "Enable File Logging"
  * Or insert in `project.godot`:
  ```
  [debug]

  file_logging/enable_file_logging.pc=false
  ```
* Build & run .html file with game:
  * Editor -> Manage Export Templates -> Web With Extensions Single-Threaded -> Install Selected Templates
  * Project → Export… → Add… → Web
  * `python -m http.server 8000`
  * http://localhost:8000/

### UI
* Useful nodes:
  * ColorRectangle - as placeholder for any object
  * Sprite2D/AnimatedSprite2D - for images/animations
* To run current test - `F6`

