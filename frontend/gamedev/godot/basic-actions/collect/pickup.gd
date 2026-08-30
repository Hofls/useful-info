extends Area2D
## A minimalist coin that disappears when the player touches it.

const RADIUS := 12.0

func _ready() -> void:
	var shape := CircleShape2D.new()
	shape.radius = RADIUS
	var collision := CollisionShape2D.new()
	collision.shape = shape
	add_child(collision)
	queue_redraw()

func _draw() -> void:
	draw_circle(Vector2.ZERO, RADIUS, Color(1.0, 0.8, 0.2))
