extends Node
## Headless test: the enemy chases and resets the player on catch.

const enemy_scene := preload("res://enemy/enemy.tscn")

func _ready() -> void:
	_run()

func _run() -> void:
	var world := enemy_scene.instantiate()
	add_child(world)
	var player: CharacterBody2D = world.get_node("Player")
	var chaser: Node2D = world.get_node("Chaser")

	# Move the player away from start so a reset is observable.
	Input.action_press("move_left")
	for _i in 30:
		await get_tree().physics_frame
	Input.action_release("move_left")

	var start: Vector2 = player.start_position
	if player.position.distance_to(start) < 10.0:
		_finish(false, "player did not move away from start")
		return

	# Place the chaser right next to the player so it catches quickly.
	chaser.position = player.position + Vector2(50, 0)
	var caught := false
	for _i in 120:
		await get_tree().physics_frame
		if player.position.distance_to(start) < 5.0 and player.velocity == Vector2.ZERO:
			caught = true
			break

	_finish(caught, "player reset to start after catch (pos=%s start=%s)" % [player.position, start])

func _finish(ok: bool, msg: String) -> void:
	print("TEST %s: %s" % ["PASS" if ok else "FAIL", msg])
	get_tree().quit(0 if ok else 1)
