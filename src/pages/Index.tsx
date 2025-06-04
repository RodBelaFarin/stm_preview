
import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, AlertCircle, Camera, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [imageUrl, setImageUrl] = useState<string>('/api/camera-feed.jpg');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageKey, setImageKey] = useState<number>(0);

  const pollImage = useCallback(async () => {
    try {
      // Add timestamp to prevent caching
      const timestamp = Date.now();
      const newImageUrl = `/api/camera-feed.jpg?t=${timestamp}`;
      
      // Create a new image object to test if the image loads
      const img = new Image();
      
      img.onload = () => {
        setImageUrl(newImageUrl);
        setLastUpdated(new Date());
        setIsLoading(false);
        setError(null);
        setImageKey(prev => prev + 1);
      };
      
      img.onerror = () => {
        setError('Failed to load image');
        setIsLoading(false);
      };
      
      img.src = newImageUrl;
    } catch (err) {
      setError('Network error occurred');
      setIsLoading(false);
      console.error('Polling error:', err);
    }
  }, []);

  useEffect(() => {
    // Initial load
    pollImage();
    
    // Set up polling interval
    const interval = setInterval(pollImage, 1000);
    
    return () => clearInterval(interval);
  }, [pollImage]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Camera className="text-blue-400" size={40} />
            Live Image Monitor
          </h1>
          <p className="text-slate-300 text-lg">
            Real-time image polling system - Updates every second
          </p>
        </div>

        {/* Status Bar */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm rounded-lg px-6 py-3 border border-slate-700">
            <div className="flex items-center gap-2">
              <RefreshCw 
                className={`text-blue-400 ${isLoading ? 'animate-spin' : ''}`} 
                size={18} 
              />
              <span className="text-slate-300 text-sm">
                {isLoading ? 'Updating...' : 'Active'}
              </span>
            </div>
            
            <div className="w-px h-4 bg-slate-600"></div>
            
            <div className="flex items-center gap-2">
              <Clock className="text-slate-400" size={18} />
              <span className="text-slate-300 text-sm">
                Last update: {formatTime(lastUpdated)}
              </span>
            </div>
            
            <div className="w-px h-4 bg-slate-600"></div>
            
            <Badge 
              variant={error ? "destructive" : "default"}
              className={error ? "bg-red-600" : "bg-green-600"}
            >
              {error ? "Error" : "Online"}
            </Badge>
          </div>
        </div>

        {/* Main Image Display */}
        <Card className="max-w-4xl mx-auto bg-slate-800/30 backdrop-blur-sm border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-xl">Camera Feed</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
              {error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                  <AlertCircle size={48} className="mb-4 text-red-400" />
                  <p className="text-lg font-medium mb-2">Image unavailable</p>
                  <p className="text-sm text-slate-500">{error}</p>
                  <p className="text-xs text-slate-600 mt-2">
                    Make sure your image is available at: /api/camera-feed.jpg
                  </p>
                </div>
              ) : (
                <>
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 z-10">
                      <RefreshCw className="animate-spin text-blue-400" size={32} />
                    </div>
                  )}
                  <img
                    key={imageKey}
                    src={imageUrl}
                    alt="Live camera feed"
                    className="w-full h-full object-contain transition-opacity duration-300"
                    style={{ opacity: isLoading ? 0.5 : 1 }}
                  />
                </>
              )}
            </div>
            
            {/* Image Info */}
            <div className="mt-4 flex justify-between items-center text-sm text-slate-400">
              <span>Auto-refresh: Every 1 second</span>
              <span>Image source: /api/camera-feed.jpg</span>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <div className="max-w-2xl mx-auto mt-8">
          <Card className="bg-slate-800/20 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <AlertCircle className="text-blue-400" size={20} />
                Setup Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300 space-y-3">
              <p>To use this image monitor:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Place your image file at <code className="bg-slate-700 px-2 py-1 rounded text-blue-300">/public/api/camera-feed.jpg</code></li>
                <li>The image will automatically refresh every second</li>
                <li>For dynamic images, ensure your source updates the file regularly</li>
                <li>Supported formats: JPG, PNG, GIF, WebP</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
