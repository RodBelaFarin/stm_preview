
import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, AlertCircle, Camera, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [imageUrl1, setImageUrl1] = useState<string>('/api/state_machine_diagram.png');
  const [imageUrl2, setImageUrl2] = useState<string>('/api/inner_state_machine.png');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error1, setError1] = useState<string | null>(null);
  const [error2, setError2] = useState<string | null>(null);
  const [imageKey1, setImageKey1] = useState<number>(0);
  const [imageKey2, setImageKey2] = useState<number>(0);

  const pollImages = useCallback(async () => {
    try {
      const timestamp = Date.now();
      const newImageUrl1 = `/api/state_machine_diagram.png?t=${timestamp}`;
      const newImageUrl2 = `/api/inner_state_machine.png?t=${timestamp}`;
      
      // Test first image
      const img1 = new Image();
      img1.onload = () => {
        setImageUrl1(newImageUrl1);
        setError1(null);
        setImageKey1(prev => prev + 1);
      };
      img1.onerror = () => {
        setError1('Failed to load state machine diagram');
      };
      img1.src = newImageUrl1;

      // Test second image
      const img2 = new Image();
      img2.onload = () => {
        setImageUrl2(newImageUrl2);
        setError2(null);
        setImageKey2(prev => prev + 1);
      };
      img2.onerror = () => {
        setError2('Failed to load inner state machine');
      };
      img2.src = newImageUrl2;

      setLastUpdated(new Date());
      setIsLoading(false);
    } catch (err) {
      setError1('Network error occurred');
      setError2('Network error occurred');
      setIsLoading(false);
      console.error('Polling error:', err);
    }
  }, []);

  useEffect(() => {
    // Initial load
    pollImages();
    
    // Set up polling interval
    const interval = setInterval(pollImages, 1000);
    
    return () => clearInterval(interval);
  }, [pollImages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const hasAnyError = error1 || error2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Camera className="text-blue-400" size={40} />
            State Machine Monitor
          </h1>
          <p className="text-slate-300 text-lg">
            Real-time state machine diagram polling - Updates every second
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
              variant={hasAnyError ? "destructive" : "default"}
              className={hasAnyError ? "bg-red-600" : "bg-green-600"}
            >
              {hasAnyError ? "Error" : "Online"}
            </Badge>
          </div>
        </div>

        {/* Main State Machine Diagram */}
        <Card className="max-w-6xl mx-auto mb-8 bg-slate-800/30 backdrop-blur-sm border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-xl">State Machine Diagram</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative bg-slate-900 rounded-lg overflow-hidden border border-slate-700" style={{ minHeight: '600px' }}>
              {error1 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                  <AlertCircle size={48} className="mb-4 text-red-400" />
                  <p className="text-lg font-medium mb-2">State machine diagram unavailable</p>
                  <p className="text-sm text-slate-500">{error1}</p>
                  <p className="text-xs text-slate-600 mt-2">
                    Make sure your image is available at: /api/state_machine_diagram.png
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
                    key={imageKey1}
                    src={imageUrl1}
                    alt="State machine diagram"
                    className="w-full h-full object-contain transition-opacity duration-300"
                    style={{ opacity: isLoading ? 0.5 : 1, minHeight: '600px' }}
                  />
                </>
              )}
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm text-slate-400">
              <span>Auto-refresh: Every 1 second</span>
              <span>Image source: /api/state_machine_diagram.png</span>
            </div>
          </CardContent>
        </Card>

        {/* Inner State Machine */}
        <Card className="max-w-6xl mx-auto mb-8 bg-slate-800/30 backdrop-blur-sm border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-xl">Inner State Machine</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative bg-slate-900 rounded-lg overflow-hidden border border-slate-700" style={{ minHeight: '600px' }}>
              {error2 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                  <AlertCircle size={48} className="mb-4 text-red-400" />
                  <p className="text-lg font-medium mb-2">Inner state machine unavailable</p>
                  <p className="text-sm text-slate-500">{error2}</p>
                  <p className="text-xs text-slate-600 mt-2">
                    Make sure your image is available at: /api/inner_state_machine.png
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
                    key={imageKey2}
                    src={imageUrl2}
                    alt="Inner state machine"
                    className="w-full h-full object-contain transition-opacity duration-300"
                    style={{ opacity: isLoading ? 0.5 : 1, minHeight: '600px' }}
                  />
                </>
              )}
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm text-slate-400">
              <span>Auto-refresh: Every 1 second</span>
              <span>Image source: /api/inner_state_machine.png</span>
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
              <p>To use this state machine monitor:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Place your state machine diagram at <code className="bg-slate-700 px-2 py-1 rounded text-blue-300">/public/api/state_machine_diagram.png</code></li>
                <li>Place your inner state machine at <code className="bg-slate-700 px-2 py-1 rounded text-blue-300">/public/api/inner_state_machine.png</code></li>
                <li>Both images will automatically refresh every second</li>
                <li>For dynamic images, ensure your source updates the files regularly</li>
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
