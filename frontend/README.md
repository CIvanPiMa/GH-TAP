# Frontend - React + Vite

This is the frontend for the GH:TAP built with React and Vite.

## Setup

1. Install dependencies:

    ```bash
    npm install
    ```

## Running the Application

> **NOTE**: Make sure the [backend is running](#api-integration) before starting the frontend.

Development mode with hot module replacement:

```bash
npm run dev
```

The app will be available at: <http://localhost:5173>

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

The frontend connects to the FastAPI backend. By default, it expects the backend to be running at `http://localhost:8000`. To learn more about the backend, refer to the [backend README](../backend/README.md#running-the-server).

The Vite dev server is configured to proxy `/api` requests to the backend server.

### Generate the Client SDK

To generate the TypeScript client SDK, run:

```bash
npm run generate:sdk
```

> **NOTE**: This requires the OpenAPI spec to be available at `../backend/openapi.json`. Make sure to generate it using the backend script if it doesn't exist. See the [backend README](../backend/README.md#generate-the-openapi-spec) for instructions.
