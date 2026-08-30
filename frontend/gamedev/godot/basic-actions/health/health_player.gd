extends CharacterBody2D
## A minimalist square that walks (WASD). Red circles damage you,
## green circles heal you. Losing all HP respawns you at spawn.

const SPEED := 300.0
const SIZE := 40.0
const MAX_HP := 3
const INVULNERABLE_TIME := 1.0

var hp := MAX_HP
var invulnerable := 0.0
var start_position := Vector2.ZERO
var hp_label: Label

func _ready() -> void:
	start_position = position
	var shape := RectangleShape2D.new()
	shape.size = Vector2(SIZE, SIZE)
	var collision := CollisionShape2D.new()
	collision.shape = shape
	add_child(collision)
	hp_label = get_node("../CanvasLayer/Hp")
	# Connect to the red (hazard) and green (heal) circles placed in the scene.
	for circle in get_parent().get_children():
		if circle is Area2D and circle.script and circle.script.get("IS_HEAL") != null:
			if circle.script.IS_HEAL:
				circle.body_entered.connect(_on_heal_body_entered)
			else:
				circle.body_entered.connect(_on_hazard_body_entered)
	queue_redraw()

func _physics_process(delta: float) -> void:
	invulnerable = max(invulnerable - delta, 0.0)
	velocity = Input.get_vector("move_left", "move_right", "move_up", "move_down") * SPEED
	move_and_slide()
	queue_redraw()

func _on_hazard_body_entered(body: Node2D) -> void:
	if body == self and invulnerable <= 0.0:
		hp -= 1
		invulnerable = INVULNERABLE_TIME
		hp_label.text = "HP: %d" % hp
		if hp <= 0:
			hp = MAX_HP
			position = start_position
			hp_label.text = "HP: %d" % hp

func _on_heal_body_entered(body: Node2D) -> void:
	if body == self and hp < MAX_HP:
		hp = min(hp + 1, MAX_HP)
		hp_label.text = "HP: %d" % hp

func _draw() -> void:
	var color := Color(0.30, 0.65, 1.0)
	if invulnerable > 0.0:
		color = Color(0.30, 0.65, 1.0, 0.35)
	draw_rect(Rect2(-SIZE / 2, -SIZE / 2, SIZE, SIZE), color)
