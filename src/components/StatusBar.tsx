
import React from 'react';
import { RefreshCw, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StatusBarProps {
  lastUpdated: Date;
  hasAnyError: boolean;
}

const StatusBar = ({ lastUpdated, hasAnyError }: StatusBarProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm rounded-lg px-6 py-3 border border-slate-700">
        <div className="flex items-center gap-2">
          <RefreshCw className="text-blue-400" size={18} />
          <span className="text-slate-300 text-sm">Active</span>
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
  );
};

export default StatusBar;
