# Photo Booth Frontend

React-based frontend for the Photo Booth application.

## Tech Stack

- React.js 18
- TypeScript 5
- Tailwind CSS
- WebRTC
- Vite

## Development

1. Install dependencies:
```bash
bun install
```

2. Start development server:
```bash
bun run dev
```

## Building

```bash
bun run build
```

## Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── services/      # API services
├── store/         # State management
└── utils/         # Utility functions
```
