extends Node2D
## Shared by every example scene: press Esc to return to the menu.

func _unhandled_input(event: InputEvent) -> void:
	if event.is_action_pressed("ui_cancel"):
		get_tree().change_scene_to_file("res://menu.tscn")
