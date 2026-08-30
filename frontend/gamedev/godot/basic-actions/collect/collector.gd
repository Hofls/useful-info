extends CharacterBody2D
## A minimalist square that walks (WASD) and collects coins for score.

const SPEED := 300.0
const SIZE := 40.0

var score := 0
var score_label: Label

func _ready() -> void:
	var shape := RectangleShape2D.new()
	shape.size = Vector2(SIZE, SIZE)
	var collision := CollisionShape2D.new()
	collision.shape = shape
	add_child(collision)
	score_label = get_node("../CanvasLayer/Score")
	# Connect to every coin placed in the scene.
	for pickup in get_parent().get_children():
		if pickup is Area2D:
			pickup.body_entered.connect(_on_pickup_body_entered.bind(pickup))
	queue_redraw()

func _physics_process(_delta: float) -> void:
	velocity = Input.get_vector("move_left", "move_right", "move_up", "move_down") * SPEED
	move_and_slide()

func _on_pickup_body_entered(_body: Node2D, pickup: Area2D) -> void:
	score += 1
	score_label.text = "Score: %d" % score
	pickup.queue_free()

func _draw() -> void:
	draw_rect(Rect2(-SIZE / 2, -SIZE / 2, SIZE, SIZE), Color(0.30, 0.65, 1.0))
