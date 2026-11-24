import argparse
import os
import subprocess
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

DEFAULT_BLENDER = r"C:\Program Files\Blender Foundation\Blender 5.3\blender.exe"


def find_blender() -> str:
    env_bin = os.environ.get("BLENDER_BIN")
    if env_bin and os.path.exists(env_bin):
        return env_bin
    if os.path.exists(DEFAULT_BLENDER):
        return DEFAULT_BLENDER
    return "blender"


def run_blender(script_name: str, extra_args: list[str]) -> None:
    blender_bin = find_blender()
    script_path = os.path.join(SCRIPT_DIR, script_name)
    cmd = [
        blender_bin,
        "--background",
        "--factory-startup",
        "--python-exit-code",
        "1",
        "--python",
        script_path,
        "--",
        *extra_args,
    ]
    print(f"\n>>> Running: {' '.join(cmd)}")
    proc = subprocess.run(cmd, check=False)
    if proc.returncode != 0:
        raise RuntimeError(f"{script_name} failed with exit code {proc.returncode}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Crown of Ashes Blender Asset Factory")
    parser.add_argument("--phase", choices=["1", "all"], default="1")
    parser.add_argument("--no-qa", action="store_true")
    args = parser.parse_args()

    qa_flag = ["--no-qa"] if args.no_qa else []

    if args.phase == "1":
        run_blender("build_characters.py", ["--only", "holy_knight", "dark_knight_boss", *qa_flag])
        run_blender(
            "build_terrain_tiles.py",
            [
                "--only",
                "grass",
                "cobble",
                "stone",
                "wood",
                "carpet",
                "stair_stone",
                "bridge_wood",
                "column_stone",
                "column_earth",
                "--qa-name",
                "terrain_forest.png",
                *qa_flag,
            ],
        )
        run_blender(
            "build_props.py",
            [
                "--only",
                "tree",
                "torch",
                "pillar",
                "ruin_wall",
                "chest",
                "--qa-name",
                "props_forest.png",
                *qa_flag,
            ],
        )
    else:
        run_blender("build_characters.py", qa_flag)
        run_blender("build_terrain_tiles.py", ["--qa-name", "terrain_all.png", *qa_flag])
        run_blender("build_props.py", ["--qa-name", "props_all.png", *qa_flag])


if __name__ == "__main__":
    main()
