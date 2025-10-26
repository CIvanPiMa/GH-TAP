from typing import List
from pydantic import BaseModel, RootModel


class Scenario(BaseModel):
    id: str
    name: str
    level: int
    monsters_id: List[str]
    special_rules: List[str]
    goals: List[str]


class Scenarios(RootModel):
    root: List[Scenario]

    def __iter__(self):
        return iter(self.root)

    def __getitem__(self, item):
        return self.root[item]
