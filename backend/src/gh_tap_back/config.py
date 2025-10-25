from importlib.resources import files

from pydantic_yaml import parse_yaml_file_as

from gh_tap_back import __version__
from gh_tap_back.models import Characters, Monsters, Scenarios


class Config:
    # Project settings
    PROJECT_NAME: str = "GH-TAP Backend"
    VERSION: str = __version__
    DESCRIPTION: str = "Backend API for GH-TAP application"
    API_V1_STR: str = "/api/v1"

    # CORS settings
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    # Data files
    DATA_DIR: str = "gh_tap_back.data"
    CHARACTERS: Characters = parse_yaml_file_as(Characters, files(DATA_DIR).joinpath("characters.yaml"))
    MONSTERS: Monsters = parse_yaml_file_as(Monsters, files(DATA_DIR).joinpath("monsters.yaml"))
    SCENARIOS: Scenarios = parse_yaml_file_as(Scenarios, files(DATA_DIR).joinpath("scenarios.yaml"))


config = Config()
