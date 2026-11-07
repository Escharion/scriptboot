"""Report when a file's size changes."""

import argparse
import time
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("file", type=Path, help="Path to the file to monitor")
    file_path = parser.parse_args().file.expanduser()

    print(f"Monitoring {file_path}. Press Ctrl+C to stop.")
    last_size = None
    missing_reported = False
    try:
        while True:
            if file_path.is_file():
                size = file_path.stat().st_size
                if size != last_size:
                    print(f"File size: {size:,} bytes")
                    last_size = size
                missing_reported = False
            else:
                if not missing_reported:
                    print("File not found yet; waiting...")
                    missing_reported = True
                last_size = None
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopped monitoring.")


if __name__ == "__main__":
    main()
