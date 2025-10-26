from gh_tap_back.routers.characters import router as characters_router
from gh_tap_back.routers.monsters import router as monsters_router
from gh_tap_back.routers.scenarios import router as scenarios_router

__all__ = [
    "characters_router",
    "monsters_router",
    "scenarios_router",
]
