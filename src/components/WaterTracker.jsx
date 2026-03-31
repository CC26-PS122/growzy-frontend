import React from 'react';

const WaterTracker = ({ isActive, onToggle }) => {
  return (
    <div className="bg-white/80 rounded-lg p-4 shadow-sm">
      
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blueaccent/30 text-blueaccent flex items-center justify-center mr-3">
            <i className="fas fa-tint"></i>
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Drink Tracker</h3>
            <p className="text-xs text-gray-500">Track your daily water intake</p>
          </div>
        </div>
        <i className={fas fa-chevron-down text-gray-400 transition-transform ${isActive ? 'rotate-180' : ''}}></i>
      </div>

      
      {isActive && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <input
            type="number"
            placeholder="Enter mL"
            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      )}
    </div>
  );
};

export default WaterTracker;