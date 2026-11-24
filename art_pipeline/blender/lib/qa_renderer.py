import math
import os
import tempfile
import bpy
import numpy as np
from mathutils import Vector


def _ensure_studio(scene: bpy.types.Scene) -> list[bpy.types.Object]:
    created: list[bpy.types.Object] = []

    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = 16
    scene.cycles.use_denoising = False
    scene.cycles.max_bounces = 4
    scene.cycles.diffuse_bounces = 2
    scene.cycles.glossy_bounces = 2
    scene.render.image_settings.file_format = "PNG"

    # Dark studio world background
    if not scene.world:
        scene.world = bpy.data.worlds.new("QAStudioWorld")
    if not scene.world.node_tree:
        scene.world.use_nodes = True
    bg = next((n for n in scene.world.node_tree.nodes if n.type == "BACKGROUND"), None)
    if bg:
        bg.inputs["Color"].default_value = (0.04, 0.055, 0.085, 1.0)
        bg.inputs["Strength"].default_value = 0.75

    # Studio 3-point lighting
    def add_light(name: str, ltype: str, loc: tuple[float, float, float], energy: float, color: tuple[float, float, float], rot: tuple[float, float, float] | None = None):
        ld = bpy.data.lights.new(name=name, type=ltype)
        ld.energy = energy
        ld.color = color
        if ltype == "AREA":
            ld.size = 3.5
        lo = bpy.data.objects.new(name, ld)
        lo.location = loc
        if rot:
            lo.rotation_euler = rot
        scene.collection.objects.link(lo)
        created.append(lo)
        return lo

    # Warm Key Light from front-right-top
    key = add_light("QA_Key", "AREA", (3.2, -3.5, 4.2), 320.0, (1.0, 0.94, 0.85))
    # Cool Rim Light from back-left
    rim = add_light("QA_Rim", "AREA", (-3.0, 3.4, 3.0), 220.0, (0.55, 0.82, 1.0))
    # Soft Fill Light from front-left
    fill = add_light("QA_Fill", "AREA", (-3.0, -2.5, 1.8), 95.0, (0.78, 0.88, 1.0))

    for lo in (key, rim, fill):
        direction = Vector((0.0, 0.0, 0.7)) - lo.location
        lo.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()

    # Neutral matte dark turntable pedestal disc below Z=0
    bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=1.8, depth=0.06, location=(0.0, 0.0, -0.032))
    disc = bpy.context.active_object
    disc.name = "QA_FloorDisc"
    mat = bpy.data.materials.new("QA_FloorMat")
    bsdf = next(n for n in mat.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
    bsdf.inputs["Base Color"].default_value = (0.045, 0.055, 0.075, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.88
    disc.data.materials.append(mat)
    created.append(disc)

    return created


def _compute_world_bbox(objs: list[bpy.types.Object]) -> tuple[Vector, Vector]:
    min_v = Vector((float("inf"), float("inf"), float("inf")))
    max_v = Vector((float("-inf"), float("-inf"), float("-inf")))
    depsgraph = bpy.context.evaluated_depsgraph_get()

    for obj in objs:
        if obj.type != "MESH":
            continue
        eval_obj = obj.evaluated_get(depsgraph)
        mesh = eval_obj.to_mesh()
        for v in mesh.vertices:
            wp = eval_obj.matrix_world @ v.co
            min_v.x = min(min_v.x, wp.x)
            min_v.y = min(min_v.y, wp.y)
            min_v.z = min(min_v.z, wp.z)
            max_v.x = max(max_v.x, wp.x)
            max_v.y = max(max_v.y, wp.y)
            max_v.z = max(max_v.z, wp.z)
        eval_obj.to_mesh_clear()

    if min_v.x == float("inf"):
        return Vector((-0.5, -0.5, 0.0)), Vector((0.5, 0.5, 1.5))
    return min_v, max_v


def render_contact_sheet(
    target_objs: list[bpy.types.Object],
    out_png_path: str,
    tile_size: int = 384,
) -> None:
    """
    Render 3 angles (Front -Y, Isometric 3/4, Back +Y) using Cycles CPU and
    stitch into a horizontal PNG contact sheet via numpy + bpy.data.images.
    """
    os.makedirs(os.path.dirname(out_png_path), exist_ok=True)
    scene = bpy.context.scene
    studio_objs = _ensure_studio(scene)

    min_v, max_v = _compute_world_bbox(target_objs)
    center = (min_v + max_v) * 0.5
    size = max_v - min_v
    radius = max(0.65, size.length * 0.55)
    dist = radius * 2.55

    cam_data = bpy.data.cameras.new("QA_Cam")
    cam_data.lens = 45.0
    cam_obj = bpy.data.objects.new("QA_Cam", cam_data)
    scene.collection.objects.link(cam_obj)
    scene.camera = cam_obj

    scene.render.resolution_x = tile_size
    scene.render.resolution_y = tile_size
    scene.render.resolution_percentage = 100

    # Front (-Y), 3/4 Front-Right (+X, -Y, +Z), Back (+Y)
    angles = [
        ("front", Vector((0.0, -dist, size.z * 0.12))),
        ("iso", Vector((dist * 0.68, -dist * 0.68, dist * 0.42))),
        ("back", Vector((0.0, dist, size.z * 0.16))),
    ]

    tmp_dir = tempfile.mkdtemp(prefix="coa_qa_")
    strips: list[np.ndarray] = []

    try:
        for label, offset in angles:
            cam_obj.location = center + offset
            direction = center - cam_obj.location
            cam_obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()

            shot_path = os.path.join(tmp_dir, f"{label}.png")
            scene.render.filepath = shot_path
            bpy.ops.render.render(write_still=True)

            img = bpy.data.images.load(shot_path)
            arr = np.array(img.pixels[:], dtype=np.float32).reshape((tile_size, tile_size, 4))
            strips.append(arr)
            bpy.data.images.remove(img)
            os.remove(shot_path)

        combined = np.concatenate(strips, axis=1)  # (H, W*3, 4)
        sheet_w = tile_size * len(strips)
        out_img = bpy.data.images.new("QA_ContactSheet", width=sheet_w, height=tile_size, alpha=True)
        out_img.pixels.foreach_set(combined.ravel())
        out_img.filepath_raw = out_png_path
        out_img.file_format = "PNG"
        out_img.save()
        bpy.data.images.remove(out_img)
    finally:
        os.rmdir(tmp_dir)
        bpy.data.objects.remove(cam_obj, do_unlink=True)
        bpy.data.cameras.remove(cam_data)
        for obj in studio_objs:
            bpy.data.objects.remove(obj, do_unlink=True)


def stitch_png_grid(png_paths: list[str], out_png_path: str, cols: int = 3) -> None:
    """Stitch equal-sized PNG images into a clean grid via bpy.data.images + numpy."""
    if not png_paths:
        return
    os.makedirs(os.path.dirname(out_png_path), exist_ok=True)
    loaded = []
    w, h = 0, 0
    for p in png_paths:
        img = bpy.data.images.load(p)
        w, h = img.size[0], img.size[1]
        arr = np.array(img.pixels[:], dtype=np.float32).reshape((h, w, 4))
        loaded.append(arr)
        bpy.data.images.remove(img)

    rows = math.ceil(len(loaded) / cols)
    canvas = np.zeros((rows * h, cols * w, 4), dtype=np.float32)
    canvas[:, :, 3] = 1.0
    canvas[:, :, 0:3] = 0.05

    for idx, arr in enumerate(loaded):
        r = rows - 1 - (idx // cols)  # Blender image buffer row 0 is bottom
        c = idx % cols
        canvas[r * h : (r + 1) * h, c * w : (c + 1) * w, :] = arr

    out_img = bpy.data.images.new("QA_Grid", width=cols * w, height=rows * h, alpha=True)
    out_img.pixels.foreach_set(canvas.ravel())
    out_img.filepath_raw = out_png_path
    out_img.file_format = "PNG"
    out_img.save()
    bpy.data.images.remove(out_img)

