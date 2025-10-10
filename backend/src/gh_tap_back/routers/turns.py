from typing import List

from fastapi import APIRouter

from gh_tap_back.models.turns import Turn, TurnResponse


# In-memory storage (for demo purposes)
turns: List[Turn] = []
turn_counter = 0


router = APIRouter(
    prefix="/turns",
    tags=["turns"],
)


@router.get("/", response_model=List[Turn])
def get_turns():
    """Get all turns"""
    return sorted(turns, key=lambda x: x.initiative, reverse=True)


@router.post("/", response_model=TurnResponse)
def create_turn(turn: Turn):
    """Create a new turn"""
    global turn_counter
    turn_counter += 1
    turn.id = turn_counter
    turns.append(turn)
    return {"message": "Turn created successfully", "turn": turn}


@router.delete("/{turn_id}")
def delete_turn(turn_id: int):
    """Delete a turn by ID"""
    global turns
    turns = [t for t in turns if t.id != turn_id]
    return {"message": f"Turn {turn_id} deleted successfully"}


@router.delete("/")
def clear_turns():
    """Clear all turns"""
    global turns, turn_counter
    turns = []
    turn_counter = 0
    return {"message": "All turns cleared"}
