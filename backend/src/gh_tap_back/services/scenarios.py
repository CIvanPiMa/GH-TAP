from gh_tap_back.models.scenarios import Scenario, Scenarios
from gh_tap_back.config import config
from gh_tap_back.exceptions import NotFoundError


class ScenarioService:
    @staticmethod
    def get_scenarios() -> Scenarios:
        return config.SCENARIOS

    @staticmethod
    def get_scenario_by_id(scenario_id: str) -> Scenario:
        scenarios = ScenarioService.get_scenarios()
        for scenario in scenarios:
            if scenario.id == scenario_id:
                return scenario
        raise NotFoundError(f"Scenario '{scenario_id}' not found")
