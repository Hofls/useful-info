extends Node
## Headless test: the hazard component loads as a damaging Area2D.

const hazard_scene := preload("res://hazard/hazard.tscn")

func _ready() -> void:
	_run()

func _run() -> void:
	var world := hazard_scene.instantiate()
	add_child(world)

	var ok: bool = world is Area2D and world.script.IS_HEAL == false
	_finish(ok, "hazard is Area2D with IS_HEAL=%s" % world.script.IS_HEAL)

func _finish(ok: bool, msg: String) -> void:
	print("TEST %s: %s" % ["PASS" if ok else "FAIL", msg])
	get_tree().quit(0 if ok else 1)
