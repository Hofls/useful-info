import bpy
import bmesh
import math
import random
from mathutils import Vector, Color

# Clear existing mesh objects
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.select_by_type(type='MESH')
bpy.ops.object.delete(use_global=False)

# Create materials
def create_material(name, color, emission_strength=0.0, metallic=0.0, roughness=0.5):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links

    # Clear default nodes
    nodes.clear()

    # Create nodes
    output = nodes.new(type='ShaderNodeOutputMaterial')
    output.location = (300, 0)

    principled = nodes.new(type='ShaderNodeBsdfPrincipled')
    principled.location = (0, 0)
    principled.inputs['Base Color'].default_value = (*color, 1.0)
    principled.inputs['Metallic'].default_value = metallic
    principled.inputs['Roughness'].default_value = roughness

    links.new(principled.outputs['BSDF'], output.inputs['Surface'])

    # Add emission if needed
    if emission_strength > 0:
        emission = nodes.new(type='ShaderNodeEmission')
        emission.location = (0, -150)
        emission.inputs['Color'].default_value = (*color, 1.0)
        emission.inputs['Strength'].default_value = emission_strength

        mix = nodes.new(type='ShaderNodeMixShader')
        mix.location = (150, -50)

        links.new(principled.outputs['BSDF'], mix.inputs[1])
        links.new(emission.outputs['Emission'], mix.inputs[2])
        links.new(mix.outputs['Shader'], output.inputs['Surface'])

    return mat

# Create colors
crystal_colors = [
    (0.2, 0.5, 0.9),   # Blue
    (0.6, 0.2, 0.8),   # Purple
    (0.1, 0.8, 0.6),   # Teal
    (0.9, 0.3, 0.5),   # Pink
]

# Create crystal materials
crystal_mats = []
for i, color in enumerate(crystal_colors):
    mat = create_material(f"Crystal_{i}", color, emission_strength=0.2, metallic=0.8, roughness=0.2)
    crystal_mats.append(mat)

# Core material (glowing)
core_mat = create_material("Core", (1.0, 0.5, 0.2), emission_strength=1.5, metallic=0.1, roughness=0.3)

# Particle material (shiny)
particle_mat = create_material("Particle", (1.0, 0.8, 0.4), emission_strength=0.5, metallic=0.9, roughness=0.1)

# Ring material
ring_mat = create_material("Ring", (0.8, 0.6, 1.0), emission_strength=0.3, metallic=0.7, roughness=0.4)

# Create main crystal formation
def create_crystal(location, rotation, scale, material_index):
    bm = bmesh.new()

    # Create a tapered cylinder
    verts = []
    segments = 6
    radius_bottom = scale[0]
    radius_top = scale[0] * 0.3
    height = scale[2]

    # Bottom vertices
    for i in range(segments):
        angle = (2 * math.pi * i) / segments
        x = radius_bottom * math.cos(angle)
        y = radius_bottom * math.sin(angle)
        verts.append(bm.verts.new((x, y, -height/2)))

    # Top vertices
    for i in range(segments):
        angle = (2 * math.pi * i) / segments
        x = radius_top * math.cos(angle)
        y = radius_top * math.sin(angle)
        verts.append(bm.verts.new((x, y, height/2)))

    # Top point
    apex = bm.verts.new((0, 0, height/2 + scale[0] * 0.5))

    bm.verts.ensure_lookup_table()

    # Create faces for sides
    for i in range(segments):
        bottom_i = i
        bottom_next = (i + 1) % segments
        top_i = i + segments
        top_next = (i + 1) % segments + segments

        # Side quad
        bm.faces.new([bm.verts[bottom_i], bm.verts[bottom_next],
                      bm.verts[top_next], bm.verts[top_i]])

        # Top triangles
        bm.faces.new([bm.verts[top_i], bm.verts[top_next], apex])

    # Bottom face
    bottom_verts = [bm.verts[i] for i in range(segments)]
    bm.faces.new(bottom_verts)

    # Create mesh
    mesh = bpy.data.meshes.new("Crystal")
    bm.to_mesh(mesh)
    bm.free()

    # Create object
    obj = bpy.data.objects.new("Crystal", mesh)
    obj.location = location
    obj.rotation_euler = rotation
    obj.scale = scale
    bpy.context.collection.objects.link(obj)

    # Apply material
    if material_index < len(crystal_mats):
        obj.data.materials.append(crystal_mats[material_index])

    return obj

# Create central glowing core
def create_core():
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=32, v_segments=16, radius=0.6)

    mesh = bpy.data.meshes.new("Core")
    bm.to_mesh(mesh)
    bm.free()

    obj = bpy.data.objects.new("Core", mesh)
    obj.location = (0, 0, 0)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(core_mat)

    return obj

# Create magical ring
def create_ring():
    bm = bmesh.new()
    bmesh.ops.create_circle(bm, cap_ends=True, cap_tris=False, segments=64, radius=1.8)

    # Extrude to create thickness
    verts = [v for v in bm.verts]
    for v in verts:
        if abs(v.co.z) < 0.01:
            v.co.z = 0.1

    # Select and extrude
    bmesh.ops.extrude_face_region(bm, geom=[f for f in bm.faces])
    bmesh.ops.translate(bm, vec=(0, 0, -0.2), verts=[v for v in bm.verts if v.co.z > 0])

    mesh = bpy.data.meshes.new("Ring")
    bm.to_mesh(mesh)
    bm.free()

    obj = bpy.data.objects.new("Ring", mesh)
    obj.location = (0, 0, 0)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(ring_mat)

    return obj

# Create floating particles
def create_particles():
    particles = []
    for i in range(200):
        bm = bmesh.new()

        # Create small icosphere
        bmesh.ops.create_icosphere(bm, subdivisions=1, radius=random.uniform(0.05, 0.12))

        mesh = bpy.data.meshes.new(f"Particle_{i}")
        bm.to_mesh(mesh)
        bm.free()

        # Random position in sphere around center
        radius = random.uniform(1.5, 3.2)
        theta = random.uniform(0, 2 * math.pi)
        phi = random.uniform(0, math.pi)

        x = radius * math.sin(phi) * math.cos(theta)
        y = radius * math.sin(phi) * math.sin(theta)
        z = radius * math.cos(phi) * 0.8  # Flatten slightly

        obj = bpy.data.objects.new(f"Particle_{i}", mesh)
        obj.location = (x, y, z)
        bpy.context.collection.objects.link(obj)
        obj.data.materials.append(particle_mat)

        particles.append(obj)

    return particles

# Create main crystal formation (arranged around core)
def create_crystal_formation():
    crystals = []
    num_crystals = 12

    for i in range(num_crystals):
        angle = (2 * math.pi * i) / num_crystals
        radius = 1.0
        x = radius * math.cos(angle)
        y = radius * math.sin(angle)

        # Random variations
        height_scale = random.uniform(0.8, 1.4)
        width_scale = random.uniform(0.4, 0.7)

        # Point towards center slightly
        rot_z = angle + math.pi  # Point outward

        crystal = create_crystal(
            location=(x, y, random.uniform(-0.3, 0.3)),
            rotation=(random.uniform(-0.2, 0.2), random.uniform(-0.2, 0.2), rot_z),
            scale=(width_scale, width_scale, height_scale),
            material_index=i % len(crystal_mats)
        )
        crystals.append(crystal)

    # Add some floating smaller crystals
    for i in range(24):
        angle = random.uniform(0, 2 * math.pi)
        radius = random.uniform(1.2, 2.0)
        x = radius * math.cos(angle)
        y = radius * math.sin(angle)
        z = random.uniform(-0.5, 1.0)

        crystal = create_crystal(
            location=(x, y, z),
            rotation=(random.uniform(0, 2*math.pi), random.uniform(0, 2*math.pi), random.uniform(0, 2*math.pi)),
            scale=(random.uniform(0.2, 0.4), random.uniform(0.2, 0.4), random.uniform(0.4, 0.8)),
            material_index=random.randint(0, len(crystal_mats)-1)
        )
        crystals.append(crystal)

    return crystals

# Setup lighting and camera
def setup_scene():
    # Add camera
    bpy.ops.object.camera_add(location=(5, -5, 4))
    camera = bpy.context.object
    camera.rotation_euler = (math.radians(60), 0, math.radians(45))
    bpy.context.scene.camera = camera

    # Add lights
    # Main light
    bpy.ops.object.light_add(type='SUN', location=(5, 5, 10))
    sun = bpy.context.object
    sun.data.energy = 2.0
    sun.rotation_euler = (math.radians(45), 0, math.radians(45))

    # Fill light
    bpy.ops.object.light_add(type='POINT', location=(-3, -2, 2))
    fill = bpy.context.object
    fill.data.energy = 100
    fill.data.color = (0.8, 0.6, 1.0)

    # Back rim light
    bpy.ops.object.light_add(type='POINT', location=(0, -4, 2))
    rim = bpy.context.object
    rim.data.energy = 150
    rim.data.color = (1.0, 0.5, 0.3)

    # Colored lights for ambiance
    for i in range(3):
        bpy.ops.object.light_add(type='POINT', location=(
            random.uniform(-2, 2),
            random.uniform(-2, 2),
            random.uniform(1, 3)
        ))
        light = bpy.context.object
        light.data.energy = random.uniform(50, 100)
        light.data.color = random.choice([(0.2, 0.5, 1.0), (1.0, 0.3, 0.6), (0.3, 1.0, 0.5)])

    # Add world background
    world = bpy.context.scene.world
    world.use_nodes = True
    nodes = world.node_tree.nodes
    links = world.node_tree.links

    # Clear default nodes
    nodes.clear()

    # Add background node
    bg = nodes.new(type='ShaderNodeBackground')
    bg.inputs['Color'].default_value = (0.05, 0.02, 0.08, 1.0)
    bg.inputs['Strength'].default_value = 0.5

    output = nodes.new(type='ShaderNodeOutputWorld')
    links.new(bg.outputs['Background'], output.inputs['Surface'])

    # Add subtle gradient
    tex = nodes.new(type='ShaderNodeTexGradient')
    tex.gradient_type = 'SPHERICAL'
    mapping = nodes.new(type='ShaderNodeMapping')
    mapping.inputs['Location'].default_value = (0, 0, 0)

    links.new(mapping.outputs['Vector'], tex.inputs['Vector'])

# Generate everything
print("Creating magical crystal formation...")
create_core()
create_ring()
create_crystal_formation()
create_particles()
setup_scene()

print("Done! Your magical crystal formation is ready.")