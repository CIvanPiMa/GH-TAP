from gh_tap_back import __version__
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from gh_tap_back.routers import root, turns

app = FastAPI(
    title="GH:TAP API",
    description="Backend API for GH:TAP",
    root_path="/api/v1",
    version=__version__,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(turns.router)
app.include_router(root.router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
