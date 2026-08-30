extends Node
## Headless test: the "dash" action launches the player at dash speed.

const dash_scene := preload("res://dash/dash.tscn")

func _ready() -> void:
	_run()

func _run() -> void:
	var world := dash_scene.instantiate()
	add_child(world)
	var player: CharacterBody2D = world.get_node("Player")

	# The dash impulse applies on the frame after the press, so poll until the
	# player actually reaches dash speed (the dash lasts ~9 physics frames).
	Input.action_press("dash")
	var reached := false
	var max_speed := 0.0
	for _i in 12:
		await get_tree().physics_frame
		max_speed = max(max_speed, player.velocity.length())
		if player.dashing > 0.0 and player.velocity.length() > 300.0:
			reached = true
			break
	Input.action_release("dash")

	var ok: bool = reached
	_finish(ok, "dashing=%s max_speed=%.1f (expected dash speed ~900)" % [player.dashing, max_speed])

func _finish(ok: bool, msg: String) -> void:
	print("TEST %s: %s" % ["PASS" if ok else "FAIL", msg])
	get_tree().quit(0 if ok else 1)
