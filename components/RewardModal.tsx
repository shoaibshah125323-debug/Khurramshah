
import React from 'react';
import { Reward } from '../types';

interface RewardModalProps {
  reward: Reward | null;
  onClose: () => void;
}

const RewardModal: React.FC<RewardModalProps> = ({ reward, onClose }) => {
  if (!reward) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="glass max-w-sm w-full p-8 rounded-3xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-white to-yellow-400 animate-pulse"></div>
        
        <div className="mb-6 relative inline-block">
          <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full scale-150"></div>
          <div className="text-6xl mb-2">🎁</div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">CHEST UNLOCKED!</h2>
        <p className="text-gray-400 mb-6">You found a rare treasure</p>

        <div className="bg-white/10 rounded-2xl p-6 mb-8 border border-white/20">
          <div className="text-3xl font-black text-yellow-400 uppercase tracking-widest drop-shadow-md">
            {reward.item}
          </div>
          {reward.jackpot && (
            <div className="mt-4 text-emerald-400 font-bold animate-bounce">
              🔥 JACKPOT: {reward.jackpot}
            </div>
          )}
          {reward.coins && (
             <div className="mt-2 text-yellow-500 font-bold">
               +{reward.coins} Coins
             </div>
          )}
        </div>

        <button 
          onClick={onClose}
          className="w-full py-4 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold rounded-xl hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-yellow-500/20"
        >
          COLLECT REWARD
        </button>
      </div>
    </div>
  );
};

export default RewardModal;
