# Frontend - React + Vite

This is the frontend for the GloomHeaven Turn Assistant Platform built with React and Vite.

## Features

- ⚡️ Fast development with Vite
- ⚛️ React for UI components
- 🎨 Modern and responsive design
- 🔌 API integration with FastAPI backend

## Setup

1. Install dependencies:
```bash
npm install
```

## Running the Application

Development mode with hot module replacement:
```bash
npm run dev
```

The app will be available at: http://localhost:5173

## Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## API Integration

The frontend connects to the FastAPI backend running on `http://localhost:8000`. Make sure the backend is running before starting the frontend.

The Vite dev server is configured to proxy `/api` requests to the backend server.

## Technologies

- [Vite](https://vite.dev/) - Build tool
- [React](https://react.dev/) - UI library
- [ESLint](https://eslint.org/) - Linting
