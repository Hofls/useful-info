extends Area2D
## A minimalist hazard (red circle) that damages whatever touches it.

const IS_HEAL := false
const RADIUS := 28.0

func _ready() -> void:
	var shape := CircleShape2D.new()
	shape.radius = RADIUS
	var collision := CollisionShape2D.new()
	collision.shape = shape
	add_child(collision)
	queue_redraw()

func _draw() -> void:
	draw_circle(Vector2.ZERO, RADIUS, Color(0.95, 0.3, 0.3))
