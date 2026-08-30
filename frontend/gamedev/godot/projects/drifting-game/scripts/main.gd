extends Node2D
## Drift Arena — top-down 2D drifting game.
## A winding circuit track with many turns and endless drift scoring.

const ROAD_W := 220.0
const BARRIER_T := 36.0

var track: PackedVector2Array = PackedVector2Array()

var car: DriftCar
var skid_layer: Node2D
var ui: CanvasLayer

var score := 0

# Drift combo state.
var drift_run := 0.0
var combo := 1
var combo_time := 0.0
var combo_max := 5

var score_label: Label
var combo_label: Label
var hint_label: Label
var skid_tick := 0

# --- nested helper nodes ------------------------------------------------

class SkidMark extends Node2D:
	var color := Color(0.05, 0.05, 0.06, 0.4)
	var life := 2.4
	var t := 0.0
	var size := Vector2(8, 4)
	func _init(sz: Vector2 = Vector2(8, 4)) -> void:
		size = sz
	func _draw() -> void:
		draw_rect(Rect2(-size * 0.5, size), color)
	func _process(delta: float) -> void:
		t += delta
		color.a = maxf(0.0, 0.4 * (1.0 - t / life))
		queue_redraw()
		if t >= life:
			queue_free()


class FloatText extends Label:
	var vel := Vector2(0, -42)
	var t := 0.0
	var life := 0.9
	func _init(txt: String, pos: Vector2) -> void:
		text = txt
		position = pos
		add_theme_font_size_override("font_size", 34)
		horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
		vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	func _process(delta: float) -> void:
		t += delta
		position += vel * delta
		modulate.a = maxf(0.0, 1.0 - t / life)
		if t >= life:
			queue_free()


class DashDraw extends Node2D:
	var pts: PackedVector2Array = PackedVector2Array()
	func _draw() -> void:
		var n := pts.size()
		var on := true
		for i in n:
			if on:
				draw_line(pts[i], pts[(i + 1) % n], Color(0.95, 0.9, 0.25), 5.0)
			on = not on


class StartLine extends Node2D:
	var center := Vector2.ZERO
	var tangent := Vector2.RIGHT
	var road_w := ROAD_W
	var sq := 24.0
	func _draw() -> void:
		var normal := tangent.orthogonal()
		var half := road_w * 0.5
		var rows := int(road_w / sq)
		for row in rows:
			for cell in 2:
				var white := ((row + cell) % 2) == 0
				var pos := center + normal * (-half + row * sq + sq * 0.5) + tangent * (cell - 0.5) * sq
				draw_rect(Rect2(pos - Vector2(sq, sq) * 0.5, Vector2(sq, sq)),
						Color.WHITE if white else Color(0.1, 0.1, 0.1))


# --- lifecycle ----------------------------------------------------------

func _ready() -> void:
	randomize()
	track = _generate_track()
	_build_track()
	_build_ui()
	_spawn_car()
	_update_hud()


func _process(delta: float) -> void:
	if Input.is_action_just_pressed("restart"):
		get_tree().reload_current_scene()
		return
	_update_hud()


# --- track generation ---------------------------------------------------

func _generate_track() -> PackedVector2Array:
	# A long, highly randomized closed circuit. It is built as a positive radial
	# function r(t) around the origin, which guarantees the curve never
	# self-intersects, so we can safely make it big and wiggly.
	var pts := PackedVector2Array()

	# Random number of harmonics (3 or 4), picked distinct from a wide pool.
	# Higher harmonics mean many more turns around the loop.
	var n_harm := randi_range(3, 4)
	var pool := [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	var hs: Array = []
	while hs.size() < n_harm:
		var hx: int = pool[randi() % pool.size()]
		if not hs.has(hx):
			hs.append(hx)

	# Big random base radius and a random amount of vertical stretch, which
	# together change the overall length and shape dramatically.
	var r0 := randf_range(1050.0, 1600.0)
	var yscale := randf_range(1.0, 1.55)

	# Random amplitudes (higher harmonics get smaller so turns stay drivable)
	# and random phases.
	var amps: Array = []
	var phases: Array = []
	var maxr := r0
	for k in n_harm:
		var decay := 1.0 / (1.0 + 0.28 * float(hs[k]))
		var a := randf_range(0.10, 0.26) * r0 * decay
		amps.append(a)
		maxr += a
		phases.append(randf() * TAU)

	# Point count scales with length so segment spacing stays ~22px.
	var n := clampi(int(TAU * maxr / 22.0), 380, 820)

	for i in n:
		var t := TAU * i / n
		var r := r0
		for k in n_harm:
			r += amps[k] * sin(float(hs[k]) * t + phases[k])
		r = maxf(r, 320.0)
		pts.append(Vector2(r * cos(t), r * sin(t) * yscale))
	return pts


# Build a road band polygon from centerline points, offset between offA and offB.
func _band(pts: PackedVector2Array, off_a: float, off_b: float) -> PackedVector2Array:
	var n := pts.size()
	var side_a := PackedVector2Array()
	var side_b := PackedVector2Array()
	for i in n:
		var tan := (pts[(i + 1) % n] - pts[(i - 1 + n) % n]).normalized()
		var nor := tan.orthogonal()
		side_a.append(pts[i] + nor * off_a)
		side_b.append(pts[i] + nor * off_b)
	var poly := side_a
	for i in range(n - 1, -1, -1):
		poly.append(side_b[i])
	return poly


func _build_track() -> void:
	skid_layer = Node2D.new()
	skid_layer.name = "SkidLayer"
	skid_layer.z_index = 5
	add_child(skid_layer)

	# Road surface.
	var road := Polygon2D.new()
	road.name = "Road"
	road.color = Color(0.22, 0.23, 0.24)
	road.polygon = _band(track, ROAD_W * 0.5, -ROAD_W * 0.5)
	add_child(road)

	# Edge lines (thin light bands along each side).
	var edge_l := Polygon2D.new()
	edge_l.color = Color(0.95, 0.95, 0.95)
	edge_l.polygon = _band(track, ROAD_W * 0.5, ROAD_W * 0.5 - 16)
	edge_l.z_index = 1
	add_child(edge_l)

	var edge_r := Polygon2D.new()
	edge_r.color = Color(0.95, 0.95, 0.95)
	edge_r.polygon = _band(track, -ROAD_W * 0.5, -(ROAD_W * 0.5 - 16))
	edge_r.z_index = 1
	add_child(edge_r)

	# Center dashed line.
	var dash := DashDraw.new()
	dash.pts = track
	dash.z_index = 2
	add_child(dash)

	# Start line.
	var start := StartLine.new()
	start.center = track[0]
	start.tangent = (track[1] - track[0]).normalized()
	start.z_index = 2
	add_child(start)

	# Collision barriers along both edges.
	_add_barriers()

	# A safety perimeter well outside the track in case the car is thrown off.
	_add_safety_walls()


func _add_barriers() -> void:
	var n := track.size()
	var walls := StaticBody2D.new()
	walls.name = "TrackBarriers"
	# Slick barriers: the car slides along them instead of dead-stopping, so
	# touching the edge barely costs momentum or drift.
	var mat := PhysicsMaterial.new()
	mat.friction = 0.02
	mat.bounce = 0.05
	walls.physics_material_override = mat
	for i in n:
		var tan := (track[(i + 1) % n] - track[(i - 1 + n) % n]).normalized()
		var nor := tan.orthogonal()
		var spacing := track[i].distance_to(track[(i + 1) % n])
		for side: float in [1.0, -1.0]:
			var pos := track[i] + nor * side * ROAD_W * 0.5
			_place_rect(walls, pos, Vector2(spacing * 1.4, BARRIER_T), tan.angle())
	add_child(walls)


func _place_rect(parent: Node, pos: Vector2, size: Vector2, rot: float) -> void:
	var col := CollisionShape2D.new()
	var shape := RectangleShape2D.new()
	shape.size = size
	col.shape = shape
	col.position = pos
	col.rotation = rot
	parent.add_child(col)


func _add_safety_walls() -> void:
	var minp := track[0]
	var maxp := track[0]
	for p in track:
		minp = minp.min(p)
		maxp = maxp.max(p)
	var m := 500.0
	var half_w := (maxp.x - minp.x) * 0.5 + m
	var half_h := (maxp.y - minp.y) * 0.5 + m
	var walls := StaticBody2D.new()
	walls.name = "SafetyWalls"
	var mat := PhysicsMaterial.new()
	mat.friction = 0.02
	mat.bounce = 0.05
	walls.physics_material_override = mat
	var cx := (minp.x + maxp.x) * 0.5
	var cy := (minp.y + maxp.y) * 0.5
	_place_rect(walls, Vector2(cx, cy - half_h), Vector2(half_w * 2, BARRIER_T), 0)
	_place_rect(walls, Vector2(cx, cy + half_h), Vector2(half_w * 2, BARRIER_T), 0)
	_place_rect(walls, Vector2(cx - half_w, cy), Vector2(BARRIER_T, half_h * 2), 0)
	_place_rect(walls, Vector2(cx + half_w, cy), Vector2(BARRIER_T, half_h * 2), 0)
	add_child(walls)

	# Camera follows within the track bounds.
	var cam_margin := 220.0
	_cam_limit_left = int(cx - half_w - cam_margin)
	_cam_limit_right = int(cx + half_w + cam_margin)
	_cam_limit_top = int(cy - half_h - cam_margin)
	_cam_limit_bottom = int(cy + half_h + cam_margin)


var _cam_limit_left := -100000
var _cam_limit_right := 100000
var _cam_limit_top := -100000
var _cam_limit_bottom := 100000


# --- UI ---------------------------------------------------------------

func _build_ui() -> void:
	ui = CanvasLayer.new()
	ui.name = "UI"
	add_child(ui)

	var med := 30
	var big := 42
	var sm := 22

	var top := Label.new()
	top.add_theme_font_size_override("font_size", med)
	top.text = "DRIFT ARENA"
	top.add_theme_color_override("font_color", Color(1, 1, 1, 0.9))
	top.position = Vector2(24, 12)
	ui.add_child(top)

	score_label = _make_label(med, Vector2(24, 64))
	score_label.text = "Score  0"
	ui.add_child(score_label)

	combo_label = _make_label(big, Vector2(24, 108))
	combo_label.text = ""
	ui.add_child(combo_label)

	hint_label = _make_label(sm, Vector2(0, 0))
	hint_label.text = "W/S accelerate  -  A/D steer  -  hard turns = DRIFT  -  R restart"
	hint_label.set_anchors_preset(Control.PRESET_BOTTOM_WIDE)
	hint_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	ui.add_child(hint_label)


func _make_label(size: int, pos: Vector2) -> Label:
	var l := Label.new()
	l.add_theme_font_size_override("font_size", size)
	l.add_theme_color_override("font_color", Color(1, 1, 1))
	l.position = pos
	return l


func _spawn_car() -> void:
	car = DriftCar.new()
	car.name = "Car"
	var tan := (track[1] - track[0]).normalized()
	car.position = track[0] + tan * 60.0
	car.rotation = tan.angle()
	car.linear_damp = 0.0
	car.angular_damp = 0.0

	var col := CollisionShape2D.new()
	var shape := CapsuleShape2D.new()
	shape.radius = 10.5
	shape.height = 26.0
	col.shape = shape
	car.add_child(col)

	car.drift_started.connect(_on_drift_started)
	car.drift_ended.connect(_on_drift_ended)
	car.drift_score.connect(_on_drift_score)
	add_child(car)

	var cam := Camera2D.new()
	cam.name = "Camera"
	cam.position_smoothing_enabled = true
	cam.position_smoothing_speed = 6.0
	cam.limit_left = _cam_limit_left
	cam.limit_right = _cam_limit_right
	cam.limit_top = _cam_limit_top
	cam.limit_bottom = _cam_limit_bottom
	car.add_child(cam)


# --- drift / scoring ----------------------------------------------------

func _on_drift_started() -> void:
	drift_run = 0.0
	combo = 1
	combo_time = 0.0


func _on_drift_score(amount: float) -> void:
	drift_run += amount
	combo_time += 1.0 / 60.0
	if combo_time >= 1.3 and combo < combo_max:
		combo_time = 0.0
		combo += 1


func _on_drift_ended() -> void:
	var award := int(drift_run) * combo
	if award > 0:
		score += award
		_score_popup("+%d" % award, combo)
	drift_run = 0.0
	combo = 1


func _score_popup(award_text: String, mult: int) -> void:
	var t := FloatText.new("%s   x%d" % [award_text, mult], Vector2(24, 160))
	ui.add_child(t)


func _spawn_skidmarks() -> void:
	var rear := Vector2(-12, 0)
	var wp1 := car.to_global(rear + Vector2(0, -11))
	var wp2 := car.to_global(rear + Vector2(0, 11))
	var a := SkidMark.new(Vector2(9, 3.5))
	var b := SkidMark.new(Vector2(9, 3.5))
	a.position = wp1
	b.position = wp2
	skid_layer.add_child(a)
	skid_layer.add_child(b)


# --- hud ----------------------------------------------------------------

func _update_hud() -> void:
	score_label.text = "Score  %d" % score
	if car and car.is_drifting:
		combo_label.text = "DRIFTING  x%d" % combo
		combo_label.add_theme_color_override("font_color", Color(1.0, 0.55, 0.2))
		skid_tick += 1
		if skid_tick % 2 == 0:
			_spawn_skidmarks()
	else:
		combo_label.text = ""
		combo_label.add_theme_color_override("font_color", Color(1, 1, 1))
