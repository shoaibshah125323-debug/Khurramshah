
import React, { useState } from 'react';
import { User, Family } from '../types';

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  family: Family | null;
  setFamily: React.Dispatch<React.SetStateAction<Family | null>>;
}

const AdminPanel: React.FC<Props> = ({ user, setUser, family, setFamily }) => {
  const [targetUid, setTargetUid] = useState('');
  const [activeControl, setActiveControl] = useState<User | null>(null);

  const pullUserData = () => {
    if (targetUid === user.uid) {
      setActiveControl(user);
    } else {
      alert("Fetching external UID data via simulated cloud link...");
      setActiveControl({ ...user, uid: targetUid, username: `Guest_${targetUid}`, coins: 0, totalCharm: 0 });
    }
  };

  const injectCoins = (amt: number) => {
    if (!activeControl) return;
    if (activeControl.uid === user.uid) setUser(p => ({ ...p, coins: p.coins + amt }));
    alert(`Injected ${amt} coins into UID ${activeControl.uid}`);
  };

  const setVipLevel = (lvl: number) => {
    if (!activeControl) return;
    if (activeControl.uid === user.uid) setUser(p => ({ ...p, vipLevel: lvl }));
    alert(`UID ${activeControl.uid} VIP set to level ${lvl}`);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8">
      <div className="glass p-10 rounded-[3rem] border border-red-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full"></div>
        <h2 className="text-2xl font-black mb-8 flex items-center gap-3 text-red-500">
           <span className="animate-pulse">⚡</span> SYSTEM OVERRIDE
        </h2>

        <div className="flex gap-3 mb-10">
          <input 
            value={targetUid}
            onChange={e => setTargetUid(e.target.value)}
            placeholder="Target UID (e.g. 88294031)"
            className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:ring-1 ring-red-500 focus:outline-none"
          />
          <button onClick={pullUserData} className="bg-red-600 px-8 rounded-2xl font-black text-xs uppercase shadow-lg shadow-red-600/30 active:scale-95 transition-all">Connect</button>
        </div>

        {activeControl && (
          <div className="space-y-8 animate-in fade-in">
             <div className="flex items-center gap-4 p-6 bg-white/5 rounded-3xl border border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-indigo-600 flex items-center justify-center text-3xl shadow-xl">👑</div>
                <div>
                   <p className="font-black text-lg">{activeControl.username}</p>
                   <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Target UID: {activeControl.uid}</p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                   <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Inject Currency</p>
                   <div className="flex flex-col gap-2">
                      <button onClick={() => injectCoins(1000000)} className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black hover:bg-yellow-500/20 transition-all">+1M COINS</button>
                      <button onClick={() => injectCoins(10000000)} className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black hover:bg-yellow-500/20 transition-all">+10M COINS</button>
                   </div>
                </div>
                <div className="space-y-3">
                   <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Rank Elevation</p>
                   <div className="flex flex-col gap-2">
                      <button onClick={() => setVipLevel(12)} className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black hover:bg-indigo-500/20 transition-all">SET VIP 12 (MAX)</button>
                      <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black hover:bg-pink-500/20 transition-all">MAX CHARM RANK</button>
                   </div>
                </div>
             </div>

             <div className="pt-6 border-t border-white/10">
                <p className="text-[10px] font-black text-gray-500 uppercase mb-4 tracking-widest">Account Sanctions</p>
                <div className="flex gap-3">
                   <button className="flex-1 py-4 bg-red-600/10 border border-red-600/30 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest">Ban UID</button>
                   <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest">Clear Data</button>
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="glass p-8 rounded-[2.5rem] border border-indigo-500/20">
         <h3 className="text-sm font-black mb-4 uppercase tracking-widest text-indigo-400">Global Environment</h3>
         <button 
           onClick={() => setFamily(f => f ? {...f, activity: 1000000000, level: 10} : null)}
           className="w-full py-5 bg-gradient-to-r from-indigo-600 via-pink-600 to-indigo-600 rounded-2xl font-black text-xs uppercase shadow-xl shadow-indigo-600/20"
         >
           God Mode: Maximize Family Level (1 Billion Activity)
         </button>
      </div>
    </div>
  );
};

export default AdminPanel;
