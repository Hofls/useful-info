extends Node
## Simplest headless test: the "jump" action makes the player move upward.

const jump_scene := preload("res://jump/jump.tscn")

func _ready() -> void:
	_run()

func _run() -> void:
	var world := jump_scene.instantiate()
	add_child(world)
	var player: CharacterBody2D = world.get_node("Player")

	# Let gravity settle the player onto the floor.
	for _i in 60:
		await get_tree().physics_frame

	if not player.is_on_floor():
		_finish(false, "player never landed on floor")
		return

	# Press jump, then wait two physics steps: physics_frame fires at the start
	# of a step (before _physics_process), so the second await lets the impulse apply.
	Input.action_press("jump")
	await get_tree().physics_frame
	await get_tree().physics_frame
	Input.action_release("jump")

	var ok := player.velocity.y < 0.0
	_finish(ok, "jump velocity.y = %s (expected < 0)" % player.velocity.y)

func _finish(ok: bool, msg: String) -> void:
	print("TEST %s: %s" % ["PASS" if ok else "FAIL", msg])
	get_tree().quit(0 if ok else 1)
