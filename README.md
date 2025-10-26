# GH-TAP

A **G**loom**H**eaven **T**urn **A**ssistant **P**latform.

Micro-app for managing game setup, turn order, progress, and more in the GloomHeaven board games.

Built with React + Vite for the frontend and Python FastAPI for the backend.

## Architecture

This is a full-stack micro application consisting of:

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Python + FastAPI

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- Python (3.12 or higher)
- npm (or yarn)
- pip

### Running the Application

1. **Start the Backend** (Terminal 1):

   > NOTE: It's recommended to use a virtual environment for Python dependencies.

   ```bash
   cd backend
   pip install -e .
   python src/gh_tap_back/main.py
   ```

   Backend will run on <http://localhost:8000>

2. **Start the Frontend** (Terminal 2):

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Frontend will run on <http://localhost:5173>

3. **Open your browser** to <http://localhost:5173>

## Development

Install the pre-commit hooks:

```bash
pre-commit install
```

See individual README files in `backend/` and `frontend/` directories for more detailed development instructions.

## Deployment

Check the deployment [guide](./docker/README.md) for detailed instructions.

## Next Steps

- Add user authentication
