"""
Blender Python Script: Parametric Organic Sculpture
Generates a beautiful 3D model with flowing forms, custom materials, and lighting.
"""

import bpy
import bmesh
from mathutils import Vector
import math

# Clear existing mesh objects
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Clear existing materials
for material in bpy.data.materials:
    bpy.data.materials.remove(material)

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def create_material(name, base_color, metallic=0.0, roughness=0.5, emission_strength=0.0):
    """Create a material with principled shader."""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes['Principled BSDF']
    bsdf.inputs['Base Color'].default_value = base_color
    bsdf.inputs['Metallic'].default_value = metallic
    bsdf.inputs['Roughness'].default_value = roughness
    bsdf.inputs['Emission Strength'].default_value = emission_strength
    return mat

def add_smooth_subdivision(obj, levels=2):
    """Add smooth subdivision surface modifier."""
    modifier = obj.modifiers.new(name='Subdivision', type='SUBSURF')
    modifier.levels = levels
    modifier.render_levels = levels

# ============================================================================
# CREATE MAIN SCULPTURE: PARAMETRIC WAVE TORUS
# ============================================================================

def create_wave_torus(major_radius=3, minor_radius=0.8, waves=5, amplitude=0.3, segments=64):
    """
    Create a beautiful parametric torus with wave deformations.
    """
    vertices = []
    faces = []
    
    # Generate vertices
    for i in range(segments):
        theta = (i / segments) * math.pi * 2
        
        for j in range(segments):
            phi = (j / segments) * math.pi * 2
            
            # Base torus
            x = (major_radius + minor_radius * math.cos(phi)) * math.cos(theta)
            y = (major_radius + minor_radius * math.cos(phi)) * math.sin(theta)
            z = minor_radius * math.sin(phi)
            
            # Apply wave deformation
            wave = amplitude * math.sin(waves * theta) * math.sin(phi)
            radial_dist = math.sqrt(x**2 + y**2)
            if radial_dist > 0:
                x += (x / radial_dist) * wave
                y += (y / radial_dist) * wave
            
            vertices.append((x, y, z))
    
    # Generate faces
    for i in range(segments):
        for j in range(segments):
            v1 = i * segments + j
            v2 = i * segments + (j + 1) % segments
            v3 = ((i + 1) % segments) * segments + (j + 1) % segments
            v4 = ((i + 1) % segments) * segments + j
            
            faces.append((v1, v2, v3, v4))
    
    # Create mesh and object
    mesh = bpy.data.meshes.new('WaveTorus')
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    
    obj = bpy.data.objects.new('WaveTorus', mesh)
    bpy.context.collection.objects.link(obj)
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    
    # Smooth shading
    bpy.ops.object.shade_smooth()
    
    # Add subdivision for smoothness
    add_smooth_subdivision(obj, levels=2)
    
    return obj

# ============================================================================
# CREATE SECONDARY ELEMENTS
# ============================================================================

def create_spheres_ring(parent_obj, num_spheres=8, orbit_radius=6, sphere_radius=0.6):
    """Create orbiting spheres around the main sculpture."""
    spheres = []
    for i in range(num_spheres):
        angle = (i / num_spheres) * math.pi * 2
        
        x = orbit_radius * math.cos(angle)
        y = orbit_radius * math.sin(angle)
        z = 1.5 * math.sin(angle * 2)
        
        bpy.ops.mesh.primitive_uv_sphere_add(radius=sphere_radius, location=(x, y, z))
        sphere = bpy.context.active_object
        
        # Color variation
        hue = i / num_spheres
        color = hsv_to_rgb(hue, 0.7, 0.9)
        mat = create_material(f'SphereMat{i}', color, metallic=0.4, roughness=0.3)
        sphere.data.materials.append(mat)
        
        add_smooth_subdivision(sphere, levels=2)
        spheres.append(sphere)
    
    return spheres

def hsv_to_rgb(h, s, v):
    """Convert HSV to RGB color."""
    c = v * s
    x = c * (1 - abs((h * 6) % 2 - 1))
    m = v - c
    
    if h < 1/6:
        r, g, b = c, x, 0
    elif h < 2/6:
        r, g, b = x, c, 0
    elif h < 3/6:
        r, g, b = 0, c, x
    elif h < 4/6:
        r, g, b = 0, x, c
    elif h < 5/6:
        r, g, b = x, 0, c
    else:
        r, g, b = c, 0, x
    
    return (r + m, g + m, b + m, 1.0)

# ============================================================================
# CREATE MATERIALS
# ============================================================================

# Main sculpture material - iridescent purple to cyan
main_mat = create_material(
    'MainSculpture',
    (0.4, 0.2, 0.8, 1.0),  # Purple-blue base
    metallic=0.6,
    roughness=0.2,
    emission_strength=0.3
)

# ============================================================================
# BUILD SCENE
# ============================================================================

# Create main wave torus
print("Creating wave torus...")
main_sculpture = create_wave_torus(major_radius=3, minor_radius=0.8, waves=4, amplitude=0.35)
main_sculpture.data.materials.append(main_mat)

# Create orbiting spheres
print("Creating orbiting spheres...")
spheres = create_spheres_ring(main_sculpture, num_spheres=12, orbit_radius=6, sphere_radius=0.5)

# ============================================================================
# LIGHTING SETUP
# ============================================================================

def setup_lighting():
    """Create professional 3-point lighting."""
    
    # Key light (main light)
    bpy.ops.object.light_add(type='SUN', location=(5, 5, 6))
    key_light = bpy.context.active_object
    key_light.data.energy = 1500
    key_light.data.angle = 0.5
    
    # Fill light
    bpy.ops.object.light_add(type='SUN', location=(-3, 2, 4))
    fill_light = bpy.context.active_object
    fill_light.data.energy = 800
    
    # Rim light
    bpy.ops.object.light_add(type='SUN', location=(0, -6, 3))
    rim_light = bpy.context.active_object
    rim_light.data.energy = 600
    
    # Area light for ambient glow
    bpy.ops.object.light_add(type='AREA', location=(0, 0, 5))
    ambient = bpy.context.active_object
    ambient.data.energy = 200
    ambient.data.size = 10

setup_lighting()

# ============================================================================
# CAMERA & RENDER SETUP
# ============================================================================

def setup_camera_and_render():
    """Configure camera and render settings for beautiful output."""
    
    # Create camera
    bpy.ops.object.camera_add(location=(8, 8, 5))
    camera = bpy.context.active_object
    camera.rotation_euler = (1.1, 0, 0.785)
    bpy.context.scene.camera = camera
    
    # Render settings
    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    scene.render.resolution_x = 1920
    scene.render.resolution_y = 1440
    scene.render.samples = 256
    scene.render.use_denoising = True
    
    # Cycles settings for quality
    scene.cycles.use_denoising = True
    scene.cycles.denoiser = 'OPENIMAGEDENOISE'
    scene.cycles.max_bounces = 12
    
    # World background
    world = bpy.context.scene.world
    world.use_nodes = True
    bg = world.node_tree.nodes['Background']
    bg.inputs['Background'].default_value = (0.02, 0.02, 0.04, 1.0)  # Dark blue background
    bg.inputs['Strength'].default_value = 1.5

setup_camera_and_render()

# ============================================================================
# FINAL TWEAKS
# ============================================================================

# Add a subtle animation-ready setup (optional)
print("\n✓ Scene created successfully!")
print("Main sculpture: Wave Torus with parametric deformations")
print("Secondary elements: 12 orbiting metallic spheres")
print("Materials: Custom iridescent and metallic shaders")
print("Lighting: Professional 3-point + ambient setup")
print("Render: Cycles engine with denoising enabled")
print("\nYou can now:")
print("- Adjust 'samples' in render settings for quality/speed trade-off")
print("- Render the scene with Ctrl+F12 or click Render > Render Image")
print("- Animate objects by adding keyframes")
