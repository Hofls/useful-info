extends Node
## Verifies the camera stays on top of the character: after the player moves,
## the camera's smoothed position catches up to the player's position.

const camera_scene := preload("res://camera/camera.tscn")

func _ready() -> void:
	var world = camera_scene.instantiate()
	add_child(world)

	var player: CharacterBody2D = world.get_node("Player")
	var cam: Camera2D = player.get_node("Camera2D")

	# Camera is a child of the player, so its global position tracks the player.
	var start := player.global_position
	if not cam.global_position.is_equal_approx(start):
		print("TEST FAIL: camera not on player at start: %s vs %s" % [cam.global_position, start])
		get_tree().quit(1)
		return

	Input.action_press("move_right")
	for _i in 30:
		await get_tree().physics_frame
	Input.action_release("move_right")

	var moved := player.global_position - start
	if moved.x <= 0:
		print("TEST FAIL: player did not move: %s" % moved)
		get_tree().quit(1)
		return

	# Give the smoothed camera time to settle exactly on the player.
	for _i in 30:
		await get_tree().physics_frame

	if not cam.global_position.is_equal_approx(player.global_position):
		print("TEST FAIL: camera not following player: %s vs %s" % [cam.global_position, player.global_position])
		get_tree().quit(1)
		return

	print("TEST PASS: camera stays on top of the character")
	get_tree().quit(0)
