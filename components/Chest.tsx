
import React, { useState } from 'react';
import { ChestType } from '../types';
import { FAMILY_REWARDS } from '../constants';

interface ChestProps {
  type: ChestType;
  isUnlocked: boolean;
  isClaimed: boolean;
  onOpen: (type: ChestType) => void;
}

const Chest: React.FC<ChestProps> = ({ type, isUnlocked, isClaimed, onOpen }) => {
  const [isShaking, setIsShaking] = useState(false);
  const config = FAMILY_REWARDS[type];

  const handleClick = () => {
    if (!isUnlocked || isClaimed) return;
    
    // Play pseudo sound (browser policy usually blocks auto-play, so we just animate)
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      onOpen(type);
    }, 600);
  };

  const chestIcons = {
    bronze: '📦',
    silver: '🧰',
    gold: '💎'
  };

  const getGlowClass = () => {
    if (!isUnlocked) return 'opacity-40 grayscale';
    if (isClaimed) return 'opacity-50 blur-[1px]';
    return `glow-${type} hover:scale-110 cursor-pointer`;
  };

  return (
    <div 
      className={`flex flex-col items-center p-4 transition-all duration-300 ${isClaimed ? 'pointer-events-none' : ''}`}
      onClick={handleClick}
    >
      <div className={`text-7xl mb-4 transition-all duration-500 ${getGlowClass()} ${isShaking ? 'shake-animation' : ''}`}>
        {chestIcons[type]}
      </div>
      
      <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isUnlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}>
        {isClaimed ? 'Claimed' : isUnlocked ? 'Ready to Open' : `${config.xpRequired} XP`}
      </div>
      
      <div className="mt-2 text-sm font-semibold text-gray-300">
        {config.label} Chest
      </div>
    </div>
  );
};

export default Chest;
