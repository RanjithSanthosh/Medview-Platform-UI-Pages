import React from 'react';

const Legend: React.FC = () => {
  return (
    <div className="px-4 py-2 border-t border-medical-gray-200 text-xs text-medical-gray-600 bg-white rounded-b-lg">
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></div>
          <span>Indicates studies exceeded 3 hours and requires action.</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
          <span>Indicates studies of critical priority</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;
