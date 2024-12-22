import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';

const BACKEND_URL = 'http://localhost:3000';

const SharedPhoto = () => {
  const { shareId } = useParams();
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/photos/${shareId}`);
        const data = await response.json();
        
        if (data.success) {
          setPhoto(data.imageData);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to load photo');
      } finally {
        setLoading(false);
      }
    };

    if (shareId) {
      fetchPhoto();
    }
  }, [shareId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto mt-8">
      <CardContent className="p-4">
        {photo && <img src={photo} alt="Shared photo" className="w-full rounded-lg" />}
      </CardContent>
    </Card>
  );
};

export default SharedPhoto;