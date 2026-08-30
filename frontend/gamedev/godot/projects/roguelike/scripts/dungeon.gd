class_name Dungeon
# Minimalist random dungeon generation: rooms connected by L-shaped corridors.
# Grid values: WALL (0) / FLOOR (1).

const WALL := 0
const FLOOR := 1

# Returns a Dictionary:
#   grid  -> Array[Array[int]] (grid[y][x])
#   start -> Vector2i (player spawn, first room center)
#   stairs-> Vector2i (descend point, last room center)
static func generate(width: int, height: int, rng: RandomNumberGenerator) -> Dictionary:
	var grid: Array = []
	for y in range(height):
		var row: Array = []
		for x in range(width):
			row.append(WALL)
		grid.append(row)

	var rooms: Array = []
	var max_rooms: int = rng.randi_range(6, 10)
	var min_size := 3
	var max_size := 7

	for i in range(max_rooms):
		var w := rng.randi_range(min_size, max_size)
		var h := rng.randi_range(min_size, max_size)
		var x := rng.randi_range(1, width - w - 2)
		var y := rng.randi_range(1, height - h - 2)
		var new_room := Rect2i(x, y, w, h)

		var failed := false
		for r in rooms:
			if new_room.grow(1).intersects(r):
				failed = true
				break
		if failed:
			continue

		_carve_room(grid, new_room)
		if not rooms.is_empty():
			var prev: Vector2i = _center(rooms[rooms.size() - 1])
			var cur: Vector2i = _center(new_room)
			_carve_corridor(grid, prev, cur)
		rooms.append(new_room)

	var start: Vector2i = _center(rooms[0])
	var stairs: Vector2i = _center(rooms[rooms.size() - 1])
	return {"grid": grid, "start": start, "stairs": stairs}


static func _center(room: Rect2i) -> Vector2i:
	return Vector2i(room.position.x + room.size.x / 2, room.position.y + room.size.y / 2)


static func _carve_room(grid: Array, room: Rect2i) -> void:
	for y in range(room.position.y, room.position.y + room.size.y):
		for x in range(room.position.x, room.position.x + room.size.x):
			grid[y][x] = FLOOR


static func _carve_corridor(grid: Array, from: Vector2i, to: Vector2i) -> void:
	var x := from.x
	var y := from.y
	while x != to.x:
		grid[y][x] = FLOOR
		x += 1 if to.x > x else -1
	while y != to.y:
		grid[y][x] = FLOOR
		y += 1 if to.y > y else -1
