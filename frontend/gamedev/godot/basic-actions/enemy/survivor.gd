extends CharacterBody2D
## A minimalist cube that walks (WASD) and gets sent back to the start when caught.

const SPEED := 300.0
const SIZE := 40.0

var start_position := Vector2.ZERO

func _ready() -> void:
	start_position = position
	var shape := RectangleShape2D.new()
	shape.size = Vector2(SIZE, SIZE)
	var collision := CollisionShape2D.new()
	collision.shape = shape
	add_child(collision)
	queue_redraw()

func _physics_process(_delta: float) -> void:
	velocity = Input.get_vector("move_left", "move_right", "move_up", "move_down") * SPEED
	move_and_slide()

func reset() -> void:
	position = start_position
	velocity = Vector2.ZERO

func _draw() -> void:
	draw_rect(Rect2(-SIZE / 2, -SIZE / 2, SIZE, SIZE), Color(0.30, 0.65, 1.0))
