extends StaticBody2D
## A minimalist visible wall/floor. Draws a rectangle that exactly matches its
## CollisionShape2D, so the visual and the collision always line up.

func _ready() -> void:
	queue_redraw()

func _draw() -> void:
	for child in get_children():
		if child is CollisionShape2D and child.shape is RectangleShape2D:
			var s: RectangleShape2D = child.shape
			draw_rect(Rect2(child.position - s.size / 2.0, s.size), Color(0.25, 0.25, 0.28))
