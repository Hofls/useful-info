extends Area2D
## A minimalist enemy that chases the player and catches it on touch.

const SPEED := 170.0
const SIZE := 36.0

var target: Node2D = null

func _ready() -> void:
	var shape := RectangleShape2D.new()
	shape.size = Vector2(SIZE, SIZE)
	var collision := CollisionShape2D.new()
	collision.shape = shape
	add_child(collision)
	target = get_parent().get_node("Player")
	body_entered.connect(_on_body_entered)
	queue_redraw()

func _physics_process(delta: float) -> void:
	if target:
		position += (target.global_position - global_position).normalized() * SPEED * delta

func _on_body_entered(body: Node2D) -> void:
	if body == target and body.has_method("reset"):
		body.reset()

func _draw() -> void:
	draw_rect(Rect2(-SIZE / 2, -SIZE / 2, SIZE, SIZE), Color(0.95, 0.3, 0.3))
