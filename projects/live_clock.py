"""Display a live clock in the terminal."""

import time
from datetime import datetime


def main() -> None:
    try:
        while True:
            current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            print(f"\rLocal time: {current_time}", end="", flush=True)
            time.sleep(1)
    except KeyboardInterrupt:
        print()


if __name__ == "__main__":
    main()
