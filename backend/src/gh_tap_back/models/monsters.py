from enum import Enum
from typing import Dict, List, TypeAlias
from pydantic import BaseModel, RootModel

from gh_tap_back.models.utils import Conditions, EffectTypes, MoveTypes


Bonus: TypeAlias = Conditions | EffectTypes | MoveTypes


class MonsterInitiativeSymbol(Enum):
    minus = "-"
    zero = "o"
    plus = "+"


class Monster(BaseModel):
    id: str
    name: str
    health: int
    initiatives: Dict[MonsterInitiativeSymbol, int]
    persistent_bonuses: Dict[Bonus, int] = None
    attack_effects: Dict[Conditions, int] = None
    immunities: List[Conditions] = None


class Monsters(RootModel):
    root: List[Monster]

    def __iter__(self):
        return iter(self.root)

    def __getitem__(self, item):
        return self.root[item]
