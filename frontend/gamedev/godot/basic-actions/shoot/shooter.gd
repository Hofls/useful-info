extends CharacterBody2D
## A minimalist cube that walks (WASD) and shoots a bullet toward the mouse (left click).

const SPEED := 300.0
const SIZE := 40.0
const BULLET_SPEED := 700.0

const BulletScript := preload("res://shoot/bullet.gd")

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
	if Input.is_action_just_pressed("shoot"):
		var bullet := BulletScript.new()
		bullet.position = global_position
		bullet.velocity = (get_global_mouse_position() - global_position).normalized() * BULLET_SPEED
		get_parent().add_child(bullet)

func _draw() -> void:
	draw_rect(Rect2(-SIZE / 2, -SIZE / 2, SIZE, SIZE), Color(0.30, 0.65, 1.0))
