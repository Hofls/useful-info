extends Node

const jump_scene := preload("res://jump/jump.tscn")

func _ready() -> void:
	var world := jump_scene.instantiate()
	add_child(world)
	var player: CharacterBody2D = world.get_node("Player")

	for _i in 3:
		await get_tree().physics_frame

	var floor_y := player.global_position.y
	Input.action_press("jump")

	var apex_y := floor_y
	var jumped := false

	for _i in 600:
		await get_tree().physics_frame
		jumped = jumped or not player.is_on_floor()
		apex_y = minf(apex_y, player.global_position.y)

		if jumped and player.is_on_floor():
			break

	Input.action_release("jump")

	var height := floor_y - apex_y
	var expected: float = player.JUMP_VELOCITY * player.JUMP_VELOCITY / (2.0 * player.GRAVITY)
	var ok := jumped and absf(height - expected) < 8.0

	print("TEST %s: height=%s expected=%s" % ["PASS" if ok else "FAIL", height, expected])
	get_tree().quit(0 if ok else 1)
