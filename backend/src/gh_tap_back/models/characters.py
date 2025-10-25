from enum import Enum
from typing import List
from pydantic import BaseModel, RootModel


class AbilityLevel(Enum):
    ONE = "1"
    TWO = "2"


class AbilityID(Enum):
    ONE = "1"
    TWO = "2"
    THREE = "3"
    FOUR = "4"


class Ability(BaseModel):
    name_a: str
    initiative_a: int
    name_b: str
    initiative_b: int


class CharacterHealthLevel(Enum):
    ONE = "1"
    TWO = "2"
    THREE = "3"
    FOUR = "4"
    FIVE = "5"


class Character(BaseModel):
    id: str
    name: str
    health_lvls: dict[CharacterHealthLevel, int]
    abilities: dict[AbilityLevel, dict[AbilityID, Ability]]


class Characters(RootModel):
    root: List[Character]

    def __iter__(self):
        return iter(self.root)

    def __getitem__(self, item):
        return self.root[item]
