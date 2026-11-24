import bpy

_MATERIAL_CACHE: dict[tuple[str, int, str], bpy.types.Material] = {}


def clear_material_cache() -> None:
    _MATERIAL_CACHE.clear()


def srgb_channel_to_linear(c: float) -> float:
    if c <= 0.04045:
        return c / 12.92
    return ((c + 0.055) / 1.055) ** 2.4


def hex_to_linear_rgba(hex_int: int, alpha: float = 1.0) -> tuple[float, float, float, float]:
    r = ((hex_int >> 16) & 0xFF) / 255.0
    g = ((hex_int >> 8) & 0xFF) / 255.0
    b = (hex_int & 0xFF) / 255.0
    return (
        srgb_channel_to_linear(r),
        srgb_channel_to_linear(g),
        srgb_channel_to_linear(b),
        alpha,
    )


def _set_input(bsdf: bpy.types.Node, name: str, value) -> None:
    if name in bsdf.inputs:
        bsdf.inputs[name].default_value = value


def get_pbr_material(kind: str, hex_int: int, tag: str = "") -> bpy.types.Material:
    """Create or fetch a cached Principled BSDF material with semantic naming for glTF/Three.js."""
    key = (kind, hex_int, tag)
    if key in _MATERIAL_CACHE:
        mat = _MATERIAL_CACHE[key]
        try:
            _ = mat.name
            return mat
        except ReferenceError:
            del _MATERIAL_CACHE[key]

    prefix = tag if tag else kind
    mat_name = f"{prefix}_{kind}_{hex_int:06x}"
    if mat_name in bpy.data.materials:
        mat = bpy.data.materials[mat_name]
        _MATERIAL_CACHE[key] = mat
        return mat

    mat = bpy.data.materials.new(name=mat_name)
    if not mat.node_tree:
        mat.use_nodes = True

    nt = mat.node_tree
    bsdf = next((n for n in nt.nodes if n.type == "BSDF_PRINCIPLED"), None)
    if bsdf is None:
        bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")

    rgba = hex_to_linear_rgba(hex_int)
    _set_input(bsdf, "Base Color", rgba)
    _set_input(bsdf, "Alpha", 1.0)

    if kind == "steel":
        _set_input(bsdf, "Metallic", 0.90)
        _set_input(bsdf, "Roughness", 0.28)
        _set_input(bsdf, "Specular IOR Level", 0.55)
    elif kind == "gold":
        _set_input(bsdf, "Metallic", 0.95)
        _set_input(bsdf, "Roughness", 0.22)
        _set_input(bsdf, "Specular IOR Level", 0.65)
    elif kind in ("cloth", "cape"):
        _set_input(bsdf, "Metallic", 0.02)
        _set_input(bsdf, "Roughness", 0.88)
        _set_input(bsdf, "Sheen Weight", 0.25)
    elif kind == "leather":
        _set_input(bsdf, "Metallic", 0.06)
        _set_input(bsdf, "Roughness", 0.68)
    elif kind == "skin":
        _set_input(bsdf, "Metallic", 0.0)
        _set_input(bsdf, "Roughness", 0.62)
    elif kind == "stone":
        _set_input(bsdf, "Metallic", 0.04)
        _set_input(bsdf, "Roughness", 0.80)
    elif kind == "wood":
        _set_input(bsdf, "Metallic", 0.02)
        _set_input(bsdf, "Roughness", 0.76)
    elif kind == "foliage":
        _set_input(bsdf, "Metallic", 0.0)
        _set_input(bsdf, "Roughness", 0.82)
    elif kind == "ice":
        _set_input(bsdf, "Metallic", 0.08)
        _set_input(bsdf, "Roughness", 0.14)
        _set_input(bsdf, "Coat Weight", 0.85)
        _set_input(bsdf, "Coat Roughness", 0.10)
    elif kind == "obsidian":
        _set_input(bsdf, "Metallic", 0.18)
        _set_input(bsdf, "Roughness", 0.34)
        _set_input(bsdf, "Coat Weight", 0.40)
        _set_input(bsdf, "Coat Roughness", 0.18)
    elif kind == "emissive":
        _set_input(bsdf, "Metallic", 0.05)
        _set_input(bsdf, "Roughness", 0.20)
        _set_input(bsdf, "Emission Color", rgba)
        _set_input(bsdf, "Emission Strength", 2.6)
    else:
        _set_input(bsdf, "Metallic", 0.05)
        _set_input(bsdf, "Roughness", 0.75)

    # Connect Vertex Color ('Color') to Base Color multiply ONLY gently?
    # Note: glTF exporter exports vertex colors as COLOR_0 and Three.js MeshStandardMaterial
    # automatically multiplies base color by COLOR_0 when present.
    _MATERIAL_CACHE[key] = mat
    return mat
