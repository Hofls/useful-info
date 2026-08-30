extends Node
## Headless test: touching a hazard damages the player.

const health_scene := preload("res://health/health.tscn")

func _ready() -> void:
	_run()

func _run() -> void:
	var world := health_scene.instantiate()
	add_child(world)
	var player: CharacterBody2D = world.get_node("Player")
	var hazard: Area2D = world.get_node("Hazard2")

	# Start just left of a hazard and walk into it.
	player.position = hazard.position - Vector2(80, 0)
	Input.action_press("move_right")
	for _i in 60:
		await get_tree().physics_frame
	Input.action_release("move_right")

	var ok: bool = player.hp < player.MAX_HP
	_finish(ok, "hp = %s (expected < %s)" % [player.hp, player.MAX_HP])

func _finish(ok: bool, msg: String) -> void:
	print("TEST %s: %s" % ["PASS" if ok else "FAIL", msg])
	get_tree().quit(0 if ok else 1)
