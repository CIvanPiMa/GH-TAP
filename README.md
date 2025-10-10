# GH-TAP
A GloomHeaven Turn Assistant Platform

A micro application for managing turn order in GloomHeaven board game sessions. Built with a modern tech stack featuring React + Vite for the frontend and Python FastAPI for the backend.

## Architecture

This is a full-stack micro application consisting of:

- **Frontend**: React + Vite
  - Modern, responsive UI
  - Real-time turn tracking
  - Initiative-based turn ordering
  
- **Backend**: Python + FastAPI
  - RESTful API
  - CORS enabled for development
  - Auto-generated API documentation

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- Python 3.8 or higher
- npm or yarn

### Running the Application

1. **Start the Backend** (Terminal 1):
   ```bash
   cd backend
   pip install -r requirements.txt
   python main.py
   ```
   Backend will run on http://localhost:8000

2. **Start the Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will run on http://localhost:5173

3. **Open your browser** to http://localhost:5173

## Features

- 🎲 Add player turns with initiative values
- 📊 Automatic turn ordering by initiative
- ✨ Real-time updates
- 🗑️ Delete individual turns or clear all
- 🎨 Modern, responsive UI
- 🔌 RESTful API

## Project Structure

```
GH-TAP/
├── backend/           # FastAPI backend
│   ├── main.py       # Main application file
│   ├── requirements.txt
│   └── README.md
├── frontend/         # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx  # Main React component
│   │   └── App.css  # Styling
│   ├── package.json
│   └── README.md
└── README.md        # This file
```

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Development

See individual README files in `backend/` and `frontend/` directories for more detailed development instructions.

## License

MIT
