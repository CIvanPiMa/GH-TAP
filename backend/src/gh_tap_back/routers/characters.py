from fastapi import APIRouter, HTTPException

from gh_tap_back.exceptions import NotFoundError
from gh_tap_back.models.characters import Character, Characters
from gh_tap_back.services.characters import CharacterService

router = APIRouter(
    prefix="/characters",
    tags=["characters"],
)


@router.get("/", response_model=Characters)
def get_characters():
    """Get all available characters"""
    return CharacterService.get_characters()


@router.get("/{character_id}", response_model=Character)
def get_character(character_id: str):
    """Get a specific character by ID"""
    try:
        return CharacterService.get_character_by_id(character_id)
    except NotFoundError:
        raise HTTPException(status_code=404, detail=f"Character '{character_id}' not found")
