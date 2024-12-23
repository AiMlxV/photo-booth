# Photo Booth

A simple and interactive photo booth application that allows users to take pictures, apply filters, and save their memories.

## Features

- Take photos using your webcam
- Apply real-time filters and effects
- Save photos to your local device
- Easy-to-use interface

## Technology Stack

- **Frontend:** (see [frontend/README.md](frontend/README.md))
  - React.js
  - TypeScript
  - Tailwind CSS
  - WebRTC (for camera access)

- **Backend:** (see [backend/README.md](backend/README.md))
  - Bun.js
  - Express.js
  - Socket.IO (for real-time features)

- **Storage:**
  - MongoDB (for storing image metadata and photos)

## Prerequisites

- Bun.js (v1.0 or higher)
- Docker and Docker Compose
- Modern web browser with webcam support
- Webcam or built-in camera
- MongoDB (if running without Docker)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AiMlxV/photo-booth.git
cd photo-booth
```

2. Install dependencies:
```bash
bun install
```

## Usage

1. Start the development server:
```bash
npm start
```

2. Open your browser and navigate to `http://localhost:3000`
3. Allow camera access when prompted
4. Click the capture button to take photos
5. Apply filters as desired
6. Save your photos

## Docker Setup

1. Build and run the containers:
```bash
docker-compose up --build
```

2. For development with hot-reload:
```bash
docker-compose -f docker-compose.dev.yml up
```

3. Stop the containers:
```bash
docker-compose down
```

The application will be available at `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
