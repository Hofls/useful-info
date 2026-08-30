extends Node2D
## A minimalist bullet that flies straight and despawns after a short time.

var velocity := Vector2.ZERO
const LIFETIME := 2.0
var age := 0.0

func _ready() -> void:
	queue_redraw()

func _physics_process(delta: float) -> void:
	age += delta
	position += velocity * delta
	if age >= LIFETIME:
		queue_free()

func _draw() -> void:
	draw_circle(Vector2.ZERO, 6.0, Color(1.0, 0.85, 0.3))
