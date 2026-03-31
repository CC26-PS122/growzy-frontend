import React, { useState } from 'react';

import SleepTracker from './SleepTracker';
import WaterTracker from './WaterTracker';
import MoodTracker from './MoodTracker';

const Dashboard = () => {
  
  const [activeDropdown, setActiveDropdown] = useState(null);

  
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  
  const toggleDropdown = (trackerId) => {
    setActiveDropdown(activeDropdown === trackerId ? null : trackerId);
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      
      <div className="max-w-4xl mx-auto p-6">
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Hello, Username!</h1>
        </div>

        
        <div className="flex justify-center mb-8">
          <div className="bg-transparent rounded-full px-2 py-1 flex items-center shadow-sm">
            <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-4">
              <i className="fas fa-home"></i>
            </button>
            <button className="w-6 h-6 rounded-full bg-white/50 flex items-center justify-center text-gray-600 mr-4">
              <i className="fas fa-file-alt"></i>
            </button>
            <button className="w-6 h-6 rounded-full bg-white/50 flex items-center justify-center text-gray-600">
              <i className="fas fa-user"></i>
            </button>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-transparent rounded-xl p-0 shadow-sm">
            <div className="flex flex-col items-center mb-4">
              <p className="text-gray-600 mb-2">Date</p>
              <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center mb-2">
                <span className="text-white text-lg">Icon</span>
              </div>
              <p className="font-medium text-gray-800 mb-4">Text</p>
              <hr className="w-full border-gray-200 mb-4" />
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Sleep time</span>
                <span className="text-gray-800">__ hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Water intake</span>
                <span className="text-gray-800">__ mL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Mood</span>
                <span className="text-gray-800">__ mood</span>
              </div>
            </div>
          </div>

          
          <div className="md:col-span-2 space-y-6">
            
            <div className="bg-transparent rounded-xl p-0 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Weekly Habit Progress</h2>
              <div className="flex justify-between mb-4">
                {weekDays.map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-300 mb-1"></div>
                    <span className="text-xs text-gray-500">{day}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <button className="bg-primary text-white px-4 py-1 rounded-full text-sm shadow-sm">
                  View Monthly
                </button>
              </div>
            </div>

            
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Track your habit today.</h2>
              <div className="space-y-1">
                
                <SleepTracker 
                  isActive={activeDropdown === 1} 
                  onToggle={() => toggleDropdown(1)} 
                />

                
                <WaterTracker 
                  isActive={activeDropdown === 2} 
                  onToggle={() => toggleDropdown(2)} 
                />

                
                <MoodTracker 
                  isActive={activeDropdown === 3} 
                  onToggle={() => toggleDropdown(3)} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;