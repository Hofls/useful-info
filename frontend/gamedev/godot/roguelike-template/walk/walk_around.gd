extends CharacterBody2D
## A minimalist cube that walks around with WASD / arrow keys.
## Top-down roguelike movement: no gravity, the player can move in any
## of the 8 directions.

const SPEED := 300.0
const SIZE := 40.0

func _ready() -> void:
	var shape := RectangleShape2D.new()
	shape.size = Vector2(SIZE, SIZE)
	var collision := CollisionShape2D.new()
	collision.shape = shape
	add_child(collision)
	queue_redraw()

func _physics_process(_delta: float) -> void:
	velocity = Input.get_vector("move_left", "move_right", "move_up", "move_down") * SPEED
	move_and_slide()

func _draw() -> void:
	draw_rect(Rect2(-SIZE / 2, -SIZE / 2, SIZE, SIZE), Color(0.30, 0.65, 1.0))
