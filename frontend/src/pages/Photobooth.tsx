import React, { useState, useRef, useEffect } from 'react';
import { Camera, Download, Share2, Repeat, Settings2, X, Link, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BACKEND_URL = 'http://localhost:3000';

const PhotoBooth = () => {
    const [stream, setStream] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [filter, setFilter] = useState('none');
    const [error, setError] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [cameraSettings, setCameraSettings] = useState({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
    });
    const [isSharing, setIsSharing] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
  
    // Predefined filters
    const filters = {
      none: 'none',
      grayscale: 'grayscale(100%)',
      sepia: 'sepia(100%)',
      invert: 'invert(100%)',
      vintage: 'sepia(50%) hue-rotate(-30deg) saturate(140%)',
      cool: 'hue-rotate(180deg)',
      warm: 'sepia(30%) brightness(120%)',
    };
  
    useEffect(() => {
      startCamera();
      return () => {
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      };
    }, []);
  
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' } 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setError(null);
      } catch (err) {
        setError('Failed to access camera. Please make sure you have granted camera permissions.');
      }
    };
  
    const takePhoto = () => {
      if (!videoRef.current) return;
  
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
  
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
  
      // Apply custom settings and filter
      const filterString = `${filters[filter]} brightness(${cameraSettings.brightness}%) 
                           contrast(${cameraSettings.contrast}%) 
                           saturate(${cameraSettings.saturation}%) 
                           blur(${cameraSettings.blur}px)`;
      
      context.filter = filterString;
      context.drawImage(video, 0, 0);
  
      const photoData = canvas.toDataURL('image/png');
      setPhoto(photoData);
    };  

  const sharePhoto = async () => {
    if (!photo) return;
    
    setIsSharing(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/photos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData: photo })
      });
      
      const data = await response.json();
      
      if (data.success) {
        const shareLink = `${window.location.origin}/shared/${data.shareId}`;
        setShareUrl(shareLink);
        
        if (navigator.share) {
          await navigator.share({
            title: 'Check out my photo!',
            text: 'Take a look at this photo from PhotoBooth',
            url: shareLink
          });
        }
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError('Failed to share photo. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {!photo ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ filter: filters[filter] }}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={photo}
                alt="Captured photo"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="flex justify-center gap-4 mt-4">
            {!photo ? (
              <Button onClick={takePhoto}>
                <Camera className="mr-2" /> Take Photo
              </Button>
            ) : (
              <>
                <Button onClick={() => setPhoto(null)}>
                  <Repeat className="mr-2" /> Retake
                </Button>
                <Button onClick={sharePhoto} disabled={isSharing}>
                  <Share2 className="mr-2" /> Share
                </Button>
              </>
            )}
          </div>

          {shareUrl && (
            <div className="mt-4 p-4 bg-secondary rounded-lg flex items-center gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-transparent"
              />
              <Button
                size="icon"
                onClick={() => navigator.clipboard.writeText(shareUrl)}
              >
                <Link className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default PhotoBooth;