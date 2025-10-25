from enum import Enum
from typing import List
from pydantic import BaseModel, RootModel


class CardID(Enum):
    ONE = "1"
    TWO = "2"
    THREE = "3"
    FOUR = "4"


class CardLevel(Enum):
    ONE = "1"
    TWO = "2"


class AbilityAction(BaseModel):
    name: str
    initiative: int


class Ability(BaseModel):
    a: AbilityAction
    b: AbilityAction


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
    abilities: dict[CardID, dict[CardLevel, Ability]]


class Characters(RootModel):
    root: List[Character]

    def __iter__(self):
        return iter(self.root)

    def __getitem__(self, item):
        return self.root[item]
