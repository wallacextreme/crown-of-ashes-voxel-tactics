import math
import bpy
import bmesh
from mathutils import Euler, Matrix, Vector

from pbr_materials import get_pbr_material


class SculptedModelBuilder:
    """
    Procedural beveled micro-voxel & prism sculptor for Blender 5.3 -> glTF 2.0.
    Produces clean multi-material meshes with real beveled edges, weighted shading,
    vertical/cavity vertex color AO, and optional bone vertex groups.
    """

    def __init__(self) -> None:
        self._parts: list[dict] = []

    def add_box(
        self,
        center: tuple[float, float, float],
        size: tuple[float, float, float],
        kind: str,
        hex_color: int,
        bone: str = "torso",
        bevel: float = 0.012,
        segments: int = 1,
        taper_top: float = 1.0,
        rot_euler: tuple[float, float, float] = (0.0, 0.0, 0.0),
        tag: str = "",
    ) -> None:
        self._parts.append(
            {
                "shape": "box",
                "center": center,
                "size": size,
                "kind": kind,
                "hex_color": hex_color,
                "bone": bone,
                "bevel": bevel,
                "segments": segments,
                "taper_top": taper_top,
                "rot_euler": rot_euler,
                "tag": tag,
            }
        )

    def add_prism(
        self,
        center: tuple[float, float, float],
        r_bot: float,
        r_top: float,
        height: float,
        sides: int,
        kind: str,
        hex_color: int,
        bone: str = "torso",
        bevel: float = 0.008,
        rot_euler: tuple[float, float, float] = (0.0, 0.0, 0.0),
        tag: str = "",
    ) -> None:
        self._parts.append(
            {
                "shape": "prism",
                "center": center,
                "r_bot": r_bot,
                "r_top": r_top,
                "height": height,
                "sides": max(3, sides),
                "kind": kind,
                "hex_color": hex_color,
                "bone": bone,
                "bevel": bevel,
                "rot_euler": rot_euler,
                "tag": tag,
            }
        )

    def add_blade(
        self,
        center: tuple[float, float, float],
        width: float,
        thickness: float,
        length: float,
        kind: str,
        hex_color: int,
        bone: str = "weapon_R",
        bevel: float = 0.005,
        rot_euler: tuple[float, float, float] = (0.0, 0.0, 0.0),
        tag: str = "",
    ) -> None:
        self._parts.append(
            {
                "shape": "blade",
                "center": center,
                "width": width,
                "thickness": thickness,
                "length": length,
                "kind": kind,
                "hex_color": hex_color,
                "bone": bone,
                "bevel": bevel,
                "rot_euler": rot_euler,
                "tag": tag,
            }
        )

    def _create_part_bmesh(self, part: dict) -> bmesh.types.BMesh:
        bm = bmesh.new()
        shape = part["shape"]

        if shape == "box":
            sx, sy, sz = part["size"]
            bmesh.ops.create_cube(bm, size=1.0)
            for v in bm.verts:
                v.co.x *= sx
                v.co.y *= sy
                v.co.z *= sz
                if part["taper_top"] != 1.0 and v.co.z > 0.0:
                    v.co.x *= part["taper_top"]
                    v.co.y *= part["taper_top"]
            bev = min(part["bevel"], min(sx, sy, sz) * 0.35)
            if bev > 0.0005:
                bmesh.ops.bevel(
                    bm,
                    geom=list(bm.edges),
                    offset=bev,
                    segments=part["segments"],
                    affect="EDGES",
                    clamp_overlap=True,
                )

        elif shape == "prism":
            rb = part["r_bot"]
            rt = max(0.0005, part["r_top"])
            h = part["height"]
            bmesh.ops.create_cone(
                bm,
                cap_ends=True,
                cap_tris=False,
                segments=part["sides"],
                radius1=rb,
                radius2=rt,
                depth=h,
            )
            bev = min(part["bevel"], min(rb, max(rt, 0.01), h) * 0.25)
            if bev > 0.0005:
                sharp_edges = [
                    e
                    for e in bm.edges
                    if len(e.link_faces) == 2
                    and e.calc_face_angle(0.0) > math.radians(22.0)
                ]
                if sharp_edges:
                    bmesh.ops.bevel(
                        bm,
                        geom=sharp_edges,
                        offset=bev,
                        segments=1,
                        affect="EDGES",
                        clamp_overlap=True,
                    )

        elif shape == "blade":
            w = part["width"]
            t = part["thickness"]
            length = part["length"]
            tip_len = min(length * 0.22, max(w * 1.4, 0.08))
            body_top = length * 0.5 - tip_len
            body_bot = -length * 0.5

            # Diamond cross-section blade with tapered diamond tip
            verts_bot = [
                bm.verts.new((w * 0.5, 0.0, body_bot)),
                bm.verts.new((0.0, -t * 0.5, body_bot)),
                bm.verts.new((-w * 0.5, 0.0, body_bot)),
                bm.verts.new((0.0, t * 0.5, body_bot)),
            ]
            verts_mid = [
                bm.verts.new((w * 0.45, 0.0, body_top)),
                bm.verts.new((0.0, -t * 0.45, body_top)),
                bm.verts.new((-w * 0.45, 0.0, body_top)),
                bm.verts.new((0.0, t * 0.45, body_top)),
            ]
            v_tip = bm.verts.new((0.0, 0.0, length * 0.5))

            bm.faces.new(verts_bot[::-1])
            for i in range(4):
                ni = (i + 1) % 4
                bm.faces.new((verts_bot[i], verts_bot[ni], verts_mid[ni], verts_mid[i]))
                bm.faces.new((verts_mid[i], verts_mid[ni], v_tip))
            bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))

            bev = min(part["bevel"], min(w, t) * 0.18)
            if bev > 0.0005:
                edges = [
                    e
                    for e in bm.edges
                    if len(e.link_faces) == 2 and e.calc_face_angle(0.0) > math.radians(30.0)
                ]
                if edges:
                    bmesh.ops.bevel(
                        bm,
                        geom=edges,
                        offset=bev,
                        segments=1,
                        affect="EDGES",
                        clamp_overlap=True,
                    )

        rot_mat = Euler(part["rot_euler"], "XYZ").to_matrix().to_4x4()
        trans_mat = Matrix.Translation(Vector(part["center"]))
        bmesh.ops.transform(bm, matrix=trans_mat @ rot_mat, verts=list(bm.verts))
        bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
        return bm

    def build_mesh(
        self,
        name: str,
        rigged: bool = True,
        ground_to_zero: bool = True,
        collection: bpy.types.Collection | None = None,
    ) -> bpy.types.Object:
        """Compile all parts into one clean multi-material beveled Mesh Object."""
        if not self._parts:
            raise ValueError(f"No parts added to SculptedModelBuilder for {name}")

        master_bm = bmesh.new()
        mat_slots: list[bpy.types.Material] = []
        mat_index_map: dict[str, int] = {}

        # Track face -> (bone, is_emissive) via custom bmesh int layers
        bone_names: list[str] = []
        bone_idx_map: dict[str, int] = {}

        bone_layer = master_bm.faces.layers.int.new("bone_idx")
        emit_layer = master_bm.faces.layers.int.new("is_emissive")

        for part in self._parts:
            mat = get_pbr_material(part["kind"], part["hex_color"], part.get("tag", ""))
            if mat.name not in mat_index_map:
                mat_index_map[mat.name] = len(mat_slots)
                mat_slots.append(mat)
            m_idx = mat_index_map[mat.name]

            bname = part["bone"]
            if bname not in bone_idx_map:
                bone_idx_map[bname] = len(bone_names)
                bone_names.append(bname)
            b_idx = bone_idx_map[bname]
            is_emit = 1 if part["kind"] == "emissive" else 0

            p_bm = self._create_part_bmesh(part)
            vert_map: dict[int, bmesh.types.BMVert] = {}
            for pv in p_bm.verts:
                vert_map[pv.index] = master_bm.verts.new(pv.co)
            for pf in p_bm.faces:
                try:
                    nf = master_bm.faces.new([vert_map[v.index] for v in pf.verts])
                    nf.material_index = m_idx
                    nf[bone_layer] = b_idx
                    nf[emit_layer] = is_emit
                    nf.smooth = False  # Crisp faceted bevels catch clean specular highlights
                except ValueError:
                    pass
            p_bm.free()

        master_bm.verts.ensure_lookup_table()
        master_bm.verts.index_update()
        master_bm.faces.ensure_lookup_table()
        master_bm.faces.index_update()

        min_z = min(v.co.z for v in master_bm.verts)
        max_z = max(v.co.z for v in master_bm.verts)
        if ground_to_zero and abs(min_z) > 1e-5:
            bmesh.ops.translate(
                master_bm,
                vec=Vector((0.0, 0.0, -min_z)),
                verts=list(master_bm.verts),
            )
            max_z -= min_z
            min_z = 0.0

        span_z = max(0.05, max_z - min_z)

        # Record per-vertex bone indices and per-corner AO colors before converting to mesh
        vert_bones: dict[int, set[int]] = {i: set() for i in range(len(master_bm.verts))}
        for f in master_bm.faces:
            b_idx = f[bone_layer]
            for v in f.verts:
                vert_bones[v.index].add(b_idx)

        mesh = bpy.data.meshes.new(name)
        master_bm.to_mesh(mesh)

        for mat in mat_slots:
            mesh.materials.append(mat)

        # Bake subtle grayscale AO + vertical depth gradient into COLOR_0
        col_attr = mesh.color_attributes.new("Color", "BYTE_COLOR", "CORNER")
        master_bm.faces.ensure_lookup_table()
        loop_idx = 0
        for f in master_bm.faces:
            is_emit = f[emit_layer] == 1
            nz = f.normal.z
            dir_shade = 1.0 if nz > 0.35 else (0.76 if nz < -0.35 else 0.90)
            for loop in f.loops:
                if is_emit:
                    shade = 1.0
                else:
                    vert_t = max(0.0, min(1.0, (loop.vert.co.z - min_z) / span_z))
                    vert_grad = 0.84 + 0.16 * vert_t
                    shade = max(0.68, min(1.0, dir_shade * vert_grad))
                col_attr.data[loop_idx].color = (shade, shade, shade, 1.0)
                loop_idx += 1

        master_bm.free()
        mesh.update()

        obj = bpy.data.objects.new(name, mesh)
        target_col = collection if collection is not None else bpy.context.collection
        target_col.objects.link(obj)

        if rigged:
            vgroups = {bname: obj.vertex_groups.new(name=bname) for bname in bone_names}
            for v_idx, b_indices in vert_bones.items():
                if not b_indices:
                    continue
                first_b = next(iter(b_indices))
                vgroups[bone_names[first_b]].add([v_idx], 1.0, "REPLACE")

        return obj
