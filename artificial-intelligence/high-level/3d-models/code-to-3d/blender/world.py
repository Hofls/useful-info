import bpy
import bmesh
import random
from math import radians
from mathutils import Vector

# साफ scene
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# ---------- Helpers ----------
def create_material(name, color=(1,1,1,1), emission_strength=0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links

    for n in nodes:
        nodes.remove(n)

    output = nodes.new(type='ShaderNodeOutputMaterial')

    if emission_strength > 0:
        emission = nodes.new(type='ShaderNodeEmission')
        emission.inputs['Color'].default_value = color
        emission.inputs['Strength'].default_value = emission_strength
        links.new(emission.outputs[0], output.inputs[0])
    else:
        bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
        bsdf.inputs['Base Color'].default_value = color
        bsdf.inputs['Roughness'].default_value = 0.6
        links.new(bsdf.outputs[0], output.inputs[0])

    return mat

# ---------- Materials ----------
grass_mat = create_material("Grass", (0.1, 0.5, 0.1, 1))
rock_mat = create_material("Rock", (0.2, 0.2, 0.25, 1))
trunk_mat = create_material("Trunk", (0.2, 0.1, 0.05, 1))
leaf_mat = create_material("Leaves", (0.1, 0.6, 0.2, 1))
crystal_mat = create_material("Crystal", (0.2, 0.8, 1.0, 1), emission_strength=8)

# ---------- Floating Island ----------
bpy.ops.mesh.primitive_uv_sphere_add(radius=2, location=(0,0,0))
island = bpy.context.object

# edit shape
bpy.ops.object.mode_set(mode='EDIT')
bm = bmesh.from_edit_mesh(island.data)

for v in bm.verts:
    if v.co.z > 0:
        v.co.z *= 0.3  # flatten top
    else:
        v.co.z *= 2.0  # stretch bottom

bmesh.update_edit_mesh(island.data)
bpy.ops.object.mode_set(mode='OBJECT')

# add subdivision
sub = island.modifiers.new("subd", 'SUBSURF')
sub.levels = 2

island.data.materials.append(grass_mat)

# duplicate for rock underside
rock = island.copy()
rock.data = island.data.copy()
bpy.context.collection.objects.link(rock)

rock.location.z -= 0.2
rock.scale *= 0.95
rock.data.materials.clear()
rock.data.materials.append(rock_mat)

# ---------- Crystal ----------
for i in range(5):
    bpy.ops.mesh.primitive_cone_add(
        vertices=6,
        radius1=0.2,
        depth=random.uniform(1.0, 2.0),
        location=(random.uniform(-0.5,0.5), random.uniform(-0.5,0.5), 0.5)
    )
    crystal = bpy.context.object
    crystal.rotation_euler[2] = random.uniform(0, 3.14)
    crystal.data.materials.append(crystal_mat)

# ---------- Trees ----------
def create_tree(pos):
    # trunk
    bpy.ops.mesh.primitive_cylinder_add(radius=0.05, depth=0.5, location=pos)
    trunk = bpy.context.object
    trunk.data.materials.append(trunk_mat)

    # leaves
    bpy.ops.mesh.primitive_ico_sphere_add(radius=0.3, location=(pos[0], pos[1], pos[2]+0.4))
    leaves = bpy.context.object
    leaves.data.materials.append(leaf_mat)

for _ in range(8):
    create_tree((random.uniform(-1,1), random.uniform(-1,1), 0.3))

# ---------- Lighting ----------
bpy.ops.object.light_add(type='SUN', location=(5,5,10))
sun = bpy.context.object
sun.data.energy = 3

bpy.ops.object.light_add(type='POINT', location=(0,0,2))
glow = bpy.context.object
glow.data.energy = 50

# ---------- Camera ----------
bpy.ops.object.camera_add(location=(5, -5, 3))
cam = bpy.context.object
cam.rotation_euler = (radians(65), 0, radians(45))
bpy.context.scene.camera = cam

# ---------- World (fog / atmosphere) ----------
world = bpy.data.worlds["World"]
world.use_nodes = True
nodes = world.node_tree.nodes

bg = nodes["Background"]
bg.inputs[0].default_value = (0.02, 0.02, 0.05, 1)
bg.inputs[1].default_value = 0.5

# ---------- Render Settings ----------
scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.samples = 64

print("✨ Scene Generated Successfully!")