from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="GloomHeaven Turn Assistant API",
    description="Backend API for GloomHeaven Turn Assistant Platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Turn(BaseModel):
    id: Optional[int] = None
    player: str
    action: str
    initiative: int

class TurnResponse(BaseModel):
    message: str
    turn: Turn

# In-memory storage (for demo purposes)
turns: List[Turn] = []
turn_counter = 0

@app.get("/")
def read_root():
    """Root endpoint"""
    return {
        "message": "Welcome to GloomHeaven Turn Assistant API",
        "version": "1.0.0"
    }

@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.get("/api/turns", response_model=List[Turn])
def get_turns():
    """Get all turns"""
    return sorted(turns, key=lambda x: x.initiative, reverse=True)

@app.post("/api/turns", response_model=TurnResponse)
def create_turn(turn: Turn):
    """Create a new turn"""
    global turn_counter
    turn_counter += 1
    turn.id = turn_counter
    turns.append(turn)
    return {
        "message": "Turn created successfully",
        "turn": turn
    }

@app.delete("/api/turns/{turn_id}")
def delete_turn(turn_id: int):
    """Delete a turn by ID"""
    global turns
    turns = [t for t in turns if t.id != turn_id]
    return {"message": f"Turn {turn_id} deleted successfully"}

@app.delete("/api/turns")
def clear_turns():
    """Clear all turns"""
    global turns, turn_counter
    turns = []
    turn_counter = 0
    return {"message": "All turns cleared"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
