import uvicorn
import signal
import sys


def cleanup_and_exit(signum, frame):
    print("\nShutting down gracefully...")
    sys.exit(0)


# Register signal handlers for graceful shutdown
signal.signal(signal.SIGINT, cleanup_and_exit)
signal.signal(signal.SIGTERM, cleanup_and_exit)

if __name__ == "__main__":
    uvicorn.run("gh_tap_back.app:main", host="0.0.0.0", port=8000, reload=True, reload_dirs=["./backend/"])
