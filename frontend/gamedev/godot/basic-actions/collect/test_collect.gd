extends Node
## Headless test: walking into a pickup increases the score.

const collect_scene := preload("res://collect/collect.tscn")

func _ready() -> void:
	_run()

func _run() -> void:
	var world := collect_scene.instantiate()
	add_child(world)
	var player: CharacterBody2D = world.get_node("Player")
	var pickup: Area2D = world.get_node("Pickup")

	# Start just left of the first pickup and walk into it.
	player.position = pickup.position - Vector2(120, 0)
	Input.action_press("move_right")
	for _i in 60:
		await get_tree().physics_frame
	Input.action_release("move_right")

	var ok: bool = player.score > 0
	_finish(ok, "score = %s (expected > 0)" % player.score)

func _finish(ok: bool, msg: String) -> void:
	print("TEST %s: %s" % ["PASS" if ok else "FAIL", msg])
	get_tree().quit(0 if ok else 1)
