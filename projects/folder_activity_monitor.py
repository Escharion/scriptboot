"""Report files added, changed, or removed from a folder."""

import sys
import time
from pathlib import Path


def snapshot(folder: Path) -> dict[str, tuple[int, int]]:
    files = {}
    for entry in folder.iterdir():
        if entry.is_file():
            metadata = entry.stat()
            files[entry.name] = (metadata.st_mtime_ns, metadata.st_size)
    return files


def main() -> None:
    folder = Path(sys.argv[1] if len(sys.argv) > 1 else ".").expanduser().resolve()
    if not folder.is_dir():
        raise NotADirectoryError(f"Folder does not exist: {folder}")

    previous = snapshot(folder)
    print(f"Watching {folder} for file changes. Press Ctrl+C to stop.")
    try:
        while True:
            time.sleep(1)
            current = snapshot(folder)
            for name in sorted(current.keys() - previous.keys()):
                print(f"Added: {name}")
            for name in sorted(previous.keys() - current.keys()):
                print(f"Removed: {name}")
            for name in sorted(current.keys() & previous.keys()):
                if current[name] != previous[name]:
                    print(f"Changed: {name}")
            previous = current
    except KeyboardInterrupt:
        print("\nStopped watching.")


if __name__ == "__main__":
    main()
