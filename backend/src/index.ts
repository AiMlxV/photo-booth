import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { connectDB } from './db';
import { setupRoutes } from './routes';

const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  // Create Elysia app
  const app = new Elysia()
    .use(cors())
    .get('/', () => 'Photo Booth API is running! 📸');

  // Setup routes
  setupRoutes(app);

  // Start server
  const port = process.env.PORT || 3000;
  app.listen(port);

  console.log(`🚀 Server is running at ${app.server?.hostname}:${app.server?.port}`);
};

startServer().catch(console.error);