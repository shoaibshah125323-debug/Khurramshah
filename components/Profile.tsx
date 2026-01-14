import React, { useState } from 'react';
import { User, SocialLink } from '../types';
import { SHOP_ITEMS } from '../constants';

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  badge: any;
}

const Profile: React.FC<Props> = ({ user, setUser, badge }) => {
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'inventory' | 'friends' | 'edit'>('info');
  const [editName, setEditName] = useState(user.username);
  const [editBio, setEditBio] = useState(user.bio);
  const [waLink, setWaLink] = useState('');

  const equipItem = (id: string) => {
    const item = SHOP_ITEMS.find(i => i.id === id);
    if (!item) return;
    if (item.type === 'frame') setUser({...user, activeFrame: item.image});
    if (item.type === 'bubble') setUser({...user, activeBubble: item.image});
  };

  const handleSave = () => {
    setUser({ ...user, username: editName, bio: editBio });
    alert("Profile Transmitted Successfully!");
    setActiveSubTab('info');
  };

  const handleLogout = () => {
    if (window.confirm("Disconnect from Elite Servers?")) {
      localStorage.removeItem('sv_active_user');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="glass rounded-[3rem] p-8 text-center relative overflow-hidden border border-white/10 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-900 to-pink-900 opacity-40"></div>
        <div className="absolute top-4 right-4 z-20">
           <button onClick={handleLogout} className="bg-red-500/20 text-red-500 px-4 py-1.5 rounded-full text-[9px] font-black border border-red-500/20 uppercase hover:bg-red-500 hover:text-white transition-all">Disconnect</button>
        </div>
        <div className="relative z-10 flex flex-col items-center pt-4">
          <div className={`relative p-1 rounded-full ${user.activeFrame || 'border-white/10'}`}>
            <img src={user.avatar} className="w-24 h-24 rounded-full bg-[#0d0d1a] border-4 border-[#0d0d1a]" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[9px] font-black px-3 py-1 rounded-full shadow-lg ring-2 ring-[#0d0d1a]">
              VIP {user.vipLevel}
            </div>
          </div>
          <h2 className="mt-6 text-2xl font-black">{user.username}</h2>
          <div className="flex items-center gap-2 mt-1">
             <span className="text-pink-500">{badge.icon}</span>
             <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">{badge.label}</span>
          </div>
          <p className="text-[9px] text-gray-500 font-bold mt-2 uppercase tracking-widest">Permanent UID: {user.uid}</p>
        </div>
        <div className="flex gap-4 mt-8">
           <div className="flex-1 bg-white/5 py-4 rounded-3xl border border-white/5">
             <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Charm</p>
             <p className="text-xl font-black text-pink-500">{user.totalCharm.toLocaleString()}</p>
           </div>
           <div className="flex-1 bg-white/5 py-4 rounded-3xl border border-white/5">
             <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">VIP Pts</p>
             <p className="text-xl font-black text-indigo-400">{user.vipPoints.toLocaleString()}</p>
           </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
        {['info', 'inventory', 'friends', 'edit'].map(t => (
          <button 
            key={t}
            onClick={() => setActiveSubTab(t as any)}
            className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSubTab === t ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white/5 text-gray-500'}`}
          >
            {t === 'edit' ? 'Modify ⚙️' : t}
          </button>
        ))}
      </div>

      {activeSubTab === 'info' && (
        <div className="glass rounded-[2.5rem] p-8 space-y-6 animate-in slide-in-from-top-4">
           <div>
             <label className="text-[9px] font-black text-gray-500 uppercase">Identity Bio</label>
             <p className="text-sm italic text-gray-300 bg-white/5 p-4 rounded-2xl mt-1">"{user.bio}"</p>
           </div>
           <div>
             <label className="text-[9px] font-black text-gray-500 uppercase">Connected Linkages</label>
             <div className="flex gap-2 mt-2">
                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-[10px] font-black">WHATSAPP</div>
                <div className="px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-400 text-[10px] font-black">INSTAGRAM</div>
             </div>
           </div>
        </div>
      )}

      {activeSubTab === 'edit' && (
        <div className="glass rounded-[2.5rem] p-8 space-y-6 animate-in fade-in">
           <div className="space-y-2">
             <label className="text-[10px] font-black text-gray-500 uppercase">Username Override</label>
             <input value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:ring-1 ring-indigo-500" />
           </div>
           <div className="space-y-2">
             <label className="text-[10px] font-black text-gray-500 uppercase">Identity Bio</label>
             <textarea value={editBio} onChange={e => setEditBio(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3 text-sm h-24 focus:ring-1 ring-indigo-500" />
           </div>
           <div className="space-y-2">
             <label className="text-[10px] font-black text-gray-500 uppercase">WhatsApp Link</label>
             <input value={waLink} placeholder="wa.me/number" onChange={e => setWaLink(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3 text-sm" />
           </div>
           <button onClick={handleSave} className="w-full py-4 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-2xl font-black text-xs uppercase shadow-xl shadow-indigo-600/20">SAVE CHANGES</button>
        </div>
      )}

      {activeSubTab === 'inventory' && (
        <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-4">
          {user.inventory.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-[10px] text-gray-500 font-black uppercase">Vault Empty</div>
          ) : (
            user.inventory.map(id => {
              const item = SHOP_ITEMS.find(i => i.id === id);
              if (!item) return null;
              return (
                <div key={id} className="glass p-4 rounded-3xl flex flex-col items-center gap-3 border border-white/5">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner ${item.image}`}>
                     {item.type === 'frame' ? '🖼️' : '💬'}
                  </div>
                  <button onClick={() => equipItem(id)} className="w-full py-2 bg-indigo-600 rounded-xl text-[9px] font-black uppercase">Equip</button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;