
import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import StatusBar from '@/components/StatusBar';
import ImageCard from '@/components/ImageCard';
import Instructions from '@/components/Instructions';

const Index = () => {
  const [imageUrl1, setImageUrl1] = useState<string>('/api/state_machine_diagram.png');
  const [imageUrl2, setImageUrl2] = useState<string>('/api/inner_state_machine.png');
  const [imageUrl3, setImageUrl3] = useState<string>('/api/third_diagram.png');
  const [imageUrl4, setImageUrl4] = useState<string>('/api/fourth_diagram.png');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error1, setError1] = useState<string | null>(null);
  const [error2, setError2] = useState<string | null>(null);
  const [error3, setError3] = useState<string | null>(null);
  const [error4, setError4] = useState<string | null>(null);
  const [imageKey1, setImageKey1] = useState<number>(0);
  const [imageKey2, setImageKey2] = useState<number>(0);
  const [imageKey3, setImageKey3] = useState<number>(0);
  const [imageKey4, setImageKey4] = useState<number>(0);

  const pollImages = useCallback(async () => {
    try {
      const timestamp = Date.now();
      const newImageUrl1 = `/api/state_machine_diagram.png?t=${timestamp}`;
      const newImageUrl2 = `/api/inner_state_machine.png?t=${timestamp}`;
      const newImageUrl3 = `/api/third_diagram.png?t=${timestamp}`;
      const newImageUrl4 = `/api/fourth_diagram.png?t=${timestamp}`;
      
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

      // Test third image
      const img3 = new Image();
      img3.onload = () => {
        setImageUrl3(newImageUrl3);
        setError3(null);
        setImageKey3(prev => prev + 1);
      };
      img3.onerror = () => {
        setError3('Failed to load third diagram');
      };
      img3.src = newImageUrl3;

      // Test fourth image
      const img4 = new Image();
      img4.onload = () => {
        setImageUrl4(newImageUrl4);
        setError4(null);
        setImageKey4(prev => prev + 1);
      };
      img4.onerror = () => {
        setError4('Failed to load fourth diagram');
      };
      img4.src = newImageUrl4;

      setLastUpdated(new Date());
      setIsLoading(false);
    } catch (err) {
      setError1('Network error occurred');
      setError2('Network error occurred');
      setError3('Network error occurred');
      setError4('Network error occurred');
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

  const hasAnyError = !!(error1 || error2 || error3 || error4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <StatusBar lastUpdated={lastUpdated} hasAnyError={hasAnyError} />

        <ImageCard
          title="State Machine Diagram"
          imageUrl={imageUrl1}
          error={error1}
          imageKey={imageKey1}
          altText="State machine diagram"
          imagePath="/api/state_machine_diagram.png"
        />

        <ImageCard
          title="Inner State Machine"
          imageUrl={imageUrl2}
          error={error2}
          imageKey={imageKey2}
          altText="Inner state machine"
          imagePath="/api/inner_state_machine.png"
        />

        <ImageCard
          title="Third Diagram"
          imageUrl={imageUrl3}
          error={error3}
          imageKey={imageKey3}
          altText="Third diagram"
          imagePath="/api/third_diagram.png"
        />

        <ImageCard
          title="Fourth Diagram"
          imageUrl={imageUrl4}
          error={error4}
          imageKey={imageKey4}
          altText="Fourth diagram"
          imagePath="/api/fourth_diagram.png"
        />

        <Instructions />
      </div>
    </div>
  );
};

export default Index;
