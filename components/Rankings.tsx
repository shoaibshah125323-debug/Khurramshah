
import React, { useState } from 'react';
import { User, Family, RankingType, TimeFilter } from '../types';

interface Props {
  user: User;
  family?: Family | null;
}

const Rankings: React.FC<Props> = ({ user, family }) => {
  const [type, setType] = useState<RankingType>('charm');
  const [filter, setFilter] = useState<TimeFilter>('daily');

  // Simulated leaderboard data with real current family if available
  const players = [
    { rank: 1, name: 'Zeus_King', score: type === 'charm' ? 1200000 : type === 'family' ? 850000000 : 5000, avatar: '⚡', isFamily: type === 'family' },
    { rank: 2, name: 'Hera_Queen', score: type === 'charm' ? 950000 : type === 'family' ? 620000000 : 4200, avatar: '👑', isFamily: type === 'family' },
    { rank: 3, name: 'Poseidon', score: type === 'charm' ? 750000 : type === 'family' ? 450000000 : 3800, avatar: '🔱', isFamily: type === 'family' },
    // If viewing family rankings, inject the current user's family
    ...(type === 'family' && family ? [{
      rank: 4, 
      name: family.name, 
      score: family.activity, 
      avatar: '🛡️', 
      isMe: true, 
      isFamily: true 
    }] : []),
    // If viewing charm rankings, inject current user
    ...(type === 'charm' ? [{
      rank: 5,
      name: user.username,
      score: user.totalCharm,
      avatar: '👤',
      isMe: true,
      isFamily: false
    }] : []),
    { rank: 6, name: 'Shadow_Stalker', score: type === 'charm' ? 300000 : type === 'family' ? 150000000 : 1200, avatar: '🌑', isFamily: type === 'family' },
  ].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4">
        {/* Category Tabs */}
        <div className="glass p-1 rounded-2xl flex border border-white/10">
          {['charm', 'family', 'vip'].map(t => (
            <button 
              key={t}
              onClick={() => setType(t as any)}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${type === t ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Time Filters */}
        <div className="flex gap-2">
          {['daily', 'weekly', 'total'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f as any)}
              className={`flex-1 py-2 text-[9px] font-black uppercase rounded-full border ${filter === f ? 'bg-white/10 border-white/20 text-white' : 'border-transparent text-gray-600'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="glass rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
        <div className="p-6 bg-gradient-to-r from-indigo-900/40 to-transparent flex items-center justify-between">
           <h3 className="text-sm font-black uppercase tracking-widest">Hall of Glory</h3>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-mono text-indigo-400">UPDATING LIVE</span>
           </div>
        </div>

        <div className="space-y-1 p-2">
          {players.map((p, i) => (
            <div 
              key={`${p.name}-${i}`} 
              className={`flex items-center justify-between p-4 rounded-2xl transition-all ${p.isMe ? 'bg-indigo-600/20 border border-indigo-500/30 ring-1 ring-indigo-500/20' : 'hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${i === 0 ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : i === 1 ? 'bg-gray-300 text-black' : i === 2 ? 'bg-orange-600 text-white' : 'bg-white/5 text-gray-500'}`}>
                   {i + 1}
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-xl shadow-inner">{p.avatar}</div>
                   <div>
                      <div className="flex items-center gap-2">
                        <p className={`text-xs font-black ${p.isMe ? 'text-indigo-400' : 'text-white'}`}>{p.name}</p>
                        {p.isFamily && <span className="text-[7px] border border-indigo-500/40 text-indigo-400 px-1 rounded-sm uppercase">FAM</span>}
                      </div>
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">LV. {Math.max(1, 12 - i)} {type.toUpperCase()}</p>
                   </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-xs font-black font-mono ${type === 'charm' ? 'text-pink-500' : type === 'family' ? 'text-emerald-500' : 'text-yellow-500'}`}>
                  {p.score.toLocaleString()}
                </p>
                <p className="text-[8px] text-gray-600 font-black uppercase tracking-tighter">{type === 'charm' ? 'Charm' : type === 'family' ? 'XP Score' : 'Elite Pts'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-indigo-600/10 p-4 rounded-[2rem] border border-white/5 text-center">
        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Rankings update every 60 seconds</p>
      </div>
    </div>
  );
};

export default Rankings;
