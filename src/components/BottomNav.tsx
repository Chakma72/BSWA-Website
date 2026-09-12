import React from 'react';
import { Home, Award, Users, Heart, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const { activeRole } = useApp();

  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'scholarship', label: 'Scholarship', icon: Award },
    { id: 'alumni', label: 'Alumni', icon: Users },
    { id: 'donations', label: 'Donations', icon: Heart },
    { id: (activeRole === 'admin' || activeRole === 'executive') ? 'admin' : 'events', label: (activeRole === 'admin' || activeRole === 'executive') ? 'Admin' : 'Events', icon: Shield },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#180c10]/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-[#731326] dark:text-amber-400 font-bold scale-105'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
