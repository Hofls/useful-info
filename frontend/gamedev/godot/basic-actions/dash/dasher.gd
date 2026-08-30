extends CharacterBody2D
## A minimalist cube that walks (WASD) and dashes in the held direction (Shift).

const SPEED := 300.0
const DASH_SPEED := 900.0
const DASH_TIME := 0.15
const DASH_COOLDOWN := 0.8
const SIZE := 40.0

var dash_dir := Vector2.RIGHT
var dashing := 0.0
var cooldown := 0.0

func _ready() -> void:
	var shape := RectangleShape2D.new()
	shape.size = Vector2(SIZE, SIZE)
	var collision := CollisionShape2D.new()
	collision.shape = shape
	add_child(collision)
	queue_redraw()

func _physics_process(delta: float) -> void:
	cooldown = max(cooldown - delta, 0.0)
	if dashing > 0.0:
		dashing -= delta
		velocity = dash_dir * DASH_SPEED
	else:
		var input_dir := Input.get_vector("move_left", "move_right", "move_up", "move_down")
		if Input.is_action_just_pressed("dash") and cooldown <= 0.0:
			dash_dir = input_dir if input_dir != Vector2.ZERO else dash_dir
			dashing = DASH_TIME
			cooldown = DASH_COOLDOWN
		velocity = input_dir * SPEED
	move_and_slide()
	queue_redraw()

func _draw() -> void:
	if dashing > 0.0:
		draw_rect(Rect2(-SIZE / 2, -SIZE / 2, SIZE, SIZE), Color(1.0, 0.85, 0.3))
	else:
		draw_rect(Rect2(-SIZE / 2, -SIZE / 2, SIZE, SIZE), Color(0.30, 0.65, 1.0))
