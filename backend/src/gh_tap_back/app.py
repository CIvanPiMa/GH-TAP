from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from gh_tap_back import routers
from gh_tap_back.config import config

main = FastAPI(
    title=config.PROJECT_NAME,
    description=config.DESCRIPTION,
    root_path=config.API_V1_STR,
    version=config.VERSION,
)

# Configure CORS
main.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Root router
@main.get("/")
def _():
    """Root endpoint"""
    return {
        "message": "Welcome to GloomHeaven Turn Assistant API, for more info visit /api/v1/docs",
        "version": "1.0.0",
    }


@main.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


# Other routers
main.include_router(routers.characters_router)
main.include_router(routers.monsters_router)
main.include_router(routers.scenarios_router)
main.include_router(routers.turns_router)
