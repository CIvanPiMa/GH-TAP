# Backend - FastAPI

This is the backend service for the GH:TAP built with FastAPI.

## Setup

1. Create a virtual environment:

    ```bash
    python -m venv .venv
    source .venv/bin/activate
    ```

2. Install dependencies:

    ```bash
    uv pip install -e ".[dev]"
    ```

## Running the Server

Development mode with auto-reload:

```bash
uvicorn src.gh_tap_back.main:app --reload --host 0.0.0.0 --port 8000
```

Or run directly:

```bash
python src/gh_tap_back/main.py
```

The API will be available at: <http://localhost:8000>

## API Documentation

Once the server is running, you can access:

- Swagger UI: <http://localhost:8000/docs>
- ReDoc: <http://localhost:8000/redoc>

### Generate the OpenAPI Spec

To generate the OpenAPI specification and save it to `openapi.json`, run:

```bash
python src/gh_tap_back/openapi_gen.py
```

## Testing

To run the test suite, use:

```bash
behave
```
