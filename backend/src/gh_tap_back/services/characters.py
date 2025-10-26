from gh_tap_back.models.characters import Character, Characters
from gh_tap_back.config import config
from gh_tap_back.exceptions import NotFoundError


class CharacterService:
    @staticmethod
    def get_characters() -> Characters:
        return config.CHARACTERS

    @staticmethod
    def get_character_by_id(character_id: str) -> Character:
        characters = CharacterService.get_characters()
        for character in characters:
            if character.id == character_id:
                return character
        raise NotFoundError(f"Character '{character_id}' not found")
