extends CharacterBody2D
## Combined player: the "walk" feature (run left/right with A/D / arrows)
## and the "jump" feature (Space / W / Up to jump) merged into one character,
## with horizontal acceleration/friction for a real platformer feel.

const WALK_SPEED := 300.0
const JUMP_VELOCITY := -550.0
const GRAVITY := 900.0
const SIZE := 40.0
const ACCEL := 2200.0     # ground/air horizontal acceleration
const FRICTION := 2400.0  # horizontal deceleration when no input

func _ready() -> void:
	var shape := RectangleShape2D.new()
	shape.size = Vector2(SIZE, SIZE)
	var collision := CollisionShape2D.new()
	collision.shape = shape
	add_child(collision)
	queue_redraw()

func _physics_process(delta: float) -> void:
	var direction := Input.get_axis("move_left", "move_right")
	if direction != 0.0:
		velocity.x = move_toward(velocity.x, direction * WALK_SPEED, ACCEL * delta)
	else:
		velocity.x = move_toward(velocity.x, 0.0, FRICTION * delta)

	if not is_on_floor():
		velocity.y += GRAVITY * delta
	if Input.is_action_just_pressed("jump") and is_on_floor():
		velocity.y = JUMP_VELOCITY

	move_and_slide()

func _draw() -> void:
	draw_rect(Rect2(-SIZE / 2, -SIZE / 2, SIZE, SIZE), Color(0.30, 0.65, 1.0))
