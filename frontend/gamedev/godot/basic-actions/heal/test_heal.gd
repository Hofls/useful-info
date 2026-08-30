extends Node
## Headless test: the heal component loads as a healing Area2D.

const heal_scene := preload("res://heal/heal.tscn")

func _ready() -> void:
	_run()

func _run() -> void:
	var world := heal_scene.instantiate()
	add_child(world)

	var ok: bool = world is Area2D and world.script.IS_HEAL == true
	_finish(ok, "heal is Area2D with IS_HEAL=%s" % world.script.IS_HEAL)

func _finish(ok: bool, msg: String) -> void:
	print("TEST %s: %s" % ["PASS" if ok else "FAIL", msg])
	get_tree().quit(0 if ok else 1)
