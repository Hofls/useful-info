## Project structure
* 1 feature = 1 folder (with scenes, code and tests)

## Commands
Run specific test
```
cmd /c ""C:\Programs\Programming\Godot\godot.exe" --headless --path "C:\Users\Home\IdeaProjects\godot-projects\minimal-templates\basic-actions" res://jump/test_jump.tscn --quit-after 180 > log.txt 2>&1"
```

Scan project (parses all scripts/scenes for errors), headless:
```
cmd /c ""C:\Programs\Programming\Godot\godot.exe" --headless --path "C:\Users\Home\IdeaProjects\godot-projects\minimal-templates\basic-actions" --editor --quit > log.txt 2>&1"
```

Build project:
```
cmd /c ""C:\Programs\Programming\Godot\godot.exe" --headless --path "C:\Users\Home\IdeaProjects\godot-projects\minimal-templates\basic-actions" --export-release "Web" "build/Random Project.html" > export_log.txt 2>&1"
```

Run the game for N frames, headless:
```
cmd /c ""C:\Programs\Programming\Godot\godot.exe" --headless --path "C:\Users\Home\IdeaProjects\godot-projects\minimal-templates\basic-actions" --quit-after 120 > log.txt 2>&1"
```
