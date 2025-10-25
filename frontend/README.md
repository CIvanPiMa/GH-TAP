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

This command generates the OpenAPI schema from the FastAPI backend and then uses `openapi-ts` to create the TypeScript client SDK in `src/client`.

### Use the Client SDK

Use the [client wrapper](./src/client.ts) to interact with the backend API.
The Client is organized by entity with consistent verb naming:

```typescript
client.{entity}.{verb}()
```

Where `{entity}` can be:

- `characters`
- `monsters`
- `scenarios`
- etc...

Available verbs:

- `list()` - Get all items
- `get(id)` - Get a specific item by ID
- `update(data)` - Create or update an item
- `delete(id)` - Delete a specific item
- `deleteAll()` - Delete all items (where applicable)

```typescript
// List all characters
const characters = await client.characters.list();

// Get a specific character by ID
const character = await client.characters.get("1");
```
