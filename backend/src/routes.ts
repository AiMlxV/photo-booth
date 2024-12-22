import { Elysia } from 'elysia';
import { v4 as uuidv4 } from 'uuid';
import { Photo } from './models';

export const setupRoutes = (app: Elysia) => {
  app.post('/api/photos', async ({ body }) => {
    try {
      const { imageData } = body as { imageData: string };
      
      if (!imageData) {
        return {
          success: false,
          error: 'Image data is required'
        };
      }

      const shareId = uuidv4();
      const photo = new Photo({
        imageData,
        shareId
      });
      
      await photo.save();
      
      return {
        success: true,
        shareId
      };
    } catch (error) {
      console.error('Error saving photo:', error);
      return {
        success: false,
        error: 'Failed to save photo'
      };
    }
  });

  app.get('/api/photos/:shareId', async ({ params }) => {
    try {
      const photo = await Photo.findOne({ shareId: params.shareId });
      
      if (!photo) {
        return {
          success: false,
          error: 'Photo not found'
        };
      }
      
      return {
        success: true,
        imageData: photo.imageData
      };
    } catch (error) {
      console.error('Error retrieving photo:', error);
      return {
        success: false,
        error: 'Failed to retrieve photo'
      };
    }
  });

  return app;
};