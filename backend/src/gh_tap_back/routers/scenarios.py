from fastapi import APIRouter, HTTPException

from gh_tap_back.exceptions import NotFoundError
from gh_tap_back.models.scenarios import Scenario, Scenarios
from gh_tap_back.services.scenarios import ScenarioService

router = APIRouter(
    prefix="/scenarios",
    tags=["scenarios"],
)


@router.get("/", response_model=Scenarios)
def get_scenarios():
    """Get all available scenarios"""
    return ScenarioService.get_scenarios()


@router.get("/{scenario_id}", response_model=Scenario)
def get_scenario(scenario_id: str):
    """Get a specific scenario by ID"""
    try:
        return ScenarioService.get_scenario_by_id(scenario_id)
    except NotFoundError:
        raise HTTPException(status_code=404, detail=f"Scenario '{scenario_id}' not found")
