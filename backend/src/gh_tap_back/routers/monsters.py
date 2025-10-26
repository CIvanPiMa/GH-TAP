from fastapi import APIRouter, HTTPException

from gh_tap_back.exceptions import NotFoundError
from gh_tap_back.models.monsters import Monster, Monsters
from gh_tap_back.services.monsters import MonsterService

router = APIRouter(
    prefix="/monsters",
    tags=["monsters"],
)


@router.get("/", response_model=Monsters)
def get_monsters():
    """Get all available monsters"""
    return MonsterService.get_monsters()


@router.get("/{monster_id}", response_model=Monster)
def get_monster(monster_id: str):
    """Get a specific monster by ID"""
    try:
        return MonsterService.get_monster_by_id(monster_id)
    except NotFoundError:
        raise HTTPException(status_code=404, detail=f"Monster '{monster_id}' not found")
