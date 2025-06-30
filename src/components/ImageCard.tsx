
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ImageCardProps {
  title: string;
  imageUrl: string;
  error: string | null;
  imageKey: number;
  altText: string;
  imagePath: string;
}

const ImageCard = ({ title, imageUrl, error, imageKey, altText, imagePath }: ImageCardProps) => {
  return (
    <Card className="max-w-full mx-auto mb-8 bg-slate-800/30 backdrop-blur-sm border-slate-700">
      <CardHeader className="text-center">
        <CardTitle className="text-white text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative bg-slate-900 rounded-lg overflow-hidden border border-slate-700" style={{ minHeight: '800px' }}>
          {error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
              <AlertCircle size={48} className="mb-4 text-red-400" />
              <p className="text-lg font-medium mb-2">{title} unavailable</p>
              <p className="text-sm text-slate-500">{error}</p>
              <p className="text-xs text-slate-600 mt-2">
                Make sure your image is available at: {imagePath}
              </p>
            </div>
          ) : (
            <img
              key={imageKey}
              src={imageUrl}
              alt={altText}
              className="w-full h-full object-contain transition-opacity duration-300"
              style={{ minHeight: '800px' }}
            />
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center text-sm text-slate-400">
          <span>Auto-refresh: Every 1 second</span>
          <span>Image source: {imagePath}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
