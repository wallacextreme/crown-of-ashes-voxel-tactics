import argparse
import math
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
OUT_MODELS_DIR = os.path.join(PROJECT_ROOT, "public", "assets", "models", "props")
OUT_QA_DIR = os.path.join(PROJECT_ROOT, "art_pipeline", "renders_qa")


def reset_scene() -> None:
    bpy.ops.wm.read_factory_settings(use_empty=True)
    clear_material_cache()


def _build_tree() -> list[bpy.types.Object]:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, 0.10), (0.62, 0.24, 0.20), "wood", 0x5C3A21, bone="root", bevel=0.015, taper_top=0.72)
    b.add_box((0.0, 0.0, 0.10), (0.24, 0.62, 0.20), "wood", 0x5C3A21, bone="root", bevel=0.015, taper_top=0.72)
    b.add_prism((0.0, 0.0, 0.45), 0.18, 0.13, 0.72, 6, "wood", 0x78350F, bone="root", bevel=0.012)
    b.add_box((0.0, 0.0, 0.90), (0.94, 0.92, 0.34), "foliage", 0x166534, bone="root", bevel=0.028, taper_top=0.90)
    b.add_box((-0.14, 0.10, 1.16), (0.76, 0.74, 0.28), "foliage", 0x15803D, bone="root", bevel=0.025, taper_top=0.88, rot_euler=(0.0, 0.0, 0.22))
    b.add_box((0.08, -0.08, 1.38), (0.50, 0.50, 0.24), "foliage", 0x22C55E, bone="root", bevel=0.022, taper_top=0.75)
    return [b.build_mesh("tree", rigged=False, ground_to_zero=True)]


def _build_tree_swamp() -> list[bpy.types.Object]:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, 0.12), (0.58, 0.58, 0.24), "wood", 0x3B2F2F, bone="root", bevel=0.016, taper_top=0.65)
    b.add_prism((0.0, 0.0, 0.52), 0.17, 0.11, 0.70, 6, "wood", 0x44403C, bone="root", bevel=0.012, rot_euler=(0.06, -0.08, 0.0))
    # Gnarled twisted limbs + hanging swamp moss
    b.add_box((-0.28, 0.0, 0.88), (0.48, 0.15, 0.14), "wood", 0x44403C, bone="root", bevel=0.012, rot_euler=(0.0, 0.35, 0.18))
    b.add_box((0.28, -0.05, 0.96), (0.46, 0.15, 0.14), "wood", 0x44403C, bone="root", bevel=0.012, rot_euler=(0.0, -0.30, -0.22))
    b.add_box((-0.42, 0.0, 0.64), (0.14, 0.14, 0.30), "foliage", 0x4D7C0F, bone="root", bevel=0.010)
    b.add_box((0.40, -0.06, 0.74), (0.14, 0.14, 0.28), "foliage", 0x65A30D, bone="root", bevel=0.010)
    return [b.build_mesh("tree_swamp", rigged=False, ground_to_zero=True)]


def _build_pine() -> list[bpy.types.Object]:
    b = SculptedModelBuilder()
    b.add_prism((0.0, 0.0, 0.26), 0.16, 0.12, 0.52, 6, "wood", 0x5C3A21, bone="root", bevel=0.010)
    tiers = [
        (0.56, 0.62, 0.42, 0.32, 0x14532D, "foliage"),
        (0.84, 0.50, 0.32, 0.30, 0x166534, "foliage"),
        (1.10, 0.38, 0.20, 0.28, 0x15803D, "foliage"),
        (1.32, 0.26, 0.04, 0.26, 0xCBD5E1, "cloth"),  # Snow-capped tip
    ]
    for cz, rb, rt, h, col, kind in tiers:
        b.add_prism((0.0, 0.0, cz), rb, rt, h, 8, kind, col, bone="root", bevel=0.012)
    return [b.build_mesh("pine", rigged=False, ground_to_zero=True)]


def _build_rock() -> list[bpy.types.Object]:
    b = SculptedModelBuilder()
    b.add_prism((0.0, 0.0, 0.18), 0.46, 0.36, 0.36, 6, "stone", 0x57534E, bone="root", bevel=0.018)
    b.add_prism((-0.14, 0.10, 0.40), 0.30, 0.18, 0.28, 5, "stone", 0x78716C, bone="root", bevel=0.015, rot_euler=(0.15, -0.18, 0.4))
    b.add_prism((0.20, -0.14, 0.22), 0.22, 0.12, 0.24, 5, "stone", 0x6B6661, bone="root", bevel=0.012, rot_euler=(-0.12, 0.20, 0.8))
    return [b.build_mesh("rock", rigged=False, ground_to_zero=True)]


def _build_torch() -> list[bpy.types.Object]:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, 0.10), (0.40, 0.40, 0.20), "steel", 0x292524, bone="root", bevel=0.014, taper_top=0.82)
    b.add_prism((0.0, 0.0, 0.44), 0.11, 0.09, 0.52, 6, "steel", 0x3F3F46, bone="root", bevel=0.008)
    b.add_prism((0.0, 0.0, 0.74), 0.14, 0.24, 0.16, 8, "gold", 0xB45309, bone="root", bevel=0.008)
    b.add_prism((0.0, 0.0, 0.94), 0.14, 0.04, 0.28, 5, "emissive", 0xF97316, bone="root", bevel=0.006)
    b.add_prism((0.0, 0.0, 1.12), 0.07, 0.01, 0.20, 4, "emissive", 0xFEF08A, bone="root", bevel=0.004)
    return [b.build_mesh("torch", rigged=False, ground_to_zero=True)]


def _build_brazier() -> list[bpy.types.Object]:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, 0.12), (0.56, 0.56, 0.24), "obsidian", 0x18181B, bone="root", bevel=0.016, taper_top=0.84)
    b.add_prism((0.0, 0.0, 0.42), 0.20, 0.34, 0.36, 8, "gold", 0xD97706, bone="root", bevel=0.010)
    b.add_prism((0.0, 0.0, 0.60), 0.26, 0.26, 0.10, 8, "emissive", 0xEA580C, bone="root", bevel=0.006)
    b.add_prism((0.0, 0.0, 0.84), 0.20, 0.04, 0.40, 5, "emissive", 0xF97316, bone="root", bevel=0.008)
    b.add_prism((0.0, 0.0, 1.06), 0.10, 0.01, 0.24, 4, "emissive", 0xFEF08A, bone="root", bevel=0.004)
    return [b.build_mesh("brazier", rigged=False, ground_to_zero=True)]


def _build_pillar() -> list[bpy.types.Object]:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, 0.12), (0.56, 0.56, 0.24), "stone", 0x57534E, bone="root", bevel=0.015, taper_top=0.90)
    b.add_prism((0.0, 0.0, 0.72), 0.21, 0.19, 1.00, 8, "stone", 0x6B6661, bone="root", bevel=0.010)
    b.add_box((0.0, 0.0, 1.28), (0.52, 0.52, 0.18), "stone", 0x78716C, bone="root", bevel=0.014, taper_top=1.10)
    b.add_box((-0.14, -0.20, 0.42), (0.18, 0.08, 0.28), "foliage", 0x4D7C0F, bone="root", bevel=0.010)
    return [b.build_mesh("pillar", rigged=False, ground_to_zero=True)]


def _build_ruin_wall() -> list[bpy.types.Object]:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, 0.09), (1.18, 0.52, 0.18), "stone", 0x44403C, bone="root", bevel=0.014)
    b.add_box((-0.42, 0.0, 0.56), (0.30, 0.42, 0.80), "stone", 0x57534E, bone="root", bevel=0.014)
    b.add_box((0.42, 0.0, 0.42), (0.30, 0.42, 0.52), "stone", 0x57534E, bone="root", bevel=0.014)
    b.add_box((-0.12, 0.0, 1.02), (0.86, 0.40, 0.22), "stone", 0x6B6661, bone="root", bevel=0.014, taper_top=0.92)
    b.add_box((-0.34, -0.22, 0.48), (0.26, 0.07, 0.34), "foliage", 0x4D7C0F, bone="root", bevel=0.010)
    return [b.build_mesh("ruin_wall", rigged=False, ground_to_zero=True)]


def _build_ruin_wall_arctic() -> list[bpy.types.Object]:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, 0.46), (1.32, 0.46, 0.92), "stone", 0x64748B, bone="root", bevel=0.016)
    for mx in (-0.44, 0.0, 0.44):
        b.add_box((mx, 0.0, 1.04), (0.30, 0.44, 0.26), "stone", 0x94A3B8, bone="root", bevel=0.012)
        b.add_box((mx, 0.0, 1.20), (0.32, 0.46, 0.09), "cloth", 0xCBD5E1, bone="root", bevel=0.010)
    return [b.build_mesh("ruin_wall_arctic", rigged=False, ground_to_zero=True)]


def _build_banner() -> list[bpy.types.Object]:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, 0.08), (0.36, 0.36, 0.16), "stone", 0x475569, bone="root", bevel=0.012, taper_top=0.85)
    b.add_prism((0.0, 0.0, 0.86), 0.045, 0.04, 1.44, 6, "steel", 0x94A3B8, bone="root", bevel=0.004)
    b.add_box((0.0, -0.02, 1.38), (0.64, 0.06, 0.06), "gold", 0xF59E0B, bone="root", bevel=0.006)
    b.add_prism((0.0, 0.0, 1.66), 0.07, 0.01, 0.18, 4, "gold", 0xF59E0B, bone="root", bevel=0.004)
    b.add_box((0.0, -0.05, 0.96), (0.48, 0.05, 0.78), "cloth", 0x1D4ED8, bone="root", bevel=0.008, taper_top=1.08)
    b.add_prism((0.0, -0.085, 1.02), 0.10, 0.02, 0.05, 4, "emissive", 0xFBBF24, bone="root", bevel=0.003, rot_euler=(math.pi / 2, 0.0, 0.0))
    return [b.build_mesh("banner", rigged=False, ground_to_zero=True)]


def _build_crystal() -> list[bpy.types.Object]:
    b = SculptedModelBuilder()
    b.add_prism((0.0, 0.0, 0.12), 0.36, 0.28, 0.24, 6, "stone", 0x334155, bone="root", bevel=0.014)
    b.add_prism((0.0, 0.0, 0.68), 0.16, 0.02, 0.94, 6, "emissive", 0x38BDF8, bone="root", bevel=0.008)
    b.add_prism((-0.18, -0.10, 0.48), 0.12, 0.02, 0.62, 6, "emissive", 0x7DD3FC, bone="root", bevel=0.006, rot_euler=(-0.18, -0.28, 0.0))
    b.add_prism((0.17, 0.12, 0.44), 0.11, 0.02, 0.56, 6, "emissive", 0xBAE6FD, bone="root", bevel=0.006, rot_euler=(0.20, 0.24, 0.0))
    return [b.build_mesh("crystal", rigged=False, ground_to_zero=True)]


def _build_statue() -> list[bpy.types.Object]:
    b = SculptedModelBuilder()
    b.add_box((0.0, 0.0, 0.12), (0.64, 0.64, 0.24), "stone", 0x475569, bone="root", bevel=0.015, taper_top=0.90)
    b.add_box((0.0, 0.0, 0.32), (0.50, 0.50, 0.16), "stone", 0x64748B, bone="root", bevel=0.012)
    # Guardian torso, cloak, helm & carved stone sword
    b.add_box((0.0, 0.0, 0.68), (0.40, 0.26, 0.56), "stone", 0x64748B, bone="root", bevel=0.014, taper_top=0.92)
    b.add_box((0.0, 0.0, 1.09), (0.26, 0.26, 0.28), "stone", 0x94A3B8, bone="root", bevel=0.014)
    b.add_box((0.0, -0.18, 0.64), (0.14, 0.09, 0.52), "stone", 0x94A3B8, bone="root", bevel=0.008)
    b.add_box((-0.26, -0.04, 0.72), (0.12, 0.24, 0.40), "stone", 0x475569, bone="root", bevel=0.010)
    return [b.build_mesh("statue", rigged=False, ground_to_zero=True)]


def _build_chest() -> list[bpy.types.Object]:
    wood = 0x78350F
    wood_lid = 0x92400E
    gold = 0xF59E0B

    base_b = SculptedModelBuilder()
    base_b.add_box((0.0, 0.0, 0.18), (0.64, 0.44, 0.34), "wood", wood, bone="root", bevel=0.012)
    for sx in (-0.28, 0.28):
        base_b.add_box((sx, 0.0, 0.18), (0.10, 0.46, 0.35), "gold", gold, bone="root", bevel=0.008)
    base_b.add_box((0.0, -0.23, 0.31), (0.14, 0.04, 0.12), "gold", gold, bone="root", bevel=0.006)
    base_b.add_prism((0.0, -0.25, 0.31), 0.035, 0.015, 0.03, 4, "emissive", 0xFEF08A, bone="root", bevel=0.003, rot_euler=(math.pi / 2, 0.0, 0.0))
    base_b.add_box((0.0, 0.0, 0.33), (0.48, 0.30, 0.04), "emissive", 0xFACC15, bone="root", bevel=0.005)
    base_obj = base_b.build_mesh("ChestBase", rigged=False, ground_to_zero=True)

    lid_b = SculptedModelBuilder()
    lid_b.add_box((0.0, -0.22, 0.09), (0.66, 0.46, 0.18), "wood", wood_lid, bone="root", bevel=0.014, taper_top=0.88)
    for sx in (-0.28, 0.28):
        lid_b.add_box((sx, -0.22, 0.095), (0.10, 0.48, 0.19), "gold", gold, bone="root", bevel=0.008, taper_top=0.88)
    lid_obj = lid_b.build_mesh("ChestLid", rigged=False, ground_to_zero=False)
    lid_obj.location = (0.0, 0.22, 0.35)
    return [base_obj, lid_obj]


PROP_BUILDERS = {
    "tree": _build_tree,
    "tree_swamp": _build_tree_swamp,
    "pine": _build_pine,
    "rock": _build_rock,
    "torch": _build_torch,
    "brazier": _build_brazier,
    "pillar": _build_pillar,
    "ruin_wall": _build_ruin_wall,
    "ruin_wall_arctic": _build_ruin_wall_arctic,
    "banner": _build_banner,
    "crystal": _build_crystal,
    "statue": _build_statue,
    "chest": _build_chest,
}


def main() -> None:
    argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", nargs="*", default=None)
    parser.add_argument("--no-qa", action="store_true")
    parser.add_argument("--qa-name", default="props_all.png")
    args = parser.parse_args(argv)

    targets = args.only if args.only else list(PROP_BUILDERS.keys())

    for key in targets:
        if key not in PROP_BUILDERS:
            raise ValueError(f"Unknown prop: {key}")
        reset_scene()
        objs = PROP_BUILDERS[key]()
        out_glb = os.path.join(OUT_MODELS_DIR, f"{key}.glb")
        export_static_glb(objs, out_glb)
        validate_glb(out_glb, expect_rigged=False, max_kb=200.0, max_tris=2500)

    if not args.no_qa:
        reset_scene()
        qa_objs: list[bpy.types.Object] = []
        cols = 5 if len(targets) > 6 else len(targets)
        rows = (len(targets) + cols - 1) // cols
        spacing = 1.65
        for idx, key in enumerate(targets):
            objs = PROP_BUILDERS[key]()
            ox = (idx % cols - (cols - 1) * 0.5) * spacing
            oy = (idx // cols - (rows - 1) * 0.5) * spacing
            for o in objs:
                o.location.x += ox
                o.location.y += oy
                qa_objs.append(o)
        qa_path = os.path.join(OUT_QA_DIR, args.qa_name)
        render_contact_sheet(qa_objs, qa_path, tile_size=448 if len(targets) > 6 else 384)
        print(f"[QA PNG] {qa_path}")


if __name__ == "__main__":
    main()
