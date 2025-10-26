import json

from fastapi.openapi.utils import get_openapi

from gh_tap_back.app import main


with open("openapi.json", "w") as f:
    print("Generating OpenAPI schema...")
    json.dump(
        get_openapi(
            title=main.title,
            version=main.version,
            openapi_version=main.openapi_version,
            description=main.description,
            routes=main.routes,
        ),
        f,
    )
    print("OpenAPI schema saved to openapi.json")
