extends Node2D
## Shared by every playable scene: press Esc to quit the game.

func _unhandled_input(event: InputEvent) -> void:
	if event.is_action_pressed("ui_cancel"):
		get_tree().quit()
