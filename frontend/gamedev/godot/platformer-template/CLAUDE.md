## Project structure
* 1 feature = 1 folder (with scenes, code and tests)

## Commands
Run a specific test
```
cmd /c ""C:\Programs\Programming\Godot\godot.exe" --headless --path "C:\Users\Home\IdeaProjects\godot-projects\minimal-templates\project-template" res://walk/test_walk_around.tscn --quit-after 180 > log.txt 2>&1"
```

Run the jump test (needs a higher frame cap: it settles the player on the floor,
then lets a full jump run up to its apex and back down before asserting):
```
cmd /c ""C:\Programs\Programming\Godot\godot.exe" --headless --path "C:\Users\Home\IdeaProjects\godot-projects\minimal-templates\project-template" res://jump/test_jump.tscn --quit-after 800 > log.txt 2>&1"
```

Scan project (parses all scripts/scenes for errors), headless:
```
cmd /c ""C:\Programs\Programming\Godot\godot.exe" --headless --path "C:\Users\Home\IdeaProjects\godot-projects\minimal-templates\project-template" --editor --quit > log.txt 2>&1"
```

Build project:
```
cmd /c ""C:\Programs\Programming\Godot\godot.exe" --headless --path "C:\Users\Home\IdeaProjects\godot-projects\minimal-templates\project-template" --export-release "Web" "build/Minimal Template.html" > export_log.txt 2>&1"
```

Run the game (main scene = game/game.tscn) for N frames, headless:
```
cmd /c ""C:\Programs\Programming\Godot\godot.exe" --headless --path "C:\Users\Home\IdeaProjects\godot-projects\minimal-templates\project-template" --quit-after 120 > log.txt 2>&1"
```
