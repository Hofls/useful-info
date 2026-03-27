import bpy
import math

def create_fractal_cube(location, scale, rotation, depth, max_depth):
    if depth > max_depth:
        return

    # Create a new cube
    bpy.ops.mesh.primitive_cube_add(size=2, location=location, rotation=rotation)
    current_cube = bpy.context.active_object
    current_cube.scale = (scale, scale, scale)

    # Simple material assignment
    mat = bpy.data.materials.new(name=f"Fractal_Mat_{depth}")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    nodes["Principled BSDF"].inputs[0].default_value = (0.1, 0.5, 0.8, 1) # Blueish tint
    nodes["Principled BSDF"].inputs[7].default_value = 0.1 # High Specular
    current_cube.data.materials.append(mat)

    # Calculate next steps
    new_scale = scale * 0.5
    offset = scale * 1.5

    # Recursive branches (spawning at 4 top corners)
    directions = [
        (offset, offset, offset),
        (-offset, offset, offset),
        (offset, -offset, offset),
        (-offset, -offset, offset)
    ]

    for d in directions:
        new_loc = (
            location[0] + d[0],
            location[1] + d[1],
            location[2] + d[2]
        )
        create_fractal_cube(new_loc, new_scale, rotation, depth + 1, max_depth)

def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()

# Execution
clear_scene()
create_fractal_cube(location=(0, 0, 0), scale=1.0, rotation=(0, 0, 0), depth=0, max_depth=3)

# Add a light source for the "Beautiful" aspect
bpy.ops.object.light_add(type='AREA', radius=5, location=(5, 5, 10))
bpy.context.active_object.data.energy = 1000