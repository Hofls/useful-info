## Project structure
* 1 feature = 1 folder (with scenes, code and tests)

## Commands
Run a specific test
```
cmd /c ""C:\Programs\Programming\Godot\godot.exe" --headless --path "C:\Users\Home\IdeaProjects\godot-projects\minimal-templates\roguelike-template" res://walk/test_walk_around.tscn --quit-after 180 > log.txt 2>&1"
```

Run the camera test (verifies the camera stays on top of the character):
```
cmd /c ""C:\Programs\Programming\Godot\godot.exe" --headless --path "C:\Users\Home\IdeaProjects\godot-projects\minimal-templates\roguelike-template" res://camera/test_camera.tscn --quit-after 180 > log.txt 2>&1"
```

Scan project (parses all scripts/scenes for errors), headless:
```
cmd /c ""C:\Programs\Programming\Godot\godot.exe" --headless --path "C:\Users\Home\IdeaProjects\godot-projects\minimal-templates\roguelike-template" --editor --quit > log.txt 2>&1"
```

Build project:
```
cmd /c ""C:\Programs\Programming\Godot\godot.exe" --headless --path "C:\Users\Home\IdeaProjects\godot-projects\minimal-templates\roguelike-template" --export-release "Web" "build/Roguelike Template.html" > export_log.txt 2>&1"
```

Run the game (main scene = game/game.tscn) for N frames, headless:
```
cmd /c ""C:\Programs\Programming\Godot\godot.exe" --headless --path "C:\Users\Home\IdeaProjects\godot-projects\minimal-templates\roguelike-template" --quit-after 120 > log.txt 2>&1"
```
