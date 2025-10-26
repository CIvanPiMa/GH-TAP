from gh_tap_back.models.monsters import Monster, Monsters
from gh_tap_back.config import config
from gh_tap_back.exceptions import NotFoundError


class MonsterService:
    @staticmethod
    def get_monsters() -> Monsters:
        return config.MONSTERS

    @staticmethod
    def get_monster_by_id(monster_id: str) -> Monster:
        monsters = MonsterService.get_monsters()
        for monster in monsters:
            if monster.id == monster_id:
                return monster
        raise NotFoundError(f"Monster '{monster_id}' not found")
