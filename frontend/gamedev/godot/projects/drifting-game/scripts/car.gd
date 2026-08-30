extends RigidBody2D
class_name DriftCar

## Signals emitted to the game script.
signal drift_started
signal drift_ended
signal drift_score(amount: float)

## Feel tuning.
@export var engine_power := 780.0
@export var reverse_power := 300.0
@export var brake_power := 860.0
@export var max_speed := 520.0
@export var max_reverse_speed := 150.0
@export var steer_strength := 4.8
@export var base_grip := 1.8
@export var drift_grip := 0.5
@export var drift_steer_bonus := 1.5
@export var coast_drag := 70.0

## Visual colors.
@export var body_color := Color(0.95, 0.30, 0.16)
@export var accent_color := Color(1.0, 0.92, 0.55)
@export var wheel_color := Color(0.11, 0.11, 0.13)
@export var glass_color := Color(0.55, 0.82, 1.0)

var is_drifting := false
var skid_strength := 0.0


func _ready() -> void:
	gravity_scale = 0.0
	can_sleep = false
	continuous_cd = RigidBody2D.CCD_MODE_CAST_RAY
	contact_monitor = true
	max_contacts_reported = 4
	queue_redraw()


func _physics_process(delta: float) -> void:
	var accel := Input.get_axis("move_backward", "move_forward")
	var steer := Input.get_axis("move_left", "move_right")
	_step(accel, steer, delta)


func _step(accel: float, steer: float, delta: float) -> void:
	var fwd := Vector2.from_angle(rotation)
	var right := fwd.orthogonal()
	var fwd_speed := linear_velocity.dot(fwd)
	var lat_speed := linear_velocity.dot(right)
	var speed_mag := absf(fwd_speed)

	# Drift kicks in when you steer hard while moving and the turn points the
	# car the way it is travelling (steering into the slide).
	var want_drift := absf(steer) > 0.45 and speed_mag > 130.0 and steer * fwd_speed > 0.0

	# Steering, speed-sensitive and boosted while drifting.
	var steer_eff := steer * steer_strength * clampf(fwd_speed / max_speed, -1.0, 1.0)
	if want_drift or is_drifting:
		steer_eff *= drift_steer_bonus
	angular_velocity = lerpf(angular_velocity, steer_eff, 0.32)

	# Engine / brake / reverse.
	var target_speed := fwd_speed
	if accel > 0.0:
		target_speed = move_toward(fwd_speed, max_speed, engine_power * delta)
	elif accel < 0.0:
		if fwd_speed > 8.0:
			target_speed = move_toward(fwd_speed, 0.0, brake_power * delta)
		else:
			target_speed = move_toward(fwd_speed, -max_reverse_speed, reverse_power * delta)
	else:
		target_speed = move_toward(fwd_speed, 0.0, coast_drag * delta)

	# Grip model: keep the forward speed, bleed off lateral (sideways) velocity.
	# Drifting lowers grip so the car slides.
	var grip := drift_grip if (want_drift or is_drifting) else base_grip
	var lat := lat_speed * exp(-grip * delta)
	linear_velocity = fwd * target_speed + right * lat

	# Drift state transitions.
	if want_drift and not is_drifting:
		is_drifting = true
		drift_started.emit()
	elif not want_drift and is_drifting:
		is_drifting = false
		drift_ended.emit()

	# Drift scoring: reward speed + how hard you are turning while sliding.
	if is_drifting:
		var intensity := clampf(absf(steer) * speed_mag / max_speed, 0.0, 1.0)
		skid_strength = intensity
		drift_score.emit(intensity * speed_mag * 0.02 * 60.0 * delta)
	else:
		skid_strength = 0.0


func _draw() -> void:
	# Four wheels.
	var wheel_w := 8.5
	var wheel_h := 5.0
	for wp in [Vector2(-11, -12.5), Vector2(11, -12.5), Vector2(-11, 12.5), Vector2(11, 12.5)]:
		draw_rect(Rect2(wp - Vector2(wheel_w * 0.5, wheel_h * 0.5), Vector2(wheel_w, wheel_h)), wheel_color)

	# Body (front is +X when rotation = 0).
	draw_rect(Rect2(-19, -9.5, 40, 19), body_color)
	# Rear spoiler accent.
	draw_rect(Rect2(-20, -9.0, 3, 18), accent_color.darkened(0.1))
	# Windshield.
	draw_rect(Rect2(3.5, -7.0, 9, 14), glass_color)
	# Hood stripe.
	draw_rect(Rect2(-18, -1.2, 24, 2.4), accent_color)
	# Headlight.
	draw_circle(Vector2(19, 0), 2.0, accent_color)
