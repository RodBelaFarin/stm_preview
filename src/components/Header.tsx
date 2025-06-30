
import React from 'react';
import { Camera } from 'lucide-react';

const Header = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
        <Camera className="text-blue-400" size={40} />
        State Machine Monitor
      </h1>
      <p className="text-slate-300 text-lg">
        Real-time state machine diagram polling - Updates every second
      </p>
    </div>
  );
};

export default Header;
