from pydantic import BaseModel, RootModel

from gh_tap_back import models


class Game(BaseModel):
    id: str
    character: models.Character
    scenario: models.Scenario
    difficulty: models.DifficultyLevels


class Games(RootModel):
    root: list[Game]
