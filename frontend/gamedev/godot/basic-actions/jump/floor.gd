extends StaticBody2D
## A minimalist visible floor for the jump example.

const SIZE := Vector2(1400, 40)

func _ready() -> void:
	queue_redraw()

func _draw() -> void:
	draw_rect(Rect2(-SIZE.x / 2, -SIZE.y / 2, SIZE.x, SIZE.y), Color(0.25, 0.25, 0.28))
