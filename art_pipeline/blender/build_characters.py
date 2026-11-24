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
from rig_and_anim import (
    attach_mesh_to_armature,
    build_all_animations,
    create_humanoid_armature,
    export_rigged_glb,
    validate_glb,
)
from qa_renderer import render_contact_sheet, stitch_png_grid

PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", ".."))
OUT_MODELS_DIR = os.path.join(PROJECT_ROOT, "public", "assets", "models", "characters")
OUT_QA_DIR = os.path.join(PROJECT_ROOT, "art_pipeline", "renders_qa")


def reset_scene() -> None:
    bpy.ops.wm.read_factory_settings(use_empty=True)
    clear_material_cache()


def _add_humanoid_base(
    b: SculptedModelBuilder,
    pal: dict,
    s: float = 1.0,
    has_robe_skirt: bool = False,
    bulk: float = 1.0,
) -> None:
    """Sculpt beveled boots, greaves, knees, thighs, waist belt, torso, arms, and layered pauldrons."""
    bx = bulk
    for side, bone in ((-1, "leg_L"), (1, "leg_R")):
        lx = side * 0.11 * s * bx
        b.add_box((lx, -0.025 * s, 0.03 * s), (0.14 * s * bx, 0.22 * s, 0.06 * s), "leather", pal["leather"], bone=bone, bevel=0.008)
        b.add_box((lx, -0.08 * s, 0.045 * s), (0.12 * s * bx, 0.09 * s, 0.06 * s), pal["armor_mat"], pal["armor_dark"], bone=bone, bevel=0.007, taper_top=0.85)
        b.add_box((lx, 0.0, 0.16 * s), (0.13 * s * bx, 0.14 * s, 0.20 * s), pal["armor_mat"], pal["armor_dark"], bone=bone, bevel=0.009, taper_top=1.06)
        b.add_box((lx, -0.075 * s, 0.26 * s), (0.11 * s * bx, 0.05 * s, 0.08 * s), "gold" if pal["armor_mat"] != "stone" else "stone", pal["trim"], bone=bone, bevel=0.006, taper_top=0.85)
        b.add_box((lx, 0.0, 0.35 * s), (0.135 * s * bx, 0.145 * s, 0.17 * s), "cloth", pal["cloth"], bone=bone, bevel=0.009, tag="cloth")

    b.add_box((0.0, 0.0, 0.46 * s), (0.36 * s * bx, 0.23 * s, 0.10 * s), "leather", pal["leather"], bone="pelvis", bevel=0.010)
    b.add_box((0.0, -0.12 * s, 0.46 * s), (0.11 * s, 0.04 * s, 0.08 * s), "gold", pal["trim"], bone="pelvis", bevel=0.006)
    for side in (-1, 1):
        b.add_box(
            (side * 0.19 * s * bx, 0.0, 0.39 * s),
            (0.06 * s, 0.19 * s, 0.14 * s),
            pal["armor_mat"],
            pal["armor_dark"],
            bone="pelvis",
            bevel=0.007,
            rot_euler=(0.0, side * 0.16, 0.0),
        )

    if has_robe_skirt:
        b.add_box((0.0, 0.0, 0.29 * s), (0.42 * s * bx, 0.28 * s, 0.30 * s), "cloth", pal["cloth"], bone="pelvis", bevel=0.012, taper_top=0.86, tag="cloth")
        b.add_box((0.0, -0.14 * s, 0.17 * s), (0.40 * s * bx, 0.03 * s, 0.05 * s), "gold", pal["trim"], bone="pelvis", bevel=0.005)

    b.add_box((0.0, 0.0, 0.70 * s), (0.36 * s * bx, 0.22 * s, 0.40 * s), "cloth", pal["cloth"], bone="torso", bevel=0.012, tag="cloth")
    b.add_box((0.0, 0.0, 0.72 * s), (0.40 * s * bx, 0.25 * s, 0.36 * s), pal["armor_mat"], pal["armor"], bone="torso", bevel=0.014, taper_top=1.10)
    b.add_box((0.0, 0.0, 0.92 * s), (0.28 * s * bx, 0.22 * s, 0.08 * s), pal["armor_mat"], pal["armor_dark"], bone="torso", bevel=0.009)

    for side, arm_bone in ((-1, "arm_L"), (1, "arm_R")):
        ax = side * 0.31 * s * bx
        b.add_box((ax + side * 0.02 * s, 0.0, 0.90 * s), (0.19 * s, 0.24 * s, 0.12 * s), pal["armor_mat"], pal["armor"], bone=arm_bone, bevel=0.011, taper_top=0.88, rot_euler=(0.0, side * 0.18, 0.0))
        b.add_box((ax + side * 0.04 * s, 0.0, 0.95 * s), (0.14 * s, 0.18 * s, 0.07 * s), "gold", pal["trim"], bone=arm_bone, bevel=0.008, rot_euler=(0.0, side * 0.22, 0.0))
        b.add_box((ax, 0.0, 0.76 * s), (0.12 * s, 0.12 * s, 0.18 * s), "cloth", pal["cloth"], bone=arm_bone, bevel=0.008, tag="cloth")
        b.add_box((ax, -0.02 * s, 0.62 * s), (0.13 * s, 0.14 * s, 0.14 * s), pal["armor_mat"], pal["armor_dark"], bone=arm_bone, bevel=0.009)
        b.add_box((ax, -0.05 * s, 0.53 * s), (0.10 * s, 0.11 * s, 0.08 * s), "skin", pal["skin"], bone=arm_bone, bevel=0.007)


def _add_cape(b: SculptedModelBuilder, pal: dict, s: float = 1.0, length: float = 0.68, spikes: bool = False) -> None:
    top_z = 0.90 * s
    b.add_box((0.0, 0.16 * s, top_z - 0.10 * s), (0.38 * s, 0.05 * s, 0.22 * s), "cape", pal["cape"], bone="cape", bevel=0.008, rot_euler=(0.12, 0.0, 0.0), tag="cape")
    b.add_box((0.0, 0.21 * s, top_z - length * 0.52 * s), (0.46 * s, 0.045 * s, length * 0.56 * s), "cape", pal["cape"], bone="cape", bevel=0.008, taper_top=0.86, rot_euler=(0.18, 0.0, 0.0), tag="cape")
    b.add_box((0.0, 0.25 * s, top_z - length * 0.84 * s), (0.48 * s, 0.035 * s, 0.07 * s), "gold", pal["trim"], bone="cape", bevel=0.005, rot_euler=(0.18, 0.0, 0.0))
    if spikes:
        for sx in (-0.18 * s, 0.0, 0.18 * s):
            b.add_prism((sx, 0.27 * s, top_z - length * 0.90 * s), 0.04 * s, 0.005 * s, 0.12 * s, 4, "gold", pal["trim"], bone="cape", bevel=0.003, rot_euler=(math.pi + 0.18, 0.0, 0.0))


def _add_orbiting_runes(b: SculptedModelBuilder, s: float, count: int, radius: float, z_pos: float, hex_col: int) -> None:
    for i in range(count):
        ang = (i / count) * math.pi * 2.0
        rx = math.cos(ang) * radius * s
        ry = math.sin(ang) * radius * s
        b.add_prism((rx, ry, z_pos), 0.055 * s, 0.01 * s, 0.11 * s, 4, "emissive", hex_col, bone="runes", bevel=0.004)


def _add_grimoire(b: SculptedModelBuilder, s: float, cover_col: int, glow_col: int) -> None:
    gx, gy, gz = -0.25 * s, -0.22 * s, 0.72 * s
    b.add_box((gx - 0.06 * s, gy, gz), (0.12 * s, 0.035 * s, 0.17 * s), "leather", cover_col, bone="grimoire", bevel=0.005, rot_euler=(0.25, 0.0, -0.35))
    b.add_box((gx + 0.06 * s, gy, gz), (0.12 * s, 0.035 * s, 0.17 * s), "leather", cover_col, bone="grimoire", bevel=0.005, rot_euler=(0.25, 0.0, 0.35))
    b.add_box((gx - 0.05 * s, gy - 0.02 * s, gz + 0.01 * s), (0.09 * s, 0.025 * s, 0.14 * s), "cloth", 0xE2E8F0, bone="grimoire", bevel=0.004, rot_euler=(0.25, 0.0, -0.35))
    b.add_box((gx + 0.05 * s, gy - 0.02 * s, gz + 0.01 * s), (0.09 * s, 0.025 * s, 0.14 * s), "cloth", 0xE2E8F0, bone="grimoire", bevel=0.004, rot_euler=(0.25, 0.0, 0.35))
    b.add_prism((gx, gy - 0.05 * s, gz + 0.03 * s), 0.035 * s, 0.01 * s, 0.04 * s, 4, "emissive", glow_col, bone="grimoire", bevel=0.003)


def _finalize_char(b: SculptedModelBuilder, job_id: str, scale: float = 1.0, is_belias: bool = False, bone_overrides: dict | None = None):
    mesh_obj = b.build_mesh(f"{job_id}_Mesh", rigged=True, ground_to_zero=True)
    arm_obj = create_humanoid_armature(f"{job_id}_Rig", scale=scale, is_belias=is_belias, bone_overrides=bone_overrides)
    attach_mesh_to_armature(mesh_obj, arm_obj)
    build_all_animations(arm_obj, job_id, scale=scale, is_belias=is_belias)
    return arm_obj, mesh_obj


def build_holy_knight():
    s = 1.0
    pal = {
        "armor": 0xC8D4E3, "armor_dark": 0x475569, "trim": 0xF59E0B,
        "cloth": 0x1D4ED8, "cape": 0x1E40AF, "leather": 0x78350F,
        "skin": 0xE6B89C, "glow": 0x38BDF8, "armor_mat": "steel",
    }
    b = SculptedModelBuilder()
    _add_humanoid_base(b, pal, s=s)
    _add_cape(b, pal, s=s, length=0.68)

    b.add_box((0.0, -0.135 * s, 0.72 * s), (0.20 * s, 0.04 * s, 0.28 * s), "gold", pal["trim"], bone="torso", bevel=0.007)
    b.add_box((0.0, -0.15 * s, 0.72 * s), (0.13 * s, 0.03 * s, 0.22 * s), "cloth", pal["cloth"], bone="torso", bevel=0.005, tag="cloth")
    b.add_prism((0.0, -0.17 * s, 0.76 * s), 0.045 * s, 0.02 * s, 0.04 * s, 4, "emissive", pal["glow"], bone="torso", bevel=0.003, rot_euler=(math.pi / 2, 0.0, math.pi / 4))

    b.add_box((0.0, 0.0, 1.15 * s), (0.31 * s, 0.31 * s, 0.34 * s), "steel", pal["armor"], bone="head", bevel=0.016, taper_top=0.92)
    b.add_box((0.0, -0.15 * s, 1.13 * s), (0.22 * s, 0.03 * s, 0.05 * s), "obsidian", 0x0F172A, bone="head", bevel=0.004)
    b.add_box((0.0, -0.15 * s, 1.10 * s), (0.045 * s, 0.035 * s, 0.18 * s), "gold", pal["trim"], bone="head", bevel=0.005)
    b.add_box((0.0, -0.02 * s, 1.32 * s), (0.32 * s, 0.32 * s, 0.05 * s), "gold", pal["trim"], bone="head", bevel=0.006)
    b.add_box((0.0, 0.02 * s, 1.39 * s), (0.07 * s, 0.28 * s, 0.10 * s), "gold", pal["trim"], bone="head", bevel=0.007)
    b.add_box((0.0, 0.09 * s, 1.47 * s), (0.05 * s, 0.24 * s, 0.10 * s), "cloth", pal["cloth"], bone="head", bevel=0.007, rot_euler=(-0.18, 0.0, 0.0), tag="cloth")
    for side in (-1, 1):
        b.add_box((side * 0.18 * s, 0.02 * s, 1.24 * s), (0.04 * s, 0.12 * s, 0.20 * s), "steel", 0xE2E8F0, bone="head", bevel=0.006, taper_top=0.65, rot_euler=(-0.22, side * 0.22, 0.0))

    sx, sy, sz = -0.42 * s, -0.10 * s, 0.62 * s
    b.add_box((sx, sy, sz), (0.06 * s, 0.32 * s, 0.44 * s), "gold", pal["trim"], bone="shield_L", bevel=0.009, taper_top=1.15)
    b.add_box((sx - 0.02 * s, sy, sz), (0.04 * s, 0.24 * s, 0.34 * s), "cloth", pal["cloth"], bone="shield_L", bevel=0.006, taper_top=1.15, tag="cloth")
    b.add_prism((sx - 0.045 * s, sy, sz + 0.02 * s), 0.055 * s, 0.02 * s, 0.04 * s, 4, "emissive", pal["glow"], bone="shield_L", bevel=0.003, rot_euler=(0.0, -math.pi / 2, 0.0))

    wx, wy, wz = 0.37 * s, -0.10 * s, 0.54 * s
    b.add_prism((wx, wy, wz - 0.04 * s), 0.03 * s, 0.025 * s, 0.18 * s, 6, "leather", pal["leather"], bone="weapon_R", bevel=0.003)
    b.add_prism((wx, wy, wz - 0.14 * s), 0.045 * s, 0.03 * s, 0.05 * s, 6, "gold", pal["trim"], bone="weapon_R", bevel=0.004)
    b.add_box((wx, wy, wz + 0.06 * s), (0.07 * s, 0.26 * s, 0.05 * s), "gold", pal["trim"], bone="weapon_R", bevel=0.006)
    b.add_blade((wx, wy, wz + 0.46 * s), 0.045 * s, 0.11 * s, 0.76 * s, "steel", 0xE2E8F0, bone="weapon_R", bevel=0.004, rot_euler=(0.0, 0.0, math.pi / 2))
    b.add_box((wx, wy, wz + 0.38 * s), (0.035 * s, 0.035 * s, 0.36 * s), "emissive", pal["glow"], bone="weapon_R", bevel=0.004)
    return _finalize_char(b, "holy_knight", scale=s)


def build_black_mage():
    s = 0.98
    pal = {
        "armor": 0x1E3A8A, "armor_dark": 0x172554, "trim": 0xEAB308,
        "cloth": 0x1D4ED8, "cape": 0x1E1B4B, "leather": 0x78350F,
        "skin": 0x09090B, "glow": 0xFACC15, "armor_mat": "cloth",
    }
    b = SculptedModelBuilder()
    _add_humanoid_base(b, pal, s=s, has_robe_skirt=True)
    _add_cape(b, pal, s=s, length=0.70)

    # Shadowed face + blazing yellow mage eyes
    b.add_box((0.0, 0.0, 1.12 * s), (0.28 * s, 0.28 * s, 0.28 * s), "obsidian", 0x09090B, bone="head", bevel=0.014)
    for side in (-1, 1):
        b.add_box((side * 0.065 * s, -0.145 * s, 1.12 * s), (0.05 * s, 0.025 * s, 0.045 * s), "emissive", pal["glow"], bone="head", bevel=0.003)

    # Wide brim + ornate buckled hatband + crooked wizard cone
    hat_col = 0xB45309
    b.add_prism((0.0, 0.0, 1.28 * s), 0.36 * s, 0.32 * s, 0.06 * s, 8, "cloth", hat_col, bone="head", bevel=0.008, tag="cloth")
    b.add_prism((0.0, 0.0, 1.35 * s), 0.21 * s, 0.19 * s, 0.10 * s, 8, "cape", pal["cape"], bone="head", bevel=0.006, tag="cape")
    b.add_box((0.0, -0.19 * s, 1.35 * s), (0.11 * s, 0.04 * s, 0.08 * s), "gold", pal["trim"], bone="head", bevel=0.005)
    b.add_prism((0.0, 0.04 * s, 1.48 * s), 0.18 * s, 0.10 * s, 0.20 * s, 8, "cloth", hat_col, bone="head", bevel=0.007, rot_euler=(0.24, 0.0, 0.0), tag="cloth")
    b.add_prism((0.0, 0.13 * s, 1.62 * s), 0.10 * s, 0.02 * s, 0.18 * s, 8, "cloth", hat_col, bone="head", bevel=0.006, rot_euler=(0.52, 0.0, 0.0), tag="cloth")

    # Arcane Crystal Staff (weapon_R)
    wx, wy, wz = 0.37 * s, -0.10 * s, 0.56 * s
    b.add_prism((wx, wy, wz + 0.18 * s), 0.032 * s, 0.028 * s, 0.92 * s, 6, "wood", 0x57534E, bone="weapon_R", bevel=0.004)
    b.add_prism((wx, wy, wz + 0.67 * s), 0.09 * s, 0.07 * s, 0.10 * s, 6, "gold", pal["trim"], bone="weapon_R", bevel=0.006)
    b.add_prism((wx, wy, wz + 0.80 * s), 0.075 * s, 0.015 * s, 0.18 * s, 6, "emissive", pal["glow"], bone="weapon_R", bevel=0.004)

    _add_orbiting_runes(b, s, 3, 0.50, 1.48 * s, pal["glow"])
    return _finalize_char(b, "black_mage", scale=s)


def build_dragoon():
    s = 1.02
    pal = {
        "armor": 0x0284C7, "armor_dark": 0x0C4A6E, "trim": 0xF59E0B,
        "cloth": 0x1E293B, "cape": 0xBE123C, "leather": 0x713F12,
        "skin": 0xE6B89C, "glow": 0x38BDF8, "armor_mat": "steel",
    }
    b = SculptedModelBuilder()
    _add_humanoid_base(b, pal, s=s)
    _add_cape(b, pal, s=s, length=0.72)

    # Winged pauldron spikes + chest dragon scale crest
    for side, bone in ((-1, "arm_L"), (1, "arm_R")):
        b.add_prism((side * 0.38 * s, 0.0, 1.03 * s), 0.05 * s, 0.008 * s, 0.22 * s, 4, "gold", pal["trim"], bone=bone, bevel=0.004, rot_euler=(0.0, side * 0.38, 0.0))
    b.add_box((0.0, -0.14 * s, 0.72 * s), (0.20 * s, 0.04 * s, 0.26 * s), "steel", pal["armor_dark"], bone="torso", bevel=0.007)
    b.add_prism((0.0, -0.165 * s, 0.76 * s), 0.05 * s, 0.015 * s, 0.04 * s, 4, "emissive", pal["glow"], bone="torso", bevel=0.003, rot_euler=(math.pi / 2, 0.0, 0.0))

    # Dragon Helm with snout & swept dragon horns
    b.add_box((0.0, 0.0, 1.15 * s), (0.30 * s, 0.30 * s, 0.32 * s), "steel", pal["armor"], bone="head", bevel=0.015, taper_top=0.92)
    b.add_box((0.0, -0.145 * s, 1.07 * s), (0.20 * s, 0.03 * s, 0.12 * s), "skin", pal["skin"], bone="head", bevel=0.005)
    b.add_box((0.0, -0.14 * s, 1.24 * s), (0.24 * s, 0.22 * s, 0.12 * s), "steel", pal["armor"], bone="head", bevel=0.010, taper_top=0.75)
    b.add_prism((0.0, -0.25 * s, 1.24 * s), 0.045 * s, 0.015 * s, 0.05 * s, 4, "emissive", pal["glow"], bone="head", bevel=0.003, rot_euler=(math.pi / 2, 0.0, 0.0))
    for side in (-1, 1):
        b.add_prism((side * 0.17 * s, 0.02 * s, 1.34 * s), 0.05 * s, 0.03 * s, 0.20 * s, 5, "gold", pal["trim"], bone="head", bevel=0.004, rot_euler=(-0.38, side * 0.36, 0.0))
        b.add_prism((side * 0.25 * s, 0.12 * s, 1.49 * s), 0.03 * s, 0.006 * s, 0.20 * s, 5, "gold", pal["trim"], bone="head", bevel=0.003, rot_euler=(-0.62, side * 0.22, 0.0))

    # Long Partisan Spear with red tassel + glowing tip
    wx, wy, wz = 0.38 * s, -0.10 * s, 0.56 * s
    b.add_prism((wx, wy, wz + 0.18 * s), 0.028 * s, 0.028 * s, 1.28 * s, 6, "wood", 0x78350F, bone="weapon_R", bevel=0.003)
    b.add_box((wx, wy, wz + 0.78 * s), (0.10 * s, 0.10 * s, 0.08 * s), "cape", 0xDC2626, bone="weapon_R", bevel=0.006, tag="cape")
    b.add_box((wx, wy, wz + 0.88 * s), (0.06 * s, 0.18 * s, 0.07 * s), "gold", pal["trim"], bone="weapon_R", bevel=0.005)
    b.add_blade((wx, wy, wz + 1.14 * s), 0.05 * s, 0.14 * s, 0.46 * s, "steel", 0xE2E8F0, bone="weapon_R", bevel=0.004, rot_euler=(0.0, 0.0, math.pi / 2))
    b.add_prism((wx, wy, wz + 1.10 * s), 0.03 * s, 0.008 * s, 0.16 * s, 4, "emissive", pal["glow"], bone="weapon_R", bevel=0.003)
    return _finalize_char(b, "dragoon", scale=s)


def build_sniper():
    s = 0.98
    pal = {
        "armor": 0x15803D, "armor_dark": 0x14532D, "trim": 0xB45309,
        "cloth": 0x166534, "cape": 0x14532D, "leather": 0x78350F,
        "skin": 0xE6B89C, "glow": 0xA3E635, "armor_mat": "leather",
    }
    b = SculptedModelBuilder()
    _add_humanoid_base(b, pal, s=s)
    _add_cape(b, pal, s=s, length=0.52)

    # Crossed chest leather bandolier + back quiver with arrows!
    b.add_box((0.0, -0.135 * s, 0.72 * s), (0.34 * s, 0.03 * s, 0.07 * s), "leather", pal["leather"], bone="torso", bevel=0.005, rot_euler=(0.0, 0.58, 0.0))
    b.add_prism((0.12 * s, 0.17 * s, 0.76 * s), 0.07 * s, 0.08 * s, 0.34 * s, 6, "leather", pal["leather"], bone="torso", bevel=0.006, rot_euler=(0.15, -0.25, 0.0))
    for ox in (-0.025 * s, 0.025 * s):
        b.add_prism((0.15 * s + ox, 0.21 * s, 0.96 * s), 0.014 * s, 0.014 * s, 0.16 * s, 5, "wood", 0xFEF3C7, bone="torso", bevel=0.002, rot_euler=(0.15, -0.25, 0.0))
        b.add_box((0.16 * s + ox, 0.23 * s, 1.04 * s), (0.035 * s, 0.035 * s, 0.04 * s), "cloth", 0xF43F5E, bone="torso", bevel=0.003)

    # Hooded Ranger Head + Mask + Bright Feather
    b.add_box((0.0, 0.0, 1.12 * s), (0.28 * s, 0.27 * s, 0.28 * s), "skin", pal["skin"], bone="head", bevel=0.012)
    b.add_box((0.0, -0.02 * s, 1.04 * s), (0.29 * s, 0.28 * s, 0.12 * s), "cloth", pal["armor_dark"], bone="head", bevel=0.008, tag="cloth")
    for side in (-1, 1):
        b.add_box((side * 0.06 * s, -0.138 * s, 1.14 * s), (0.045 * s, 0.02 * s, 0.035 * s), "obsidian", 0x0F172A, bone="head", bevel=0.003)
    b.add_box((0.0, 0.04 * s, 1.24 * s), (0.33 * s, 0.34 * s, 0.14 * s), "cloth", pal["armor"], bone="head", bevel=0.012, taper_top=0.88, tag="cloth")
    b.add_box((0.0, 0.11 * s, 1.12 * s), (0.32 * s, 0.14 * s, 0.26 * s), "cloth", pal["armor"], bone="head", bevel=0.010, tag="cloth")
    b.add_blade((0.18 * s, 0.02 * s, 1.38 * s), 0.03 * s, 0.08 * s, 0.26 * s, "cloth", 0xFEF08A, bone="head", bevel=0.004, rot_euler=(-0.35, 0.25, 0.0))

    # Composite Longbow in shield_L (-X) facing forward (-Y) + nocked arrow
    bx, by, bz = -0.38 * s, -0.14 * s, 0.62 * s
    b.add_box((bx, by - 0.06 * s, bz + 0.04 * s), (0.05 * s, 0.07 * s, 0.36 * s), "leather", pal["leather"], bone="shield_L", bevel=0.006)
    b.add_box((bx, by - 0.01 * s, bz + 0.30 * s), (0.045 * s, 0.06 * s, 0.24 * s), "leather", 0x92400E, bone="shield_L", bevel=0.005, rot_euler=(-0.48, 0.0, 0.0))
    b.add_box((bx, by - 0.01 * s, bz - 0.22 * s), (0.045 * s, 0.06 * s, 0.24 * s), "leather", 0x92400E, bone="shield_L", bevel=0.005, rot_euler=(0.48, 0.0, 0.0))
    b.add_box((bx, by + 0.06 * s, bz + 0.04 * s), (0.018 * s, 0.018 * s, 0.72 * s), "cloth", 0xE2E8F0, bone="shield_L", bevel=0.002)
    b.add_prism((bx, by - 0.14 * s, bz + 0.06 * s), 0.022 * s, 0.008 * s, 0.42 * s, 4, "emissive", pal["glow"], bone="shield_L", bevel=0.002, rot_euler=(math.pi / 2, 0.0, 0.0))

    # Drawn arrow in weapon_R (+X)
    b.add_prism((0.37 * s, -0.16 * s, 0.56 * s), 0.018 * s, 0.006 * s, 0.42 * s, 4, "emissive", pal["glow"], bone="weapon_R", bevel=0.002, rot_euler=(math.pi / 2, 0.0, 0.0))
    return _finalize_char(b, "sniper", scale=s)


def build_white_mystic():
    s = 0.98
    pal = {
        "armor": 0xBCC8D8, "armor_dark": 0x8B9AB0, "trim": 0xB91C1C,
        "cloth": 0xBCC8D8, "cape": 0xA3B1C4, "leather": 0x92400E,
        "skin": 0xE6B89C, "glow": 0xFDE047, "armor_mat": "cloth",
    }
    b = SculptedModelBuilder()
    _add_humanoid_base(b, pal, s=s, has_robe_skirt=True)
    _add_cape(b, pal, s=s, length=0.66)

    # Crimson triangular stole & gold trim on chest
    b.add_box((0.0, -0.135 * s, 0.72 * s), (0.18 * s, 0.035 * s, 0.30 * s), "cape", pal["trim"], bone="torso", bevel=0.006, tag="cape")
    b.add_box((0.0, -0.15 * s, 0.72 * s), (0.09 * s, 0.03 * s, 0.28 * s), "gold", 0xD97706, bone="torso", bevel=0.005)

    # Soft Ivory Hood with crimson triangle markings
    b.add_box((0.0, 0.0, 1.12 * s), (0.28 * s, 0.27 * s, 0.28 * s), "skin", pal["skin"], bone="head", bevel=0.012)
    for side in (-1, 1):
        b.add_box((side * 0.06 * s, -0.138 * s, 1.14 * s), (0.04 * s, 0.02 * s, 0.035 * s), "obsidian", 0x1E293B, bone="head", bevel=0.003)
    b.add_box((0.0, 0.03 * s, 1.24 * s), (0.34 * s, 0.34 * s, 0.14 * s), "cloth", pal["cloth"], bone="head", bevel=0.012, taper_top=0.88, tag="cloth")
    b.add_box((0.0, 0.11 * s, 1.12 * s), (0.33 * s, 0.14 * s, 0.26 * s), "cloth", pal["cloth"], bone="head", bevel=0.010, tag="cloth")
    b.add_box((0.0, -0.14 * s, 1.24 * s), (0.24 * s, 0.03 * s, 0.06 * s), "cape", pal["trim"], bone="head", bevel=0.005, tag="cape")
    b.add_prism((0.0, -0.14 * s, 1.32 * s), 0.06 * s, 0.01 * s, 0.08 * s, 4, "cape", pal["trim"], bone="head", bevel=0.003, tag="cape")

    # Solar Ring Cleric Staff (weapon_R)
    wx, wy, wz = 0.37 * s, -0.10 * s, 0.56 * s
    b.add_prism((wx, wy, wz + 0.16 * s), 0.03 * s, 0.026 * s, 0.88 * s, 6, "wood", 0x78350F, bone="weapon_R", bevel=0.003)
    b.add_box((wx, wy, wz + 0.62 * s), (0.18 * s, 0.045 * s, 0.045 * s), "gold", 0xF59E0B, bone="weapon_R", bevel=0.005)
    b.add_box((wx - 0.08 * s, wy, wz + 0.74 * s), (0.04 * s, 0.045 * s, 0.20 * s), "gold", 0xF59E0B, bone="weapon_R", bevel=0.005)
    b.add_box((wx + 0.08 * s, wy, wz + 0.74 * s), (0.04 * s, 0.045 * s, 0.20 * s), "gold", 0xF59E0B, bone="weapon_R", bevel=0.005)
    b.add_box((wx, wy, wz + 0.84 * s), (0.16 * s, 0.045 * s, 0.045 * s), "gold", 0xF59E0B, bone="weapon_R", bevel=0.005)
    b.add_prism((wx, wy, wz + 0.74 * s), 0.055 * s, 0.015 * s, 0.11 * s, 4, "emissive", pal["glow"], bone="weapon_R", bevel=0.004)

    _add_grimoire(b, s, 0x991B1B, pal["glow"])
    return _finalize_char(b, "white_mystic", scale=s)


def build_ninja():
    s = 0.98
    pal = {
        "armor": 0x1E1E24, "armor_dark": 0x111116, "trim": 0xDC2626,
        "cloth": 0x27272A, "cape": 0xDC2626, "leather": 0x27272A,
        "skin": 0xE6B89C, "glow": 0xC084FC, "armor_mat": "cloth",
    }
    b = SculptedModelBuilder()
    _add_humanoid_base(b, pal, s=s)

    # Flowing multi-segment shinobi scarf (cape bone, tag="cape")
    b.add_box((0.0, 0.08 * s, 0.94 * s), (0.30 * s, 0.12 * s, 0.09 * s), "cape", pal["cape"], bone="cape", bevel=0.008, tag="cape")
    b.add_box((0.10 * s, 0.22 * s, 0.74 * s), (0.14 * s, 0.045 * s, 0.34 * s), "cape", pal["cape"], bone="cape", bevel=0.006, rot_euler=(0.35, -0.18, 0.0), tag="cape")
    b.add_box((0.18 * s, 0.36 * s, 0.50 * s), (0.12 * s, 0.04 * s, 0.30 * s), "cape", pal["trim"], bone="cape", bevel=0.006, rot_euler=(0.55, -0.25, 0.0), tag="cape")

    # Crossed katana scabbards on back
    for side in (-1, 1):
        b.add_prism((side * 0.02 * s, 0.16 * s, 0.72 * s), 0.024 * s, 0.022 * s, 0.54 * s, 4, "leather", 0x09090B, bone="torso", bevel=0.004, rot_euler=(0.0, side * 0.55, 0.0))

    # Shinobi Cowl + Crimson Headband + Mask
    b.add_box((0.0, 0.0, 1.13 * s), (0.29 * s, 0.29 * s, 0.30 * s), "cloth", pal["armor"], bone="head", bevel=0.014, tag="cloth")
    b.add_box((0.0, -0.14 * s, 1.13 * s), (0.20 * s, 0.03 * s, 0.08 * s), "skin", pal["skin"], bone="head", bevel=0.004)
    for side in (-1, 1):
        b.add_box((side * 0.055 * s, -0.155 * s, 1.14 * s), (0.04 * s, 0.02 * s, 0.03 * s), "obsidian", 0x09090B, bone="head", bevel=0.002)
    b.add_box((0.0, 0.0, 1.22 * s), (0.31 * s, 0.31 * s, 0.065 * s), "cape", pal["trim"], bone="head", bevel=0.006, tag="cape")

    # Twin Katanas (weapon_R upright, shield_L reverse-grip)
    wx, wy, wz = 0.36 * s, -0.10 * s, 0.54 * s
    b.add_prism((wx, wy, wz - 0.02 * s), 0.022 * s, 0.02 * s, 0.16 * s, 6, "leather", pal["leather"], bone="weapon_R", bevel=0.003)
    b.add_box((wx, wy, wz + 0.07 * s), (0.07 * s, 0.12 * s, 0.03 * s), "gold", 0xF59E0B, bone="weapon_R", bevel=0.004)
    b.add_blade((wx, wy, wz + 0.38 * s), 0.028 * s, 0.07 * s, 0.60 * s, "steel", 0xE2E8F0, bone="weapon_R", bevel=0.003, rot_euler=(0.0, 0.0, math.pi / 2))
    b.add_box((wx, wy - 0.015 * s, wz + 0.62 * s), (0.025 * s, 0.025 * s, 0.07 * s), "emissive", pal["glow"], bone="weapon_R", bevel=0.002)

    sx, sy, sz = -0.36 * s, -0.10 * s, 0.54 * s
    b.add_prism((sx, sy - 0.02 * s, sz), 0.022 * s, 0.02 * s, 0.16 * s, 6, "leather", pal["leather"], bone="shield_L", bevel=0.003, rot_euler=(math.pi / 2, 0.0, 0.0))
    b.add_box((sx, sy + 0.06 * s, sz), (0.07 * s, 0.03 * s, 0.12 * s), "gold", 0xF59E0B, bone="shield_L", bevel=0.004)
    b.add_blade((sx, sy + 0.36 * s, sz), 0.028 * s, 0.07 * s, 0.58 * s, "steel", 0xE2E8F0, bone="shield_L", bevel=0.003, rot_euler=(-math.pi / 2, 0.0, math.pi / 2))
    b.add_box((sx, sy + 0.59 * s, sz), (0.025 * s, 0.025 * s, 0.07 * s), "emissive", pal["glow"], bone="shield_L", bevel=0.002)
    return _finalize_char(b, "ninja", scale=s)


def build_dark_knight_boss():
    s = 1.14
    pal = {
        "armor": 0x432382, "armor_dark": 0x261F59, "trim": 0xE11D48,
        "cloth": 0x1E1B24, "cape": 0x6B0F2B, "leather": 0x2E2B36,
        "skin": 0x3B348C, "glow": 0xF43F5E, "armor_mat": "steel",
    }
    b = SculptedModelBuilder()
    _add_humanoid_base(b, pal, s=s)
    _add_cape(b, pal, s=s, length=0.74, spikes=True)

    for side, bone in ((-1, "arm_L"), (1, "arm_R")):
        b.add_prism((side * 0.38 * s, 0.0, 1.02 * s), 0.045 * s, 0.006 * s, 0.16 * s, 4, "gold", pal["trim"], bone=bone, bevel=0.004, rot_euler=(0.0, side * 0.35, 0.0))
    b.add_box((0.0, -0.14 * s, 0.72 * s), (0.22 * s, 0.04 * s, 0.28 * s), "gold", pal["trim"], bone="torso", bevel=0.007)
    b.add_prism((0.0, -0.165 * s, 0.74 * s), 0.06 * s, 0.02 * s, 0.05 * s, 4, "emissive", pal["glow"], bone="torso", bevel=0.003, rot_euler=(math.pi / 2, 0.0, math.pi / 4))

    b.add_box((0.0, 0.0, 1.15 * s), (0.32 * s, 0.32 * s, 0.35 * s), "steel", pal["armor"], bone="head", bevel=0.016, taper_top=0.92)
    b.add_box((0.0, -0.155 * s, 1.13 * s), (0.24 * s, 0.03 * s, 0.06 * s), "obsidian", 0x09090B, bone="head", bevel=0.004)
    for side in (-1, 1):
        b.add_box((side * 0.065 * s, -0.17 * s, 1.135 * s), (0.045 * s, 0.025 * s, 0.035 * s), "emissive", pal["glow"], bone="head", bevel=0.003)
        b.add_prism((side * 0.19 * s, -0.02 * s, 1.32 * s), 0.055 * s, 0.035 * s, 0.18 * s, 5, "gold", pal["trim"], bone="head", bevel=0.005, rot_euler=(0.25, side * 0.45, 0.0))
        b.add_prism((side * 0.25 * s, -0.07 * s, 1.46 * s), 0.035 * s, 0.007 * s, 0.20 * s, 5, "steel", 0x9F1239, bone="head", bevel=0.004, rot_euler=(0.55, side * 0.18, 0.0))

    sx, sy, sz = -0.44 * s, -0.10 * s, 0.62 * s
    b.add_box((sx, sy, sz), (0.06 * s, 0.34 * s, 0.48 * s), "steel", pal["armor_dark"], bone="shield_L", bevel=0.010, taper_top=0.88)
    b.add_box((sx - 0.025 * s, sy, sz), (0.04 * s, 0.26 * s, 0.38 * s), "gold", pal["trim"], bone="shield_L", bevel=0.006)
    b.add_box((sx - 0.04 * s, sy, sz), (0.03 * s, 0.05 * s, 0.28 * s), "emissive", pal["glow"], bone="shield_L", bevel=0.003)

    wx, wy, wz = 0.38 * s, -0.10 * s, 0.54 * s
    b.add_prism((wx, wy, wz - 0.05 * s), 0.034 * s, 0.028 * s, 0.22 * s, 6, "leather", pal["leather"], bone="weapon_R", bevel=0.003)
    b.add_box((wx, wy, wz + 0.07 * s), (0.08 * s, 0.32 * s, 0.06 * s), "gold", pal["trim"], bone="weapon_R", bevel=0.006)
    b.add_blade((wx, wy, wz + 0.54 * s), 0.055 * s, 0.14 * s, 0.90 * s, "steel", 0x334155, bone="weapon_R", bevel=0.005, rot_euler=(0.0, 0.0, math.pi / 2))
    b.add_box((wx, wy, wz + 0.46 * s), (0.04 * s, 0.045 * s, 0.48 * s), "emissive", pal["glow"], bone="weapon_R", bevel=0.004)
    return _finalize_char(b, "dark_knight_boss", scale=s)


def build_dragoon_boss():
    s = 1.14
    pal = {
        "armor": 0xB45309, "armor_dark": 0x5C240B, "trim": 0xF59E0B,
        "cloth": 0x1E293B, "cape": 0xDC2626, "leather": 0x713F12,
        "skin": 0xE6B89C, "glow": 0xFB923C, "armor_mat": "steel",
    }
    b = SculptedModelBuilder()
    _add_humanoid_base(b, pal, s=s)
    _add_cape(b, pal, s=s, length=0.76, spikes=True)

    for side, bone in ((-1, "arm_L"), (1, "arm_R")):
        b.add_prism((side * 0.40 * s, 0.0, 1.04 * s), 0.055 * s, 0.008 * s, 0.26 * s, 4, "gold", pal["trim"], bone=bone, bevel=0.004, rot_euler=(0.0, side * 0.42, 0.0))
    b.add_box((0.0, -0.14 * s, 0.72 * s), (0.22 * s, 0.04 * s, 0.28 * s), "gold", pal["trim"], bone="torso", bevel=0.007)
    b.add_prism((0.0, -0.165 * s, 0.75 * s), 0.06 * s, 0.02 * s, 0.05 * s, 4, "emissive", pal["glow"], bone="torso", bevel=0.003, rot_euler=(math.pi / 2, 0.0, 0.0))

    b.add_box((0.0, 0.0, 1.15 * s), (0.31 * s, 0.31 * s, 0.33 * s), "steel", pal["armor"], bone="head", bevel=0.015, taper_top=0.92)
    b.add_box((0.0, -0.14 * s, 1.24 * s), (0.25 * s, 0.24 * s, 0.13 * s), "steel", pal["armor"], bone="head", bevel=0.010, taper_top=0.72)
    b.add_box((0.0, -0.15 * s, 1.12 * s), (0.20 * s, 0.03 * s, 0.05 * s), "obsidian", 0x0F172A, bone="head", bevel=0.003)
    for side in (-1, 1):
        b.add_box((side * 0.06 * s, -0.165 * s, 1.12 * s), (0.045 * s, 0.02 * s, 0.03 * s), "emissive", pal["glow"], bone="head", bevel=0.002)
        b.add_prism((side * 0.18 * s, 0.02 * s, 1.35 * s), 0.055 * s, 0.032 * s, 0.22 * s, 5, "gold", pal["trim"], bone="head", bevel=0.004, rot_euler=(-0.38, side * 0.36, 0.0))
        b.add_prism((side * 0.27 * s, 0.13 * s, 1.52 * s), 0.034 * s, 0.006 * s, 0.22 * s, 5, "emissive", pal["glow"], bone="head", bevel=0.003, rot_euler=(-0.60, side * 0.20, 0.0))

    wx, wy, wz = 0.39 * s, -0.10 * s, 0.56 * s
    b.add_prism((wx, wy, wz + 0.20 * s), 0.03 * s, 0.03 * s, 1.38 * s, 6, "wood", 0x451A03, bone="weapon_R", bevel=0.003)
    b.add_box((wx, wy, wz + 0.88 * s), (0.07 * s, 0.24 * s, 0.08 * s), "gold", pal["trim"], bone="weapon_R", bevel=0.005)
    b.add_blade((wx, wy, wz + 1.18 * s), 0.06 * s, 0.16 * s, 0.54 * s, "steel", 0xE2E8F0, bone="weapon_R", bevel=0.004, rot_euler=(0.0, 0.0, math.pi / 2))
    b.add_prism((wx, wy, wz + 1.14 * s), 0.035 * s, 0.008 * s, 0.20 * s, 4, "emissive", pal["glow"], bone="weapon_R", bevel=0.003)
    return _finalize_char(b, "dragoon_boss", scale=s)


def build_archmage_boss():
    s = 1.12
    pal = {
        "armor": 0x0369A1, "armor_dark": 0x0C4A6E, "trim": 0x7DD3FC,
        "cloth": 0x075985, "cape": 0xBAE6FD, "leather": 0x334155,
        "skin": 0x0F172A, "glow": 0x38BDF8, "armor_mat": "ice",
    }
    b = SculptedModelBuilder()
    _add_humanoid_base(b, pal, s=s, has_robe_skirt=True)
    _add_cape(b, pal, s=s, length=0.74)

    b.add_box((0.0, 0.0, 1.12 * s), (0.28 * s, 0.28 * s, 0.28 * s), "obsidian", 0x09090B, bone="head", bevel=0.014)
    for side in (-1, 1):
        b.add_box((side * 0.065 * s, -0.145 * s, 1.12 * s), (0.05 * s, 0.025 * s, 0.045 * s), "emissive", pal["glow"], bone="head", bevel=0.003)

    # Crystalline Glacial Wizard Hat
    b.add_prism((0.0, 0.0, 1.28 * s), 0.37 * s, 0.33 * s, 0.06 * s, 8, "ice", 0x0284C7, bone="head", bevel=0.008)
    b.add_prism((0.0, 0.0, 1.35 * s), 0.21 * s, 0.19 * s, 0.10 * s, 8, "gold", 0x7DD3FC, bone="head", bevel=0.006)
    b.add_prism((0.0, 0.04 * s, 1.49 * s), 0.18 * s, 0.10 * s, 0.22 * s, 8, "ice", 0x38BDF8, bone="head", bevel=0.007, rot_euler=(0.22, 0.0, 0.0))
    b.add_prism((0.0, 0.13 * s, 1.64 * s), 0.10 * s, 0.02 * s, 0.18 * s, 8, "ice", 0xBAE6FD, bone="head", bevel=0.006, rot_euler=(0.48, 0.0, 0.0))

    wx, wy, wz = 0.38 * s, -0.10 * s, 0.56 * s
    b.add_prism((wx, wy, wz + 0.18 * s), 0.032 * s, 0.028 * s, 0.96 * s, 6, "ice", 0x0C4A6E, bone="weapon_R", bevel=0.004)
    b.add_prism((wx, wy, wz + 0.70 * s), 0.095 * s, 0.07 * s, 0.10 * s, 6, "gold", 0xBAE6FD, bone="weapon_R", bevel=0.005)
    b.add_prism((wx, wy, wz + 0.85 * s), 0.08 * s, 0.015 * s, 0.22 * s, 6, "emissive", pal["glow"], bone="weapon_R", bevel=0.004)

    _add_orbiting_runes(b, s, 4, 0.54, 1.50 * s, pal["glow"])
    return _finalize_char(b, "archmage_boss", scale=s)


def build_golem_enemy():
    s = 1.15
    pal = {
        "armor": 0x7DD3FC, "armor_dark": 0x38BDF8, "trim": 0x475569,
        "cloth": 0x475569, "cape": 0x334155, "leather": 0x475569,
        "skin": 0x64748B, "glow": 0x38BDF8, "armor_mat": "stone",
    }
    b = SculptedModelBuilder()
    # Chunky stone colossus legs
    for side, bone in ((-1, "leg_L"), (1, "leg_R")):
        lx = side * 0.16 * s
        b.add_box((lx, -0.02 * s, 0.07 * s), (0.20 * s, 0.26 * s, 0.14 * s), "stone", 0x334155, bone=bone, bevel=0.012)
        b.add_box((lx, 0.0, 0.28 * s), (0.19 * s, 0.20 * s, 0.28 * s), "stone", 0x475569, bone=bone, bevel=0.014, taper_top=1.08)

    # Broad heavy stone torso + crystalline ice plates + glowing core
    b.add_box((0.0, 0.0, 0.45 * s), (0.46 * s, 0.30 * s, 0.14 * s), "stone", 0x334155, bone="pelvis", bevel=0.014)
    b.add_box((0.0, 0.0, 0.74 * s), (0.58 * s, 0.36 * s, 0.46 * s), "stone", 0x64748B, bone="torso", bevel=0.018, taper_top=1.12)
    b.add_box((0.0, -0.18 * s, 0.76 * s), (0.34 * s, 0.06 * s, 0.28 * s), "ice", 0x7DD3FC, bone="torso", bevel=0.010)
    b.add_prism((0.0, -0.22 * s, 0.76 * s), 0.08 * s, 0.02 * s, 0.06 * s, 6, "emissive", pal["glow"], bone="torso", bevel=0.004, rot_euler=(math.pi / 2, 0.0, 0.0))

    # Monolith head + glowing rune eye slit
    b.add_box((0.0, 0.0, 1.12 * s), (0.32 * s, 0.32 * s, 0.28 * s), "stone", 0x475569, bone="head", bevel=0.016, taper_top=0.88)
    b.add_box((0.0, -0.165 * s, 1.13 * s), (0.18 * s, 0.03 * s, 0.05 * s), "emissive", pal["glow"], bone="head", bevel=0.004)
    b.add_prism((0.0, 0.02 * s, 1.32 * s), 0.09 * s, 0.02 * s, 0.16 * s, 5, "ice", 0x38BDF8, bone="head", bevel=0.006)

    # Massive boulder arms & rune fists
    for side, bone in ((-1, "arm_L"), (1, "arm_R")):
        ax = side * 0.42 * s
        b.add_box((ax, 0.0, 0.90 * s), (0.24 * s, 0.28 * s, 0.20 * s), "ice", 0x7DD3FC, bone=bone, bevel=0.014, rot_euler=(0.0, side * 0.18, 0.0))
        b.add_box((ax, -0.02 * s, 0.68 * s), (0.18 * s, 0.20 * s, 0.26 * s), "stone", 0x475569, bone=bone, bevel=0.012)
        b.add_box((ax, -0.04 * s, 0.49 * s), (0.22 * s, 0.24 * s, 0.18 * s), "stone", 0x334155, bone=bone, bevel=0.012)
        b.add_box((ax, -0.16 * s, 0.49 * s), (0.10 * s, 0.03 * s, 0.08 * s), "emissive", pal["glow"], bone=bone, bevel=0.004)

    overrides = {
        "arm_L": (-0.42 * s, 0.0, 0.92 * s),
        "arm_R": (0.42 * s, 0.0, 0.92 * s),
        "leg_L": (-0.16 * s, 0.0, 0.44 * s),
        "leg_R": (0.16 * s, 0.0, 0.44 * s),
    }
    return _finalize_char(b, "golem_enemy", scale=s, bone_overrides=overrides)


def build_skeleton_enemy():
    s = 0.98
    bone_col = 0xCBD5E1
    dark_iron = 0x475569
    glow = 0xA855F7
    b = SculptedModelBuilder()

    # Slender bone legs & iron-capped boots
    for side, bone in ((-1, "leg_L"), (1, "leg_R")):
        lx = side * 0.11 * s
        b.add_box((lx, -0.04 * s, 0.025 * s), (0.10 * s, 0.19 * s, 0.05 * s), "steel", dark_iron, bone=bone, bevel=0.006)
        b.add_prism((lx, 0.0, 0.24 * s), 0.042 * s, 0.042 * s, 0.38 * s, 5, "stone", bone_col, bone=bone, bevel=0.004)

    # Pelvis + Spine + Exposed Ribcage
    b.add_box((0.0, 0.0, 0.46 * s), (0.30 * s, 0.18 * s, 0.09 * s), "steel", dark_iron, bone="pelvis", bevel=0.008)
    b.add_prism((0.0, 0.04 * s, 0.72 * s), 0.048 * s, 0.048 * s, 0.46 * s, 6, "stone", bone_col, bone="torso", bevel=0.005)
    for rz in (0.60, 0.70, 0.80, 0.89):
        b.add_box((0.0, -0.02 * s, rz * s), (0.32 * s, 0.18 * s, 0.042 * s), "stone", bone_col, bone="torso", bevel=0.006)
    b.add_box((0.0, 0.0, 0.72 * s), (0.18 * s, 0.12 * s, 0.36 * s), "cloth", 0x1E293B, bone="torso", bevel=0.006, tag="cloth")

    # Skull + Violet Glowing Eye Sockets + Cracked Helm Rim
    b.add_box((0.0, 0.0, 1.12 * s), (0.26 * s, 0.27 * s, 0.28 * s), "stone", bone_col, bone="head", bevel=0.015)
    b.add_box((0.0, -0.09 * s, 0.99 * s), (0.16 * s, 0.12 * s, 0.08 * s), "stone", 0x94A3B8, bone="head", bevel=0.006)
    for side in (-1, 1):
        b.add_box((side * 0.06 * s, -0.14 * s, 1.13 * s), (0.045 * s, 0.02 * s, 0.045 * s), "emissive", glow, bone="head", bevel=0.003)

    for side, bone in ((-1, "arm_L"), (1, "arm_R")):
        ax = side * 0.28 * s
        b.add_box((ax, 0.0, 0.90 * s), (0.14 * s, 0.16 * s, 0.09 * s), "steel", dark_iron, bone=bone, bevel=0.008)
        b.add_prism((ax, -0.01 * s, 0.70 * s), 0.036 * s, 0.036 * s, 0.34 * s, 5, "stone", bone_col, bone=bone, bevel=0.004)

    # Tattered iron buckler & notched sword
    b.add_box((-0.40 * s, -0.10 * s, 0.62 * s), (0.05 * s, 0.28 * s, 0.36 * s), "steel", dark_iron, bone="shield_L", bevel=0.008)
    b.add_prism((-0.43 * s, -0.10 * s, 0.62 * s), 0.045 * s, 0.015 * s, 0.04 * s, 4, "emissive", glow, bone="shield_L", bevel=0.003, rot_euler=(0.0, -math.pi / 2, 0.0))

    wx, wy, wz = 0.34 * s, -0.10 * s, 0.54 * s
    b.add_box((wx, wy, wz + 0.04 * s), (0.06 * s, 0.20 * s, 0.04 * s), "steel", dark_iron, bone="weapon_R", bevel=0.004)
    b.add_blade((wx, wy, wz + 0.36 * s), 0.04 * s, 0.09 * s, 0.60 * s, "steel", 0x94A3B8, bone="weapon_R", bevel=0.003, rot_euler=(0.0, 0.0, math.pi / 2))
    return _finalize_char(b, "skeleton_enemy", scale=s)


def build_lich_boss():
    s = 1.14
    pal = {
        "armor": 0x3B0764, "armor_dark": 0x1E1B4B, "trim": 0xA3E635,
        "cloth": 0x581C87, "cape": 0x2E1065, "leather": 0x1C1917,
        "skin": 0xCBD5E1, "glow": 0x84CC16, "armor_mat": "cloth",
    }
    b = SculptedModelBuilder()
    _add_humanoid_base(b, pal, s=s, has_robe_skirt=True)
    _add_cape(b, pal, s=s, length=0.76, spikes=True)

    # Skull face + Toxic Lime Necromancer Eyes + Tall Lich Mitre Crown
    b.add_box((0.0, 0.0, 1.12 * s), (0.27 * s, 0.27 * s, 0.28 * s), "stone", 0xCBD5E1, bone="head", bevel=0.014)
    for side in (-1, 1):
        b.add_box((side * 0.06 * s, -0.14 * s, 1.13 * s), (0.045 * s, 0.025 * s, 0.04 * s), "emissive", pal["glow"], bone="head", bevel=0.003)
    b.add_prism((0.0, 0.02 * s, 1.36 * s), 0.22 * s, 0.06 * s, 0.30 * s, 6, "cloth", 0x581C87, bone="head", bevel=0.008, tag="cloth")
    b.add_prism((0.0, -0.16 * s, 1.38 * s), 0.055 * s, 0.015 * s, 0.05 * s, 4, "emissive", pal["trim"], bone="head", bevel=0.003, rot_euler=(math.pi / 2, 0.0, 0.0))

    wx, wy, wz = 0.38 * s, -0.10 * s, 0.56 * s
    b.add_prism((wx, wy, wz + 0.20 * s), 0.032 * s, 0.028 * s, 1.00 * s, 6, "obsidian", 0x18181B, bone="weapon_R", bevel=0.004)
    b.add_prism((wx, wy, wz + 0.73 * s), 0.095 * s, 0.07 * s, 0.11 * s, 6, "gold", 0xA3E635, bone="weapon_R", bevel=0.005)
    b.add_prism((wx, wy, wz + 0.88 * s), 0.08 * s, 0.015 * s, 0.20 * s, 6, "emissive", pal["glow"], bone="weapon_R", bevel=0.004)

    _add_grimoire(b, s, 0x3B0764, pal["glow"])
    _add_orbiting_runes(b, s, 3, 0.52, 1.54 * s, pal["glow"])
    return _finalize_char(b, "lich_boss", scale=s)


def build_belias_boss():
    """Colossal 2x2 Lucavi Archdemon Belias (~2.95m tall, dorsal magma wings, 4 horns, molten blade)."""
    b = SculptedModelBuilder()
    obsidian = 0x292524
    dark_steel = 0x1C1917
    crimson = 0x7F1D1D
    gold = 0xF59E0B
    magma = 0xFF5500
    ember = 0xFEF08A

    # 1. Colossal armored demon legs & clawed hooves (Z = 0.0 .. 0.82)
    for side, bone in ((-1, "leg_L"), (1, "leg_R")):
        lx = side * 0.28
        b.add_box((lx, -0.05, 0.08), (0.28, 0.42, 0.16), "obsidian", dark_steel, bone=bone, bevel=0.016)
        b.add_prism((lx - 0.08, -0.28, 0.06), 0.05, 0.01, 0.14, 4, "emissive", magma, bone=bone, bevel=0.004, rot_euler=(math.pi / 2, 0.0, 0.0))
        b.add_prism((lx + 0.08, -0.28, 0.06), 0.05, 0.01, 0.14, 4, "emissive", magma, bone=bone, bevel=0.004, rot_euler=(math.pi / 2, 0.0, 0.0))
        b.add_box((lx, 0.0, 0.34), (0.26, 0.28, 0.38), "stone", obsidian, bone=bone, bevel=0.016, taper_top=1.10)
        b.add_box((lx, -0.15, 0.48), (0.22, 0.08, 0.14), "gold", gold, bone=bone, bevel=0.009)
        b.add_box((lx, 0.0, 0.66), (0.27, 0.28, 0.30), "cloth", crimson, bone=bone, bevel=0.014)

    # 2. Pelvis, Gold Demon Belt & Crimson Loin Armor
    b.add_box((0.0, 0.0, 0.84), (0.86, 0.56, 0.22), "gold", gold, bone="pelvis", bevel=0.018)
    b.add_box((0.0, -0.30, 0.64), (0.34, 0.08, 0.38), "cloth", 0x991B1B, bone="pelvis", bevel=0.012, taper_top=0.80)

    # 3. Colossal Obsidian Torso + Incandescent Magma Rib Fissures
    b.add_box((0.0, 0.0, 1.38), (0.96, 0.62, 0.90), "obsidian", obsidian, bone="torso", bevel=0.024, taper_top=1.16)
    b.add_box((0.0, -0.31, 1.38), (0.78, 0.08, 0.68), "stone", 0x450A0A, bone="torso", bevel=0.014)
    # Glowing magma ribs
    b.add_box((0.0, -0.36, 1.38), (0.14, 0.05, 0.56), "emissive", magma, bone="torso", bevel=0.006)
    for rz in (1.20, 1.38, 1.56):
        b.add_box((-0.24, -0.36, rz), (0.22, 0.045, 0.075), "emissive", 0xFF6B00, bone="torso", bevel=0.005, rot_euler=(0.0, -0.15, 0.0))
        b.add_box((0.24, -0.36, rz), (0.22, 0.045, 0.075), "emissive", 0xFF6B00, bone="torso", bevel=0.005, rot_euler=(0.0, 0.15, 0.0))

    # 4. Towering Skull-Plated Steel Pauldrons + Gold Spikes + Arms + Fiery Claws
    for side, bone in ((-1, "arm_L"), (1, "arm_R")):
        ax = side * 0.72
        b.add_box((ax, 0.0, 1.76), (0.44, 0.54, 0.34), "steel", dark_steel, bone=bone, bevel=0.020, taper_top=0.86, rot_euler=(0.0, side * 0.20, 0.0))
        b.add_prism((ax + side * 0.08, 0.0, 2.08), 0.10, 0.012, 0.38, 4, "gold", gold, bone=bone, bevel=0.008, rot_euler=(0.0, side * 0.30, 0.0))
        b.add_box((ax, -0.02, 1.42), (0.24, 0.26, 0.42), "stone", obsidian, bone=bone, bevel=0.014)
        b.add_box((ax, -0.06, 1.12), (0.26, 0.28, 0.30), "steel", dark_steel, bone=bone, bevel=0.014)
        b.add_prism((ax, -0.12, 0.88), 0.10, 0.02, 0.22, 4, "emissive", magma, bone=bone, bevel=0.005, rot_euler=(math.pi, 0.0, 0.0))

    # 5. Twin Dorsal Ember Demon Wings (wing_L / wing_R)
    for side, bone in ((-1, "wing_L"), (1, "wing_R")):
        wx = side * 0.58
        b.add_box((wx, 0.38, 1.82), (0.64, 0.10, 0.96), "stone", 0x450A0A, bone=bone, bevel=0.016, taper_top=1.15, rot_euler=(0.24, side * 0.25, -side * 0.22))
        b.add_box((wx + side * 0.18, 0.42, 2.15), (0.30, 0.07, 0.78), "emissive", magma, bone=bone, bevel=0.010, rot_euler=(0.24, side * 0.30, -side * 0.22))

    # 6. Demonic Head + Blazing Eyes + 4 Curved Horns
    b.add_box((0.0, -0.05, 2.22), (0.52, 0.52, 0.54), "stone", crimson, bone="head", bevel=0.022, taper_top=0.90)
    for side in (-1, 1):
        b.add_box((side * 0.12, -0.32, 2.26), (0.09, 0.04, 0.065), "emissive", ember, bone="head", bevel=0.004)
        # Giant curled ram horns with fiery tips
        b.add_prism((side * 0.36, -0.04, 2.48), 0.12, 0.07, 0.36, 6, "obsidian", dark_steel, bone="head", bevel=0.008, rot_euler=(0.25, side * 0.75, 0.0))
        b.add_prism((side * 0.56, 0.14, 2.66), 0.07, 0.015, 0.38, 6, "emissive", magma, bone="head", bevel=0.005, rot_euler=(-0.55, side * 0.32, 0.0))
        # Upper black steel crown spikes
        b.add_prism((side * 0.18, 0.02, 2.66), 0.06, 0.01, 0.36, 5, "steel", dark_steel, bone="head", bevel=0.004, rot_euler=(-0.18, side * 0.15, 0.0))

    # 7. Giant Molten Demon Greatsword (weapon_R)
    wx, wy, wz = 0.86, -0.18, 1.10
    b.add_prism((wx, wy, wz - 0.10), 0.065, 0.05, 0.38, 6, "leather", 0x1C1917, bone="weapon_R", bevel=0.006)
    b.add_box((wx, wy, wz + 0.12), (0.14, 0.56, 0.11), "gold", gold, bone="weapon_R", bevel=0.010)
    b.add_blade((wx, wy, wz + 1.00), 0.10, 0.28, 1.66, "steel", dark_steel, bone="weapon_R", bevel=0.008, rot_euler=(0.0, 0.0, math.pi / 2))
    b.add_box((wx, wy, wz + 0.86), (0.08, 0.08, 0.96), "emissive", magma, bone="weapon_R", bevel=0.006)

    # 8. Orbiting Hellfire Crown Runes
    _add_orbiting_runes(b, 1.45, 5, 0.65, 2.86, magma)
    return _finalize_char(b, "belias_boss", scale=1.0, is_belias=True)


CHARACTER_BUILDERS = {
    "holy_knight": build_holy_knight,
    "black_mage": build_black_mage,
    "dragoon": build_dragoon,
    "sniper": build_sniper,
    "white_mystic": build_white_mystic,
    "ninja": build_ninja,
    "dark_knight_boss": build_dark_knight_boss,
    "dragoon_boss": build_dragoon_boss,
    "archmage_boss": build_archmage_boss,
    "golem_enemy": build_golem_enemy,
    "skeleton_enemy": build_skeleton_enemy,
    "lich_boss": build_lich_boss,
    "belias_boss": build_belias_boss,
}

PLAYABLE_IDS = ["holy_knight", "black_mage", "dragoon", "sniper", "white_mystic", "ninja"]
BOSS_ENEMY_IDS = ["dark_knight_boss", "dragoon_boss", "archmage_boss", "golem_enemy", "skeleton_enemy", "lich_boss"]


def main() -> None:
    argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", nargs="*", default=None)
    parser.add_argument("--no-qa", action="store_true")
    args = parser.parse_args(argv)

    targets = args.only if args.only else list(CHARACTER_BUILDERS.keys())
    qa_pngs: dict[str, str] = {}

    for job_id in targets:
        if job_id not in CHARACTER_BUILDERS:
            raise ValueError(f"Unknown character archetype: {job_id}")
        reset_scene()
        arm_obj, mesh_obj = CHARACTER_BUILDERS[job_id]()
        out_glb = os.path.join(OUT_MODELS_DIR, f"{job_id}.glb")
        export_rigged_glb(arm_obj, mesh_obj, out_glb)
        max_kb = 800.0 if job_id == "belias_boss" else 350.0
        max_tris = 15000 if job_id == "belias_boss" else 6500
        validate_glb(out_glb, expect_rigged=True, max_kb=max_kb, max_tris=max_tris)

        if not args.no_qa:
            if arm_obj.animation_data:
                arm_obj.animation_data.use_nla = False
            qa_path = os.path.join(OUT_QA_DIR, f"char_{job_id}.png")
            tile_sz = 384 if job_id == "belias_boss" else 256
            render_contact_sheet([mesh_obj], qa_path, tile_size=tile_sz)
            qa_pngs[job_id] = qa_path
            print(f"[QA PNG] {qa_path}")

    if not args.no_qa and not args.only:
        reset_scene()
        play_list = [qa_pngs[j] for j in PLAYABLE_IDS if j in qa_pngs]
        boss_list = [qa_pngs[j] for j in BOSS_ENEMY_IDS if j in qa_pngs]
        if play_list:
            stitch_png_grid(play_list, os.path.join(OUT_QA_DIR, "chars_playable.png"), cols=1)
        if boss_list:
            stitch_png_grid(boss_list, os.path.join(OUT_QA_DIR, "chars_bosses.png"), cols=1)


if __name__ == "__main__":
    main()
