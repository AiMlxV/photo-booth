# frontend/Dockerfile
FROM oven/bun:latest

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 5173

# Start the application in development mode
CMD ["bun", "run", "dev", "--", "--host"]