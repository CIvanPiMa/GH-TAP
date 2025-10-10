from pydantic import BaseModel
from typing import Optional


# Models
class Turn(BaseModel):
    id: Optional[int] = None
    player: str
    action: str
    initiative: int


class TurnResponse(BaseModel):
    message: str
    turn: Turn
