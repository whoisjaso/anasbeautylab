import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`${sizes[size]} animate-spin text-amber-600`} />
      {text && <p className="text-gray-600 text-sm">{text}</p>}
    </div>
  );
};

export default Loading;
