import argparse
import os
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
LIB_DIR = os.path.join(SCRIPT_DIR, "lib")
if LIB_DIR not in sys.path:
    sys.path.insert(0, LIB_DIR)

import bpy
from pbr_materials import clear_material_cache
from voxel_builder import SculptedModelBuilder
from rig_and_anim import export_static_glb, validate_glb
from qa_renderer import render_contact_sheet

PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", ".."))
OUT_MODELS_DIR = os.path.join(PROJECT_ROOT, "public", "assets", "models", "terrain")
OUT_QA_DIR = os.path.join(PROJECT_ROOT, "art_pipeline", "renders_qa")

TILE_SIZE = 1.50
STEP_HEIGHT = 0.42


def reset_scene() -> None:
    bpy.ops.wm.read_factory_settings(use_empty=True)
    clear_material_cache()


def _build_cobble() -> bpy.types.Object:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, -0.14), (1.46, 1.46, 0.21), "stone", 0x44403C, bone="root", bevel=0.014)
    stones = [
        (-0.47, -0.47, 0.46, 0.46, 0.0, 0x57534E),
        (0.01, -0.47, 0.44, 0.45, -0.005, 0x6B6661),
        (0.47, -0.46, 0.45, 0.47, 0.002, 0x57534E),
        (-0.46, 0.01, 0.47, 0.44, -0.004, 0x6B6661),
        (0.0, 0.0, 0.45, 0.45, 0.003, 0x57534E),
        (0.47, 0.01, 0.45, 0.44, -0.002, 0x6B6661),
        (-0.47, 0.47, 0.46, 0.45, 0.002, 0x6B6661),
        (0.01, 0.47, 0.44, 0.46, -0.004, 0x57534E),
        (0.47, 0.47, 0.45, 0.45, 0.001, 0x6B6661),
    ]
    for cx, cy, sx, sy, dz, col in stones:
        b.add_box((cx, cy, -0.03 + dz), (sx, sy, 0.06), "stone", col, bone="root", bevel=0.014, taper_top=0.94)
    return b.build_mesh("cobble", rigged=False, ground_to_zero=False)


def _build_grass() -> bpy.types.Object:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, -0.16), (1.45, 1.45, 0.18), "leather", 0x6B4423, bone="root", bevel=0.014)
    b.add_box((0.0, 0.0, -0.035), (1.48, 1.48, 0.07), "foliage", 0x4D7C0F, bone="root", bevel=0.015)
    b.add_box((-0.34, 0.28, -0.005), (0.48, 0.42, 0.02), "foliage", 0x3F6212, bone="root", bevel=0.006)
    b.add_box((0.36, -0.30, -0.005), (0.42, 0.44, 0.02), "foliage", 0x65A30D, bone="root", bevel=0.006)
    return b.build_mesh("grass", rigged=False, ground_to_zero=False)


def _build_stone() -> bpy.types.Object:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, -0.14), (1.46, 1.46, 0.20), "stone", 0x334155, bone="root", bevel=0.014)
    for sx, sy, col in ((-0.36, -0.36, 0x64748B), (0.36, -0.36, 0x475569), (-0.36, 0.36, 0x475569), (0.36, 0.36, 0x64748B)):
        b.add_box((sx, sy, -0.028), (0.71, 0.71, 0.056), "stone", col, bone="root", bevel=0.014, taper_top=0.96)
    return b.build_mesh("stone", rigged=False, ground_to_zero=False)


def _build_wood() -> bpy.types.Object:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, -0.16), (1.44, 1.44, 0.16), "wood", 0x451A03, bone="root", bevel=0.012)
    for i in range(5):
        py = -0.58 + i * 0.29
        col = 0x854D0E if i % 2 == 0 else 0xA16207
        b.add_box((0.0, py, -0.03), (1.48, 0.26, 0.06), "wood", col, bone="root", bevel=0.010)
        for rx in (-0.60, 0.60):
            b.add_box((rx, py, -0.002), (0.04, 0.04, 0.012), "steel", 0x334155, bone="root", bevel=0.003)
    return b.build_mesh("wood", rigged=False, ground_to_zero=False)


def _build_carpet() -> bpy.types.Object:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, -0.14), (1.47, 1.47, 0.22), "stone", 0x44403C, bone="root", bevel=0.014)
    b.add_box((0.0, 0.0, -0.022), (1.36, 1.36, 0.034), "gold", 0xD97706, bone="root", bevel=0.008)
    b.add_box((0.0, 0.0, -0.014), (1.20, 1.20, 0.032), "cloth", 0x9F1239, bone="root", bevel=0.009)
    return b.build_mesh("carpet", rigged=False, ground_to_zero=False)


def _build_snow() -> bpy.types.Object:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, -0.16), (1.45, 1.45, 0.18), "stone", 0x475569, bone="root", bevel=0.014)
    b.add_box((0.0, 0.0, -0.035), (1.48, 1.48, 0.08), "cloth", 0xB8C4D4, bone="root", bevel=0.018, taper_top=0.96)
    b.add_box((-0.30, -0.25, -0.005), (0.62, 0.52, 0.028), "cloth", 0xCBD5E1, bone="root", bevel=0.012)
    b.add_box((0.28, 0.30, -0.005), (0.54, 0.46, 0.026), "cloth", 0xCBD5E1, bone="root", bevel=0.012)
    return b.build_mesh("snow", rigged=False, ground_to_zero=False)


def _build_ice() -> bpy.types.Object:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, -0.15), (1.46, 1.46, 0.20), "ice", 0x0284C7, bone="root", bevel=0.014)
    for sx, sy, col in ((-0.36, -0.36, 0x38BDF8), (0.36, -0.36, 0x7DD3FC), (-0.36, 0.36, 0x7DD3FC), (0.36, 0.36, 0x38BDF8)):
        b.add_box((sx, sy, -0.025), (0.71, 0.71, 0.054), "ice", col, bone="root", bevel=0.015, taper_top=0.93)
    return b.build_mesh("ice", rigged=False, ground_to_zero=False)


def _build_swamp() -> bpy.types.Object:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, -0.16), (1.45, 1.45, 0.18), "leather", 0x3B2814, bone="root", bevel=0.014)
    b.add_box((0.0, 0.0, -0.038), (1.47, 1.47, 0.075), "foliage", 0x365314, bone="root", bevel=0.014)
    # Sunken mossy duckboard planks
    for py, rot in ((-0.26, 0.05), (0.18, -0.07)):
        b.add_box((0.0, py, -0.005), (1.16, 0.24, 0.03), "wood", 0x5C3A21, bone="root", bevel=0.008, rot_euler=(0.0, 0.0, rot))
    return b.build_mesh("swamp", rigged=False, ground_to_zero=False)


def _build_obsidian() -> bpy.types.Object:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, -0.14), (1.46, 1.46, 0.20), "obsidian", 0x18181B, bone="root", bevel=0.014)
    for sx, sy, col in ((-0.36, -0.36, 0x27272A), (0.36, -0.36, 0x34343D), (-0.36, 0.36, 0x34343D), (0.36, 0.36, 0x27272A)):
        b.add_box((sx, sy, -0.025), (0.70, 0.70, 0.052), "obsidian", col, bone="root", bevel=0.014, taper_top=0.94)
    # Subtle glowing ember fissure accent
    b.add_box((0.0, 0.0, -0.02), (0.04, 1.32, 0.02), "emissive", 0x991B1B, bone="root", bevel=0.003)
    return b.build_mesh("obsidian", rigged=False, ground_to_zero=False)


def _build_metal() -> bpy.types.Object:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, -0.14), (1.46, 1.46, 0.20), "steel", 0x334155, bone="root", bevel=0.014)
    b.add_box((0.0, 0.0, -0.025), (1.46, 1.46, 0.05), "steel", 0x64748B, bone="root", bevel=0.014)
    for cx in (-0.54, 0.54):
        for cy in (-0.54, 0.54):
            b.add_box((cx, cy, -0.001), (0.09, 0.09, 0.022), "steel", 0x94A3B8, bone="root", bevel=0.005)
    return b.build_mesh("metal", rigged=False, ground_to_zero=False)


def _build_stair(name: str, mat_kind: str, col_a: int, col_b: int, curb_col: int) -> bpy.types.Object:
    """3 solid beveled steps ascending from -Y (low) to +Y (high, Z=0.0)."""
    b = SculptedModelBuilder()
    step_h = STEP_HEIGHT / 3.0
    for s in range(3):
        top_z = -STEP_HEIGHT + (s + 1) * step_h
        h = top_z - (-STEP_HEIGHT)
        depth = 1.46 / 3.0
        cy = -1.46 * 0.5 + (s + 0.5) * depth
        cz = -STEP_HEIGHT + h * 0.5
        col = col_a if s % 2 == 0 else col_b
        b.add_box((0.0, cy, cz), (1.42, depth + 0.02, h), mat_kind, col, bone="root", bevel=0.013)
    for sx in (-0.69, 0.69):
        b.add_box((sx, 0.0, -0.21), (0.09, 1.46, 0.42), mat_kind, curb_col, bone="root", bevel=0.010)
    return b.build_mesh(name, rigged=False, ground_to_zero=False)


def _build_bridge_wood() -> bpy.types.Object:
    b = SculptedModelBuilder()
    for bx in (-0.52, 0.52):
        b.add_box((bx, 0.0, -0.18), (0.18, 1.48, 0.16), "wood", 0x451A03, bone="root", bevel=0.010)
    for i in range(5):
        py = -0.58 + i * 0.29
        col = 0x92400E if i % 2 == 0 else 0xA16207
        b.add_box((0.0, py, -0.045), (1.46, 0.25, 0.09), "wood", col, bone="root", bevel=0.010)
    return b.build_mesh("bridge_wood", rigged=False, ground_to_zero=False)


def _build_bridge_stone() -> bpy.types.Object:
    b = SculptedModelBuilder()
    for bx in (-0.48, 0.48):
        b.add_box((bx, 0.0, -0.20), (0.24, 1.48, 0.18), "stone", 0x7C3A23, bone="root", bevel=0.012)
    for i in range(4):
        py = -0.54 + i * 0.36
        col = 0xA16244 if i % 2 == 0 else 0x8C5A3C
        b.add_box((0.0, py, -0.05), (1.46, 0.34, 0.10), "stone", col, bone="root", bevel=0.012)
    return b.build_mesh("bridge_stone", rigged=False, ground_to_zero=False)


def _build_column(name: str, main_col: int, dark_col: int, mat_kind: str) -> bpy.types.Object:
    """Unit height 1.0m stratified cliff/masonry column (Z = -1.0 .. 0.0)."""
    b = SculptedModelBuilder()
    courses = 4
    ch = 1.0 / courses
    for i in range(courses):
        cz = -1.0 + (i + 0.5) * ch
        w = 1.42 if i % 2 == 0 else 1.38
        col = main_col if i % 2 == 0 else dark_col
        b.add_box((0.0, 0.0, cz), (w, w, ch), mat_kind, col, bone="root", bevel=0.014)
    return b.build_mesh(name, rigged=False, ground_to_zero=False)


TERRAIN_BUILDERS = {
    "grass": _build_grass,
    "cobble": _build_cobble,
    "stone": _build_stone,
    "wood": _build_wood,
    "carpet": _build_carpet,
    "snow": _build_snow,
    "ice": _build_ice,
    "swamp": _build_swamp,
    "obsidian": _build_obsidian,
    "metal": _build_metal,
    "stair_stone": lambda: _build_stair("stair_stone", "stone", 0x64748B, 0x57534E, 0x475569),
    "stair_metal": lambda: _build_stair("stair_metal", "steel", 0x64748B, 0x475569, 0x334155),
    "bridge_wood": _build_bridge_wood,
    "bridge_stone": _build_bridge_stone,
    "column_stone": lambda: _build_column("column_stone", 0x475569, 0x334155, "stone"),
    "column_earth": lambda: _build_column("column_earth", 0x6B4423, 0x452B14, "leather"),
    "column_canyon": lambda: _build_column("column_canyon", 0x9A4E32, 0x7C3A23, "stone"),
    "column_arctic": lambda: _build_column("column_arctic", 0x475569, 0x334155, "ice"),
    "column_obsidian": lambda: _build_column("column_obsidian", 0x27272A, 0x18181B, "obsidian"),
}


def main() -> None:
    argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", nargs="*", default=None)
    parser.add_argument("--no-qa", action="store_true")
    parser.add_argument("--qa-name", default="terrain_all.png")
    args = parser.parse_args(argv)

    targets = args.only if args.only else list(TERRAIN_BUILDERS.keys())

    for key in targets:
        if key not in TERRAIN_BUILDERS:
            raise ValueError(f"Unknown terrain tile: {key}")
        reset_scene()
        obj = TERRAIN_BUILDERS[key]()
        out_glb = os.path.join(OUT_MODELS_DIR, f"{key}.glb")
        export_static_glb([obj], out_glb)
        validate_glb(out_glb, expect_rigged=False, max_kb=150.0, max_tris=2000)

    if not args.no_qa:
        reset_scene()
        qa_objs: list[bpy.types.Object] = []
        cols = 5 if len(targets) > 9 else 3
        rows = (len(targets) + cols - 1) // cols
        for idx, key in enumerate(targets):
            obj = TERRAIN_BUILDERS[key]()
            cx = (idx % cols - (cols - 1) * 0.5) * 1.85
            cy = (idx // cols - (rows - 1) * 0.5) * 1.85
            obj.location = (cx, cy, 0.35)
            qa_objs.append(obj)
        qa_path = os.path.join(OUT_QA_DIR, args.qa_name)
        render_contact_sheet(qa_objs, qa_path, tile_size=448 if cols > 3 else 384)
        print(f"[QA PNG] {qa_path}")


if __name__ == "__main__":
    main()
