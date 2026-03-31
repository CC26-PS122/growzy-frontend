import React from 'react';

const MoodTracker = ({ isActive, onToggle }) => {
  return (
    <div className="bg-white/80 rounded-lg p-4 shadow-sm">
      
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-accent/30 text-accent flex items-center justify-center mr-3">
            <i className="fas fa-smile"></i>
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Mood Tracker</h3>
            <p className="text-xs text-gray-500">Log your current mood</p>
          </div>
        </div>
        <i className={fas fa-chevron-down text-gray-400 transition-transform ${isActive ? 'rotate-180' : ''}}></i>
      </div>

      
      {isActive && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <select
            className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option>Select mood</option>
            <option>Happy</option>
            <option>Calm</option>
            <option>Tired</option>
            <option>Stressed</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;