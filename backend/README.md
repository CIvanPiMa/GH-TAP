# Backend - FastAPI

This is the backend service for the GloomHeaven Turn Assistant Platform built with FastAPI.

## Setup

1. Create a virtual environment:

    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows: .venv\Scripts\activate
    ```

2. Install dependencies:

    ```bash
    pip install -e .[dev]
    ```

## Running the Server

Development mode with auto-reload:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Or run directly:

```bash
python main.py
```

The API will be available at: <http://localhost:8000>

## API Documentation

Once the server is running, you can access:

- Swagger UI: <http://localhost:8000/docs>
- ReDoc: <http://localhost:8000/redoc>
