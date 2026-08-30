extends CharacterBody2D
## A minimalist cube that runs left/right (A/D) and jumps (Space / W / Up).

const SPEED := 550.0
const JUMP_VELOCITY := -550.0
const GRAVITY := 900.0
const SIZE := 40.0

func _ready() -> void:
	var shape := RectangleShape2D.new()
	shape.size = Vector2(SIZE, SIZE)
	var collision := CollisionShape2D.new()
	collision.shape = shape
	add_child(collision)
	queue_redraw()

func _physics_process(delta: float) -> void:
	velocity.x = Input.get_axis("move_left", "move_right") * SPEED
	if not is_on_floor():
		velocity.y += GRAVITY * delta
	if Input.is_action_just_pressed("jump") and is_on_floor():
		velocity.y = JUMP_VELOCITY
	move_and_slide()

func _draw() -> void:
	draw_rect(Rect2(-SIZE / 2, -SIZE / 2, SIZE, SIZE), Color(0.30, 0.65, 1.0))
