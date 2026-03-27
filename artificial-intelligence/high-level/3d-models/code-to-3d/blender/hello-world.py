import bpy

# Define vertices (x, y, z) and faces (indices of vertices)
verts = [
    (0, 0, 0),      # 0
    (1, 0, 0),      # 1
    (1, 1, 0),      # 2
    (0, 1, 0),      # 3
    (0.5, 0.5, 1)   # 4  (top point)
]

faces = [
    (0, 1, 4),  # side 1
    (1, 2, 4),  # side 2
    (2, 3, 4),  # side 3
    (3, 0, 4),  # side 4
    (0, 1, 2, 3)  # base
]

# Create mesh and object
mesh = bpy.data.meshes.new("CustomMesh")
obj = bpy.data.objects.new("CustomObject", mesh)

# Link to scene
bpy.context.collection.objects.link(obj)

# Assign geometry
mesh.from_pydata(verts, [], faces)
mesh.update()

# Optional: Select and make active
bpy.context.view_layer.objects.active = obj
obj.select_set(True)