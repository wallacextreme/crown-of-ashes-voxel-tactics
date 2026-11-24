import json
import math
import os
import struct
import bpy
from mathutils import Vector

REQUIRED_ANIMATIONS = (
    "idle",
    "walk",
    "slash",
    "bow",
    "dual",
    "cast",
    "jump_up",
    "jump_down",
    "hit",
    "block",
    "dead",
)


def create_humanoid_armature(
    name: str = "Rig",
    scale: float = 1.0,
    is_belias: bool = False,
    bone_overrides: dict[str, tuple[float, float, float]] | None = None,
    collection: bpy.types.Collection | None = None,
) -> bpy.types.Object:
    """
    Create a clean humanoid/boss armature where every bone's local axes match Three.js:
      local +X -> +X (weapon side)
      local +Y -> +Z Blender (Up)
      local +Z -> -Y Blender (Front -> +Z in glTF/Three.js)
    """
    arm_data = bpy.data.armatures.new(name)
    arm_obj = bpy.data.objects.new(name, arm_data)
    target_col = collection if collection is not None else bpy.context.collection
    target_col.objects.link(arm_obj)

    bpy.context.view_layer.objects.active = arm_obj
    bpy.ops.object.mode_set(mode="EDIT")

    s = scale
    positions: dict[str, tuple[float, float, float]] = {
        "root": (0.0, 0.0, 0.0),
        "pelvis": (0.0, 0.0, 0.43 * s),
        "torso": (0.0, 0.0, 0.46 * s),
        "head": (0.0, 0.0, 0.98 * s),
        "cape": (0.0, 0.16 * s, 0.92 * s),
        "arm_L": (-0.32 * s, 0.0, 0.88 * s),
        "shield_L": (-0.42 * s, -0.10 * s, 0.62 * s),
        "arm_R": (0.32 * s, 0.0, 0.88 * s),
        "weapon_R": (0.37 * s, -0.10 * s, 0.56 * s),
        "leg_L": (-0.11 * s, 0.0, 0.43 * s),
        "leg_R": (0.11 * s, 0.0, 0.43 * s),
        "grimoire": (-0.25 * s, -0.22 * s, 0.72 * s),
        "runes": (0.0, 0.0, 1.44 * s),
        "wing_L": (-0.36 * s, 0.28 * s, 1.05 * s),
        "wing_R": (0.36 * s, 0.28 * s, 1.05 * s),
    }

    if is_belias:
        positions.update(
            {
                "pelvis": (0.0, 0.0, 0.78),
                "torso": (0.0, 0.0, 0.84),
                "head": (0.0, -0.05, 1.98),
                "cape": (0.0, 0.34, 1.75),
                "arm_L": (-0.72, 0.0, 1.72),
                "shield_L": (-0.88, -0.18, 1.15),
                "arm_R": (0.72, 0.0, 1.72),
                "weapon_R": (0.86, -0.18, 1.10),
                "leg_L": (-0.28, 0.0, 0.78),
                "leg_R": (0.28, 0.0, 0.78),
                "runes": (0.0, 0.0, 2.65),
                "wing_L": (-0.42, 0.35, 1.65),
                "wing_R": (0.42, 0.35, 1.65),
            }
        )

    if bone_overrides:
        positions.update(bone_overrides)

    parents: dict[str, str | None] = {
        "root": None,
        "pelvis": "root",
        "torso": "pelvis",
        "head": "torso",
        "cape": "torso",
        "arm_L": "torso",
        "shield_L": "arm_L",
        "arm_R": "torso",
        "weapon_R": "arm_R",
        "leg_L": "pelvis",
        "leg_R": "pelvis",
        "grimoire": "torso",
        "runes": "torso",
        "wing_L": "torso",
        "wing_R": "torso",
    }

    bone_len = 0.22 * s
    created: dict[str, bpy.types.EditBone] = {}
    for bname, head in positions.items():
        eb = arm_data.edit_bones.new(bname)
        hx, hy, hz = head
        eb.head = Vector((hx, hy, hz))
        eb.tail = Vector((hx, hy, hz + bone_len))
        eb.align_roll(Vector((0.0, -1.0, 0.0)))
        eb.use_deform = True
        created[bname] = eb

    for bname, pname in parents.items():
        if pname is not None:
            created[bname].parent = created[pname]

    bpy.ops.object.mode_set(mode="OBJECT")
    return arm_obj


def attach_mesh_to_armature(mesh_obj: bpy.types.Object, arm_obj: bpy.types.Object) -> None:
    mesh_obj.parent = arm_obj
    mod = mesh_obj.modifiers.new(name="Armature", type="ARMATURE")
    mod.object = arm_obj
    mod.use_vertex_groups = True


def _reset_pose(arm_obj: bpy.types.Object) -> None:
    for pb in arm_obj.pose.bones:
        pb.rotation_mode = "XYZ"
        pb.location = (0.0, 0.0, 0.0)
        pb.rotation_euler = (0.0, 0.0, 0.0)
        pb.scale = (1.0, 1.0, 1.0)


def _key_bones(
    arm_obj: bpy.types.Object,
    frame: int,
    bone_names: tuple[str, ...],
    key_loc: bool = False,
    key_scale: bool = False,
) -> None:
    for bname in bone_names:
        pb = arm_obj.pose.bones.get(bname)
        if pb is None:
            continue
        pb.rotation_mode = "XYZ"
        pb.keyframe_insert(data_path="rotation_euler", frame=frame)
        if key_loc:
            pb.keyframe_insert(data_path="location", frame=frame)
        if key_scale:
            pb.keyframe_insert(data_path="scale", frame=frame)


def build_all_animations(
    arm_obj: bpy.types.Object,
    archetype_id: str,
    scale: float = 1.0,
    is_belias: bool = False,
) -> None:
    """Create all 11 combat/tactical NLA tracks using Blender 5.3 Slotted Actions."""
    if not arm_obj.animation_data:
        arm_obj.animation_data_create()

    bpy.context.view_layer.objects.active = arm_obj
    bpy.ops.object.mode_set(mode="POSE")

    all_bones = tuple(arm_obj.pose.bones.keys())
    s = scale * (1.8 if is_belias else 1.0)

    def start_action(name: str):
        act = bpy.data.actions.new(name)
        arm_obj.animation_data.action = act
        slot = act.slots.new(id_type="OBJECT", name=arm_obj.name)
        arm_obj.animation_data.action_slot = slot
        _reset_pose(arm_obj)
        return act, slot

    def finish_action(name: str, act, slot) -> None:
        tr = arm_obj.animation_data.nla_tracks.new()
        tr.name = name
        st = tr.strips.new(name, 1, act)
        if hasattr(st, "action_slot"):
            st.action_slot = slot
        arm_obj.animation_data.action = None

    def set_pose(
        bname: str,
        rot: tuple[float, float, float] | None = None,
        loc: tuple[float, float, float] | None = None,
        scl: tuple[float, float, float] | None = None,
        frame: int | None = None,
    ) -> None:
        pb = arm_obj.pose.bones.get(bname)
        if pb is None:
            return
        pb.rotation_mode = "XYZ"
        if rot is not None:
            pb.rotation_euler = rot
            if frame is not None:
                pb.keyframe_insert(data_path="rotation_euler", frame=frame)
        if loc is not None:
            pb.location = loc
            if frame is not None:
                pb.keyframe_insert(data_path="location", frame=frame)
        if scl is not None:
            pb.scale = scl
            if frame is not None:
                pb.keyframe_insert(data_path="scale", frame=frame)

    # 1. IDLE (1..49 cyclic breathing, cape sway, floating grimoire/runes)
    act, slot = start_action("idle")
    for idx, f in enumerate((1, 13, 25, 37, 49)):
        _reset_pose(arm_obj)
        ang = (idx / 4.0) * math.pi * 2.0
        breath = math.sin(ang) * 0.018 * s
        sway = math.sin(ang) * 0.05
        set_pose("torso", rot=(0.02 + math.sin(ang) * 0.02, 0.0, 0.0), loc=(0.0, breath, 0.0), frame=f)
        set_pose("head", rot=(-0.02 + math.cos(ang) * 0.025, 0.0, 0.0), frame=f)
        set_pose("arm_R", rot=(-0.20 + sway, 0.0, -0.06), frame=f)
        set_pose("arm_L", rot=(-0.14 - sway, 0.0, 0.06), frame=f)
        set_pose("cape", rot=(0.16 + math.cos(ang) * 0.07, 0.0, 0.0), frame=f)
        set_pose("grimoire", loc=(0.0, math.sin(ang * 2.0) * 0.04, 0.0), rot=(0.0, 0.0, math.sin(ang) * 0.10), frame=f)
        set_pose("runes", rot=(0.0, ang, 0.0), loc=(0.0, math.sin(ang) * 0.04, 0.0), frame=f)
        set_pose("wing_L", rot=(0.08, -0.10 + sway, 0.0), frame=f)
        set_pose("wing_R", rot=(0.08, 0.10 - sway, 0.0), frame=f)
    finish_action("idle", act, slot)

    # 2. WALK (1..25 crisp tactical march)
    act, slot = start_action("walk")
    walk_frames = [
        (1, 0.0, 0.0),
        (7, 0.68, 0.085),
        (13, 0.0, 0.0),
        (19, -0.68, 0.085),
        (25, 0.0, 0.0),
    ]
    for f, stride, lift in walk_frames:
        _reset_pose(arm_obj)
        set_pose("pelvis", loc=(0.0, lift * s, 0.0), frame=f)
        set_pose("torso", rot=(0.14, -stride * 0.16, 0.0), frame=f)
        set_pose("head", rot=(-0.08, stride * 0.10, 0.0), frame=f)
        set_pose("leg_L", rot=(stride, 0.0, 0.0), frame=f)
        set_pose("leg_R", rot=(-stride, 0.0, 0.0), frame=f)
        set_pose("arm_L", rot=(-stride * 0.72 - 0.15, 0.0, 0.08), frame=f)
        set_pose("arm_R", rot=(stride * 0.72 - 0.15, 0.0, -0.08), frame=f)
        set_pose("cape", rot=(0.48 + abs(stride) * 0.18, 0.0, 0.0), frame=f)
        set_pose("wing_L", rot=(0.15, -0.15, 0.0), frame=f)
        set_pose("wing_R", rot=(0.15, 0.15, 0.0), frame=f)
    finish_action("walk", act, slot)

    # 3. SLASH (1..24 anticipation -> strike -> overshoot -> recovery)
    act, slot = start_action("slash")
    slash_poses = [
        (1, (0.0, 0.0, 0.0), (-0.2, 0.0, 0.0), (-0.15, 0.0, 0.0), 0.16, (0.0, 0.0, 0.0)),
        (7, (-0.10, 0.48, 0.0), (-1.85, 0.25, -0.25), (-0.45, 0.35, 0.15), 0.30, (0.0, 0.0, 0.0)),
        (13, (0.28, -0.78, 0.0), (1.05, -0.30, 0.20), (0.30, -0.20, 0.10), 0.46, (0.95, 0.0, 0.0)),
        (17, (0.20, -0.60, 0.0), (0.75, -0.20, 0.15), (0.15, -0.10, 0.10), 0.36, (0.65, 0.0, 0.0)),
        (24, (0.0, 0.0, 0.0), (-0.2, 0.0, 0.0), (-0.15, 0.0, 0.0), 0.16, (0.0, 0.0, 0.0)),
    ]
    for f, t_rot, r_rot, l_rot, c_rx, w_rot in slash_poses:
        _reset_pose(arm_obj)
        set_pose("torso", rot=t_rot, frame=f)
        set_pose("arm_R", rot=r_rot, frame=f)
        set_pose("arm_L", rot=l_rot, frame=f)
        set_pose("weapon_R", rot=w_rot, frame=f)
        set_pose("cape", rot=(c_rx, 0.0, 0.0), frame=f)
    finish_action("slash", act, slot)

    # 4. BOW (1..24 turn sideways, raise & draw bow, release)
    act, slot = start_action("bow")
    bow_poses = [
        (1, (0.0, 0.0, 0.0), (-0.2, 0.0, 0.0), (-0.2, 0.0, 0.0)),
        (8, (0.0, -0.52, 0.0), (-1.45, -0.25, 0.0), (-1.28, 0.45, 0.0)),
        (15, (-0.05, -0.55, 0.0), (-1.52, -0.30, 0.0), (-1.38, 0.55, 0.0)),
        (18, (0.06, -0.35, 0.0), (-1.30, -0.10, 0.0), (-1.05, 0.20, 0.0)),
        (24, (0.0, 0.0, 0.0), (-0.2, 0.0, 0.0), (-0.2, 0.0, 0.0)),
    ]
    for f, t_rot, r_rot, l_rot in bow_poses:
        _reset_pose(arm_obj)
        set_pose("torso", rot=t_rot, frame=f)
        set_pose("head", rot=(0.0, -t_rot[1] * 0.7, 0.0), frame=f)
        set_pose("arm_R", rot=r_rot, frame=f)
        set_pose("arm_L", rot=l_rot, frame=f)
        set_pose("cape", rot=(0.24, 0.0, 0.0), frame=f)
    finish_action("bow", act, slot)

    # 5. DUAL (1..24 twin X-slashes)
    act, slot = start_action("dual")
    dual_poses = [
        (1, (0.0, 0.0, 0.0), (-0.3, 0.0, 0.0), (-0.3, 0.0, 0.0)),
        (6, (0.12, 0.55, 0.0), (-1.65, 0.25, 0.0), (0.45, 0.25, 0.0)),
        (11, (0.24, -0.60, 0.0), (0.85, -0.30, 0.0), (-1.65, -0.25, 0.0)),
        (17, (0.24, 0.55, 0.0), (-1.55, 0.30, 0.0), (0.85, 0.25, 0.0)),
        (24, (0.0, 0.0, 0.0), (-0.2, 0.0, 0.0), (-0.2, 0.0, 0.0)),
    ]
    for f, t_rot, r_rot, l_rot in dual_poses:
        _reset_pose(arm_obj)
        set_pose("torso", rot=t_rot, frame=f)
        set_pose("arm_R", rot=r_rot, frame=f)
        set_pose("arm_L", rot=l_rot, frame=f)
        set_pose("cape", rot=(0.45, 0.0, 0.0), frame=f)
    finish_action("dual", act, slot)

    # 6. CAST (1..33 levitate slightly, arms raised, runes spin)
    act, slot = start_action("cast")
    for idx, f in enumerate((1, 9, 17, 25, 33)):
        _reset_pose(arm_obj)
        ang = (idx / 4.0) * math.pi * 2.0
        pulse = math.sin(ang) * 0.14
        set_pose("pelvis", loc=(0.0, (0.09 + math.sin(ang) * 0.03) * s, 0.0), frame=f)
        set_pose("torso", rot=(-0.10, 0.0, 0.0), frame=f)
        set_pose("head", rot=(-0.18, 0.0, 0.0), frame=f)
        set_pose("arm_R", rot=(-2.15 + pulse, 0.0, 0.22), frame=f)
        set_pose("arm_L", rot=(-1.95 - pulse, 0.0, -0.22), frame=f)
        set_pose("cape", rot=(0.62 + math.sin(ang) * 0.12, 0.0, 0.0), frame=f)
        set_pose("grimoire", loc=(0.0, 0.12 * s, 0.0), rot=(-0.25, 0.0, math.sin(ang) * 0.25), frame=f)
        set_pose("runes", rot=(0.0, ang * 2.0, 0.0), loc=(0.0, 0.08 * s, 0.0), frame=f)
    finish_action("cast", act, slot)

    # 7. JUMP_UP (1..16 stretched launch)
    act, slot = start_action("jump_up")
    for f, p in ((1, 0.0), (8, 1.0), (16, 1.0)):
        _reset_pose(arm_obj)
        set_pose("pelvis", scl=(0.90, 1.12, 0.90), frame=f)
        set_pose("torso", rot=(0.24 * p, 0.0, 0.0), frame=f)
        set_pose("arm_R", rot=(-2.35 * p, 0.0, 0.0), frame=f)
        set_pose("arm_L", rot=(-1.20 * p, 0.0, 0.0), frame=f)
        set_pose("leg_L", rot=(0.35 * p, 0.0, 0.0), frame=f)
        set_pose("leg_R", rot=(-0.45 * p, 0.0, 0.0), frame=f)
        set_pose("cape", rot=(0.75 * p, 0.0, 0.0), frame=f)
    finish_action("jump_up", act, slot)

    # 8. JUMP_DOWN (1..16 lance/blade pointed down dive)
    act, slot = start_action("jump_down")
    for f, p in ((1, 1.0), (16, 1.0)):
        _reset_pose(arm_obj)
        set_pose("pelvis", scl=(1.08, 0.92, 1.08), frame=f)
        set_pose("torso", rot=(-0.30 * p, 0.0, 0.0), frame=f)
        set_pose("arm_R", rot=(0.70 * p, 0.0, 0.0), frame=f)
        set_pose("weapon_R", rot=(1.35 * p, 0.0, 0.0), frame=f)
        set_pose("cape", rot=(0.85 * p, 0.0, 0.0), frame=f)
    finish_action("jump_down", act, slot)

    # 9. HIT (1..16 recoil backward then recover)
    act, slot = start_action("hit")
    for f, k in ((1, 0.0), (5, 1.0), (16, 0.0)):
        _reset_pose(arm_obj)
        set_pose("pelvis", loc=(0.0, 0.0, -0.10 * k * s), frame=f)
        set_pose("torso", rot=(-0.46 * k, 0.16 * k, 0.0), frame=f)
        set_pose("head", rot=(-0.34 * k, 0.0, 0.0), frame=f)
        set_pose("arm_L", rot=(0.45 * k, 0.0, -0.25 * k), frame=f)
        set_pose("arm_R", rot=(0.40 * k, 0.0, 0.25 * k), frame=f)
        set_pose("cape", rot=(0.45 * k, 0.0, 0.0), frame=f)
    finish_action("hit", act, slot)

    # 10. BLOCK (1..16 shield raised across chest)
    act, slot = start_action("block")
    for f, k in ((1, 0.0), (5, 1.0), (11, 1.0), (16, 0.0)):
        _reset_pose(arm_obj)
        set_pose("torso", rot=(0.10 * k, 0.35 * k, 0.0), frame=f)
        set_pose("arm_L", rot=(-1.15 * k, 0.58 * k, 0.0), frame=f)
        set_pose("shield_L", rot=(0.0, -0.45 * k, 0.0), frame=f)
        set_pose("arm_R", rot=(0.35 * k, 0.0, 0.0), frame=f)
    finish_action("block", act, slot)

    # 11. DEAD (1..20 collapse backward to floor)
    act, slot = start_action("dead")
    dead_poses = [
        (1, (0.0, 0.0, 0.0), (0.0, 0.0, 0.0)),
        (6, (-0.52, 0.0, 0.0), (0.0, -0.06 * s, -0.05 * s)),
        (14, (-1.42, 0.0, 0.05), (0.0, -0.26 * s, -0.10 * s)),
        (20, (-1.52, 0.0, 0.05), (0.0, -0.28 * s, -0.10 * s)),
    ]
    for f, p_rot, p_loc in dead_poses:
        _reset_pose(arm_obj)
        set_pose("pelvis", rot=p_rot, loc=p_loc, frame=f)
        set_pose("arm_L", rot=(0.35 if f > 8 else 0.0, 0.0, -0.55 if f > 8 else 0.0), frame=f)
        set_pose("arm_R", rot=(0.30 if f > 8 else 0.0, 0.0, 0.55 if f > 8 else 0.0), frame=f)
    finish_action("dead", act, slot)

    bpy.ops.object.mode_set(mode="OBJECT")
    _reset_pose(arm_obj)


def export_rigged_glb(arm_obj: bpy.types.Object, mesh_obj: bpy.types.Object, filepath: str) -> None:
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    bpy.ops.object.select_all(action="DESELECT")
    arm_obj.select_set(True)
    mesh_obj.select_set(True)
    bpy.context.view_layer.objects.active = arm_obj
    bpy.ops.export_scene.gltf(
        filepath=filepath,
        export_format="GLB",
        use_selection=True,
        export_yup=True,
        export_apply=False,
        export_animations=True,
        export_nla_strips=True,
        export_optimize_animation_size=True,
        export_materials="EXPORT",
        export_vertex_color="ACTIVE",
        export_lights=False,
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
        export_draco_position_quantization=14,
        export_draco_normal_quantization=10,
        export_draco_color_quantization=10,
        export_draco_generic_quantization=12,
    )


def export_static_glb(objs: list[bpy.types.Object], filepath: str) -> None:
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.export_scene.gltf(
        filepath=filepath,
        export_format="GLB",
        use_selection=True,
        export_yup=True,
        export_apply=True,
        export_animations=False,
        export_materials="EXPORT",
        export_vertex_color="ACTIVE",
        export_lights=False,
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
        export_draco_position_quantization=14,
        export_draco_normal_quantization=10,
        export_draco_color_quantization=10,
        export_draco_generic_quantization=12,
    )


def validate_glb(
    filepath: str,
    expect_rigged: bool = False,
    max_kb: float = 350.0,
    max_tris: int = 6500,
) -> dict:
    assert os.path.exists(filepath), f"Missing GLB: {filepath}"
    size_kb = os.path.getsize(filepath) / 1024.0

    with open(filepath, "rb") as f:
        magic, _version, _length = struct.unpack("<III", f.read(12))
        assert magic == 0x46546C67, f"Invalid GLB magic in {filepath}"
        chunk_len, chunk_type = struct.unpack("<II", f.read(8))
        assert chunk_type == 0x4E4F534A, f"Expected JSON chunk in {filepath}"
        gj = json.loads(f.read(chunk_len))

    accessors = gj.get("accessors", [])
    total_tris = 0
    min_bounds = [float("inf")] * 3
    max_bounds = [float("-inf")] * 3

    for mesh in gj.get("meshes", []):
        for prim in mesh.get("primitives", []):
            if "indices" in prim:
                total_tris += accessors[prim["indices"]]["count"] // 3
            pos_idx = prim.get("attributes", {}).get("POSITION")
            if pos_idx is not None:
                acc = accessors[pos_idx]
                if "min" in acc and "max" in acc:
                    for i in range(3):
                        min_bounds[i] = min(min_bounds[i], acc["min"][i])
                        max_bounds[i] = max(max_bounds[i], acc["max"][i])

    anims = [a.get("name", "") for a in gj.get("animations", [])]
    skins = len(gj.get("skins", []))

    assert size_kb <= max_kb, f"{filepath} too large: {size_kb:.1f} KB > {max_kb} KB"
    assert total_tris <= max_tris, f"{filepath} too many tris: {total_tris} > {max_tris}"
    if expect_rigged:
        assert skins >= 1, f"{filepath} missing skin!"
        missing = [req for req in REQUIRED_ANIMATIONS if req not in anims]
        assert not missing, f"{filepath} missing animations: {missing}"
        for a in gj.get("animations", []):
            assert len(a.get("channels", [])) > 0, f"{filepath} anim '{a.get('name')}' has 0 channels"

    info = {
        "file": os.path.basename(filepath),
        "kb": round(size_kb, 1),
        "tris": total_tris,
        "skins": skins,
        "anims": len(anims),
        "min": [round(v, 3) for v in min_bounds],
        "max": [round(v, 3) for v in max_bounds],
    }
    print(f"[GLB OK] {info}")
    return info
