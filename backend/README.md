# Photo Booth Backend

Bun.js-powered backend for the Photo Booth application.

## Tech Stack

- Bun.js
- Express.js
- Socket.IO
- MongoDB

## Development

1. Install dependencies:
```bash
bun install
```

2. Start development server:
```bash
bun run dev
```

## Environment Variables

Create a `.env` file:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/photo-booth
```

## API Endpoints

```
GET    /api/photos      # List all photos
POST   /api/photos      # Upload new photo
GET    /api/photos/:id  # Get specific photo
DELETE /api/photos/:id  # Delete photo
```

## WebSocket Events

```
connection         # Client connected
disconnect        # Client disconnected
photo:new        # New photo taken
filter:apply     # Filter applied to photo
```

## Project Structure

```
src/
├── controllers/  # Route controllers
├── middleware/   # Express middleware
├── models/       # Database models
├── routes/       # API routes
├── services/     # Business logic
└── utils/        # Utility functions
```
````
