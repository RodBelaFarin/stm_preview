
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Instructions = () => {
  return (
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
            <li>Place your third diagram at <code className="bg-slate-700 px-2 py-1 rounded text-blue-300">/public/api/third_diagram.png</code></li>
            <li>Place your fourth diagram at <code className="bg-slate-700 px-2 py-1 rounded text-blue-300">/public/api/fourth_diagram.png</code></li>
            <li>All images will automatically refresh every second</li>
            <li>For dynamic images, ensure your source updates the files regularly</li>
            <li>Supported formats: JPG, PNG, GIF, WebP</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Instructions;
