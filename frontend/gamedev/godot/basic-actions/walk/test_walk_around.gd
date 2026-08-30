extends Node
## Headless test: the "walk" action moves the player horizontally.

const walk_scene := preload("res://walk/walk_around.tscn")

func _ready() -> void:
	_run()

func _run() -> void:
	var world := walk_scene.instantiate()
	add_child(world)
	var player: CharacterBody2D = world.get_node("WalkAround")

	Input.action_press("move_right")
	for _i in 5:
		await get_tree().physics_frame
	Input.action_release("move_right")

	var ok := player.velocity.x > 0.0
	_finish(ok, "walk velocity.x = %s (expected > 0)" % player.velocity.x)

func _finish(ok: bool, msg: String) -> void:
	print("TEST %s: %s" % ["PASS" if ok else "FAIL", msg])
	get_tree().quit(0 if ok else 1)
