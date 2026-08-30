extends Control
## A minimalist menu that launches each example scene.

const SCENES := {
	"Walk Around": "res://walk/walk_around.tscn",
	"Jump": "res://jump/jump.tscn",
	"Shoot": "res://shoot/shoot.tscn",
	"Collect": "res://collect/collect.tscn",
	"Dash": "res://dash/dash.tscn",
	"Health": "res://health/health.tscn",
	"Enemy Chase": "res://enemy/enemy.tscn",
}

func _ready() -> void:
	var vbox := VBoxContainer.new()
	vbox.set_anchors_preset(Control.PRESET_FULL_RECT)
	add_child(vbox)
	var title := Label.new()
	title.text = "Minimal Templates"
	title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	vbox.add_child(title)
	for name in SCENES:
		var button := Button.new()
		button.text = name
		button.pressed.connect(_open.bind(SCENES[name]))
		vbox.add_child(button)

func _open(path: String) -> void:
	get_tree().change_scene_to_file(path)
