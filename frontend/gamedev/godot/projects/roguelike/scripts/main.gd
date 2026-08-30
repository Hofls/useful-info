extends Node2D
# Minimalist turn-based roguelike.
# Arrow keys / WASD move one cell, Space waits, R restarts after death.
# Descend the stairs to reach deeper floors. Combat happens on bump.

const CELL := 20
const MAP_W := 44
const MAP_H := 26
const HUD_OFFSET := 44  # vertical space reserved for the HUD labels

const COL_BG := Color("0b0e12")
const COL_HIDDEN := Color("0c0f13")
const COL_FLOOR := Color("20262f")
const COL_FLOOR_DIM := Color("151a21")
const COL_WALL := Color("3a414d")
const COL_WALL_DIM := Color("232931")
const COL_PLAYER := Color("eef4ff")
const COL_ENEMY := Color("ff5d5d")
const COL_POTION := Color("ffd166")
const COL_STAIRS := Color("7bd88f")

const START_HP := 20
const START_ATK := 3
const FOV_RADIUS := 8

var rng := RandomNumberGenerator.new()

var grid: Array = []      # grid[y][x] : WALL / FLOOR
var explored: Array = []  # grid[y][x] : bool
var sight: Array = []     # grid[y][x] : bool
var cells: Array = []     # grid[y][x] : ColorRect

var player_pos := Vector2i.ZERO
var player_hp := START_HP
var player_atk := START_ATK
var floor_num := 1

var enemies: Array = []   # {pos, hp, atk, node}
var potions: Array = []   # {pos, node}
var stairs_pos := Vector2i.ZERO
var stairs_node: ColorRect

var running := true
var message := ""
var player_node: ColorRect

var map_root: Node2D
var hud_label: Label
var msg_label: Label


func _ready() -> void:
	rng.randomize()
	_setup_ui()
	_new_game()


func _setup_ui() -> void:
	map_root = Node2D.new()
	map_root.position = Vector2(0, HUD_OFFSET)
	add_child(map_root)

	hud_label = Label.new()
	hud_label.add_theme_font_size_override("font_size", 16)
	hud_label.add_theme_color_override("font_color", Color("cfd6e4"))
	hud_label.position = Vector2(8, 6)
	add_child(hud_label)

	msg_label = Label.new()
	msg_label.add_theme_font_size_override("font_size", 15)
	msg_label.add_theme_color_override("font_color", Color("ffd166"))
	msg_label.position = Vector2(8, 28)
	add_child(msg_label)


# ---------------------------------------------------------------- game flow

func _new_game() -> void:
	floor_num = 1
	player_hp = START_HP
	player_atk = START_ATK
	running = true
	message = ""
	_generate_level()


func _generate_level() -> void:
	grid = []
	explored = []
	sight = []
	cells = []
	enemies = []
	potions = []
	_clear_nodes()

	var data := Dungeon.generate(MAP_W, MAP_H, rng)
	grid = data["grid"]
	stairs_pos = data["stairs"]
	player_pos = data["start"]

	for y in range(MAP_H):
		explored.append([])
		sight.append([])
		for x in range(MAP_W):
			explored[y].append(false)
			sight[y].append(false)

	_build_cell_nodes()
	player_node = _make_entity_node(COL_PLAYER, player_pos, 3)
	_spawn_entities()
	_update_fov()
	_render_all()
	_update_hud()


func _clear_nodes() -> void:
	for c in map_root.get_children():
		c.queue_free()
	stairs_node = null


# ---------------------------------------------------------------- spawning

func _make_entity_node(color: Color, pos: Vector2i, inset: int) -> ColorRect:
	var r := ColorRect.new()
	r.position = Vector2(pos.x * CELL + inset, pos.y * CELL + inset)
	r.size = Vector2(CELL - inset * 2, CELL - inset * 2)
	r.color = color
	r.visible = false
	map_root.add_child(r)
	return r


func _spawn_entities() -> void:
	var free_cells: Array = []
	for y in range(MAP_H):
		for x in range(MAP_W):
			var p := Vector2i(x, y)
			if grid[y][x] == Dungeon.FLOOR and p != player_pos and p != stairs_pos:
				free_cells.append(p)
	_shuffle(free_cells)

	var idx := 0
	var n_enemies := mini(6 + floor_num, 14)
	for i in range(n_enemies):
		if idx >= free_cells.size():
			break
		var p: Vector2i = free_cells[idx]
		idx += 1
		if player_pos.distance_to(p) < 5.0:
			continue
		var hp := 3 + floor_num
		var atk := 1 + floor_num / 2
		enemies.append({"pos": p, "hp": hp, "atk": atk, "node": _make_entity_node(COL_ENEMY, p, 4)})

	for i in range(rng.randi_range(2, 4)):
		if idx >= free_cells.size():
			break
		var p: Vector2i = free_cells[idx]
		idx += 1
		if player_pos.distance_to(p) < 4.0:
			continue
		potions.append({"pos": p, "node": _make_entity_node(COL_POTION, p, 6)})

	stairs_node = _make_entity_node(COL_STAIRS, stairs_pos, 5)


func _shuffle(arr: Array) -> void:
	for i in range(arr.size() - 1, 0, -1):
		var j := rng.randi_range(0, i)
		var tmp = arr[i]
		arr[i] = arr[j]
		arr[j] = tmp


# ---------------------------------------------------------------- input & turns

const REPEAT_DELAY := 0.25   # seconds held before first auto-repeat
const REPEAT_RATE := 0.09    # seconds between repeats while held

var _was_holding := false
var _hold_elapsed := 0.0
var _next_repeat := REPEAT_DELAY

func _process(delta: float) -> void:
	if not running:
		return
	var dir := _get_held_dir()
	if dir == Vector2i.ZERO:
		_was_holding = false
		_hold_elapsed = 0.0
		_next_repeat = REPEAT_DELAY
		return
	if not _was_holding:
		# Fresh key press: move immediately, then repeat while held.
		_was_holding = true
		_hold_elapsed = 0.0
		_next_repeat = REPEAT_DELAY
		_player_act(dir)
		return
	_hold_elapsed += delta
	if _hold_elapsed >= _next_repeat:
		_hold_elapsed = 0.0
		_next_repeat = REPEAT_RATE
		_player_act(dir)


func _get_held_dir() -> Vector2i:
	if Input.is_action_pressed("move_left"):
		return Vector2i(-1, 0)
	if Input.is_action_pressed("move_right"):
		return Vector2i(1, 0)
	if Input.is_action_pressed("move_up"):
		return Vector2i(0, -1)
	if Input.is_action_pressed("move_down"):
		return Vector2i(0, 1)
	return Vector2i.ZERO


func _unhandled_input(event: InputEvent) -> void:
	if not running:
		if event.is_action_pressed("restart"):
			_new_game()
		return
	if event.is_action_pressed("wait"):
		message = "You wait."
		_enemy_turn()
		_update_fov()
		_render_all()
		_update_hud()


func _player_act(dir: Vector2i) -> void:
	var target := player_pos + dir
	message = ""

	# Bump attack on an enemy.
	var enemy = _enemy_at(target)
	if enemy:
		enemy.hp -= player_atk
		message = "You strike the enemy for %d." % player_atk
		if enemy.hp <= 0:
			message += " It is slain."
			_remove_enemy(enemy)
		_enemy_turn()
		_update_fov()
		_render_all()
		_update_hud()
		return

	# Pick up a potion (still move onto that cell).
	var potion = _potion_at(target)
	if potion:
		_remove_potion(potion)
		player_hp = mini(player_hp + 5, START_HP)
		message = "You drink a healing potion (+5 HP)."

	# Descend the stairs.
	if target == stairs_pos:
		floor_num += 1
		_generate_level()
		return

	if _is_wall(target):
		message = "A solid wall blocks your path."
		return

	player_pos = target
	_enemy_turn()
	_update_fov()
	_render_all()
	_update_hud()


func _enemy_turn() -> void:
	for e in enemies:
		var dist := maxi(abs(e.pos.x - player_pos.x), abs(e.pos.y - player_pos.y))
		if dist <= 1:
			player_hp -= e.atk
			message += " An enemy hits you for %d." % e.atk
			if player_hp <= 0:
				running = false
				message = "You died on floor %d. Press R to restart." % floor_num
				_update_fov()
				_render_all()
				_update_hud()
				return
		elif _can_see(e.pos, player_pos):
			var step := _path_step(e.pos, player_pos)
			if _is_floor(step) and step != player_pos and not _enemy_at(step):
				e.pos = step
	if running:
		_update_fov()
		_render_all()
		_update_hud()


# ---------------------------------------------------------------- queries

func _in_bounds(p: Vector2i) -> bool:
	return p.x >= 0 and p.y >= 0 and p.x < MAP_W and p.y < MAP_H


func _is_floor(p: Vector2i) -> bool:
	return _in_bounds(p) and grid[p.y][p.x] == Dungeon.FLOOR


func _is_wall(p: Vector2i) -> bool:
	return _in_bounds(p) and grid[p.y][p.x] == Dungeon.WALL


func _enemy_at(p: Vector2i):
	for e in enemies:
		if e.pos == p:
			return e
	return null


func _potion_at(p: Vector2i):
	for po in potions:
		if po.pos == p:
			return po
	return null


func _remove_enemy(e) -> void:
	e.node.queue_free()
	enemies.erase(e)


func _remove_potion(po) -> void:
	po.node.queue_free()
	potions.erase(po)


# ---------------------------------------------------------------- line of sight

func _can_see(a: Vector2i, b: Vector2i) -> bool:
	for p in _line(a, b):
		if p == b:
			return true
		if _is_wall(p):
			return false
	return true


func _line(a: Vector2i, b: Vector2i) -> Array:
	var pts: Array = []
	var x0 := a.x
	var y0 := a.y
	var x1 := b.x
	var y1 := b.y
	var dx := absi(x1 - x0)
	var sx := 1 if x0 < x1 else -1
	var dy := -absi(y1 - y0)
	var sy := 1 if y0 < y1 else -1
	var err := dx + dy
	while true:
		if x0 == x1 and y0 == y1:
			break
		pts.append(Vector2i(x0, y0))
		var e2 := 2 * err
		if e2 >= dy:
			err += dy
			x0 += sx
		if e2 <= dx:
			err += dx
			y0 += sy
	return pts


func _update_fov() -> void:
	for y in range(MAP_H):
		for x in range(MAP_W):
			sight[y][x] = false
	for dy in range(-FOV_RADIUS, FOV_RADIUS + 1):
		for dx in range(-FOV_RADIUS, FOV_RADIUS + 1):
			if dx * dx + dy * dy > FOV_RADIUS * FOV_RADIUS:
				continue
			var p := player_pos + Vector2i(dx, dy)
			if not _in_bounds(p):
				continue
			if _can_see(player_pos, p):
				sight[p.y][p.x] = true
				explored[p.y][p.x] = true


# ---------------------------------------------------------------- pathfinding

func _path_step(from: Vector2i, to: Vector2i) -> Vector2i:
	if from == to:
		return from
	var dirs := [Vector2i(1, 0), Vector2i(-1, 0), Vector2i(0, 1), Vector2i(0, -1)]
	var queue: Array = [from]
	var came := {from: from}
	while not queue.is_empty():
		var cur: Vector2i = queue.pop_front()
		if cur == to:
			break
		for d in dirs:
			var n: Vector2i = cur + d
			if _is_floor(n) and not came.has(n):
				came[n] = cur
				queue.append(n)
	if not came.has(to):
		return from
	var node: Vector2i = to
	while came[node] != from:
		if not came.has(node):
			return from
		node = came[node]
	return node


# ---------------------------------------------------------------- rendering

func _build_cell_nodes() -> void:
	for y in range(MAP_H):
		cells.append([])
		for x in range(MAP_W):
			var r := ColorRect.new()
			r.position = Vector2(x * CELL, y * CELL)
			r.size = Vector2(CELL, CELL)
			r.color = COL_HIDDEN
			map_root.add_child(r)
			cells[y].append(r)


func _cell_color(x: int, y: int) -> Color:
	if not explored[y][x]:
		return COL_HIDDEN
	var is_floor: bool = grid[y][x] == Dungeon.FLOOR
	if sight[y][x]:
		return COL_FLOOR if is_floor else COL_WALL
	return COL_FLOOR_DIM if is_floor else COL_WALL_DIM


func _place_node(node: ColorRect, pos: Vector2i, inset: int) -> void:
	node.position = Vector2(pos.x * CELL + inset, pos.y * CELL + inset)


func _render_all() -> void:
	for y in range(MAP_H):
		for x in range(MAP_W):
			cells[y][x].color = _cell_color(x, y)
	for e in enemies:
		e.node.visible = sight[e.pos.y][e.pos.x]
		_place_node(e.node, e.pos, 4)
	for po in potions:
		po.node.visible = sight[po.pos.y][po.pos.x]
	if stairs_node:
		stairs_node.visible = sight[stairs_pos.y][stairs_pos.x]
	player_node.visible = true
	_place_node(player_node, player_pos, 3)


func _update_hud() -> void:
	hud_label.text = "HP %d/%d   ATK %d   FLOOR %d" % [player_hp, START_HP, player_atk, floor_num]
	msg_label.text = message
