extends Node

const walk_scene := preload("res://walk/walk_around.tscn")

func _ready() -> void:
	var world = walk_scene.instantiate()
	add_child(world)

	var player: CharacterBody2D = world.get_node("WalkAround")
	var actions = {
		Vector2.RIGHT: "move_right",
		Vector2.LEFT: "move_left",
		Vector2.UP: "move_up",
		Vector2.DOWN: "move_down",
	}

	for direction in actions:
		var start := player.global_position
		Input.action_press(actions[direction])

		for _i in 10:
			await get_tree().physics_frame

		Input.action_release(actions[direction])

		var moved := player.global_position - start
		if moved.dot(direction) <= 0:
			print("TEST FAIL: %s moved %s" % [actions[direction], moved])
			get_tree().quit(1)
			return

	print("TEST PASS: moved in all four directions")
	get_tree().quit(0)
