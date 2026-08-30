extends Node
## Headless test: the "shoot" action spawns a bullet.

const shoot_scene := preload("res://shoot/shoot.tscn")
const bullet_script := preload("res://shoot/bullet.gd")

func _ready() -> void:
	_run()

func _run() -> void:
	var world := shoot_scene.instantiate()
	add_child(world)
	var player: CharacterBody2D = world.get_node("Player")

	var before := _count_bullets(world)
	Input.action_press("shoot")
	await get_tree().physics_frame
	await get_tree().physics_frame
	Input.action_release("shoot")

	var after := _count_bullets(world)
	var ok := after > before
	_finish(ok, "bullets %d -> %d (expected increase)" % [before, after])

func _count_bullets(world: Node) -> int:
	var n := 0
	for child in world.get_children():
		if child.script == bullet_script:
			n += 1
	return n

func _finish(ok: bool, msg: String) -> void:
	print("TEST %s: %s" % ["PASS" if ok else "FAIL", msg])
	get_tree().quit(0 if ok else 1)
