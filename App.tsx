import React, { useState, useMemo, useEffect } from 'react';
import { User, Family, AppTab, Gift, RoomConfig, RankingType, TimeFilter } from './types';
import { GIFTS, CHARM_RANKS, MAX_FAM_ACTIVITY } from './constants';
import VoiceRoom from './components/VoiceRoom';
import FamilySystem from './components/FamilySystem';
import AdminPanel from './components/AdminPanel';
import Shop from './components/Shop';
import Profile from './components/Profile';
import Auth from './components/Auth';
import Rankings from './components/Rankings';
import GameArena from './components/GameArena';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [globalNotice, setGlobalNotice] = useState<string | null>(null);

  // Load user from persistence
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('sv_active_user');
    if (saved) return JSON.parse(saved);
    return {
      uid: '',
      username: '',
      avatar: '',
      coins: 5000,
      totalCharm: 0,
      vipLevel: 0,
      vipPoints: 0,
      inventory: [],
      activeFrame: '',
      activeBubble: '',
      friends: [],
      bio: 'Elite Social Gamer.',
      socials: [],
      giftVault: [],
      isLoggedIn: false
    };
  });

  // Load family from persistence
  const [family, setFamily] = useState<Family | null>(() => {
    const saved = localStorage.getItem('sv_active_family');
    return saved ? JSON.parse(saved) : null;
  });

  const [room, setRoom] = useState<RoomConfig>({
    uid: '772910',
    title: 'Elite Lounge',
    theme: 'bg-[#0d0d1a]',
    ownerUid: '',
    admins: []
  });

  // Persist user and family on any change
  useEffect(() => {
    if (user.isLoggedIn) {
      localStorage.setItem('sv_active_user', JSON.stringify(user));
      // Also update the "registry" of users to simulate a permanent server database
      const userRegistry = JSON.parse(localStorage.getItem('sv_user_registry') || '{}');
      userRegistry[user.username.toLowerCase()] = user;
      localStorage.setItem('sv_user_registry', JSON.stringify(userRegistry));
    }
  }, [user]);

  useEffect(() => {
    if (family) {
      localStorage.setItem('sv_active_family', JSON.stringify(family));
    }
  }, [family]);

  useEffect(() => {
    if (user.isLoggedIn && !room.ownerUid) {
      setRoom(prev => ({ ...prev, ownerUid: user.uid }));
    }
  }, [user.isLoggedIn]);

  const charmBadge = useMemo(() => {
    return [...CHARM_RANKS].reverse().find(r => user.totalCharm >= r.min) || { label: 'Newbie', icon: '🌱' };
  }, [user.totalCharm]);

  const handleSendGift = (gift: Gift, count: number) => {
    const totalCost = gift.price * count;
    const totalCharmGain = gift.charm * count;
    
    if (user.coins < totalCost) return alert("Contact 03273126881 on WhatsApp for coins!");

    // Update User
    setUser(p => ({
      ...p,
      coins: p.coins - totalCost,
      totalCharm: p.totalCharm + totalCharmGain,
      vipPoints: p.vipPoints + (totalCost / 10),
      giftVault: [{ giftId: gift.id, count, sender: 'Self' }, ...p.giftVault]
    }));

    // Update Family Activity (1 Charm = 1 XP) - This powers the RANKINGS
    if (family) {
      setFamily(prev => {
        if (!prev) return null;
        const updatedMembers = prev.members.map(m => 
          m.uid === user.uid ? { ...m, contribution: m.contribution + totalCharmGain } : m
        );
        return {
          ...prev,
          activity: Math.min(prev.activity + totalCharmGain, MAX_FAM_ACTIVITY),
          members: updatedMembers
        };
      });
    }

    if (totalCost >= 5000) {
      setGlobalNotice(`🔥 BIG GIFT: ${user.username} sent ${count}x ${gift.name}! +${totalCharmGain} Family XP! 🔥`);
      setTimeout(() => setGlobalNotice(null), 5000);
    }
  };

  const handleLogin = (username: string, password: string) => {
    const userRegistry = JSON.parse(localStorage.getItem('sv_user_registry') || '{}');
    const existingUser = userRegistry[username.toLowerCase()];

    if (existingUser) {
      // Restore existing permanent UID account
      setUser({ ...existingUser, isLoggedIn: true });
    } else {
      // Create a brand new permanent UID
      const newUid = Math.floor(10000000 + Math.random() * 90000000).toString();
      const newUser: User = {
        ...user,
        username,
        uid: newUid,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        isLoggedIn: true,
        coins: 10000 // Welcome gift
      };
      setUser(newUser);
    }
  };

  if (!user.isLoggedIn) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6 animate-in slide-in-from-bottom-4">
             <div className="glass rounded-[2.5rem] p-8 bg-gradient-to-br from-indigo-900/40 to-transparent flex items-center justify-between border border-indigo-500/20 shadow-2xl">
                <div>
                   <h2 className="text-2xl font-black">Welcome Back,</h2>
                   <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">{user.username}</p>
                   <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 opacity-60">Permanent UID: {user.uid}</p>
                </div>
                <div className={`w-20 h-20 rounded-full border-4 ${user.activeFrame || 'border-white/10'} flex items-center justify-center p-1 overflow-hidden`}>
                   <img src={user.avatar} className="w-full h-full rounded-full bg-[#0d0d1a]" />
                </div>
             </div>
             
             <h3 className="px-4 text-xs font-black uppercase tracking-widest text-gray-500">Live Services</h3>
             <div className="grid grid-cols-2 gap-4">
                <div onClick={() => setActiveTab('party')} className="glass p-6 rounded-[2.5rem] border border-white/5 hover:border-indigo-500 cursor-pointer transition-all flex flex-col items-center">
                   <span className="text-4xl mb-3">🎙️</span>
                   <p className="font-black text-sm uppercase">Voice Rooms</p>
                </div>
                <div onClick={() => setActiveTab('games')} className="glass p-6 rounded-[2.5rem] border border-white/5 hover:border-pink-500 cursor-pointer transition-all flex flex-col items-center">
                   <span className="text-4xl mb-3">🕹️</span>
                   <p className="font-black text-sm uppercase">Game Arena</p>
                </div>
                <div onClick={() => setActiveTab('rank')} className="glass p-6 rounded-[2.5rem] border border-white/5 hover:border-yellow-500 cursor-pointer transition-all flex flex-col items-center">
                   <span className="text-4xl mb-3">🏆</span>
                   <p className="font-black text-sm uppercase">Hall of Fame</p>
                </div>
                <div onClick={() => setActiveTab('shop')} className="glass p-6 rounded-[2.5rem] border border-white/5 hover:border-emerald-500 cursor-pointer transition-all flex flex-col items-center">
                   <span className="text-4xl mb-3">🛍️</span>
                   <p className="font-black text-sm uppercase">Elite Shop</p>
                </div>
             </div>
          </div>
        );
      case 'party':
        return <VoiceRoom user={user} room={room} setRoom={setRoom} onSendGift={handleSendGift} />;
      case 'games':
        return <GameArena user={user} setUser={setUser} setGlobalNotice={setGlobalNotice} />;
      case 'family':
        return <FamilySystem family={family} user={user} setFamily={setFamily} />;
      case 'rank':
        return <Rankings user={user} family={family} />;
      case 'shop':
        return <Shop user={user} setUser={setUser} />;
      case 'profile':
        return <Profile user={user} setUser={setUser} badge={charmBadge} />;
      case 'admin':
        return <AdminPanel user={user} setUser={setUser} family={family} setFamily={setFamily} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#07070e] text-white">
      {globalNotice && (
        <div className="fixed top-0 left-0 w-full z-[100] bg-gradient-to-r from-yellow-500 via-pink-600 to-indigo-600 py-1 text-[10px] font-black text-center border-b border-white/20">
          <marquee scrollamount="12">{globalNotice}</marquee>
        </div>
      )}

      <header className="px-6 py-4 flex justify-between items-center bg-[#07070e]/80 backdrop-blur-xl sticky top-0 z-50 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center font-black text-xl shadow-lg shadow-pink-500/20">W</div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black truncate max-w-[100px]">{user.username}</span>
              <span className="bg-yellow-500 text-black text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm">VIP {user.vipLevel}</span>
            </div>
            <div className="flex items-center gap-1 text-[9px] text-indigo-400 font-bold">
              <span className="text-pink-500">{charmBadge.icon}</span> {charmBadge.label}
            </div>
          </div>
        </div>
        <div className="bg-white/5 px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 shadow-inner">
          <span className="text-yellow-400 text-sm">🪙</span>
          <span className="text-xs font-mono font-bold text-yellow-500">{user.coins.toLocaleString()}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 pb-32">
        {renderContent()}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-lg glass rounded-full p-2 flex justify-around items-center z-50 border border-white/10 shadow-2xl backdrop-blur-3xl">
        <NavBtn icon="🏠" label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavBtn icon="🕹️" label="Games" active={activeTab === 'games'} onClick={() => setActiveTab('games')} />
        <NavBtn icon="🛡️" label="Family" active={activeTab === 'family'} onClick={() => setActiveTab('family')} />
        <NavBtn icon="🏆" label="Rank" active={activeTab === 'rank'} onClick={() => setActiveTab('rank')} />
        <NavBtn icon="👤" label="Me" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        <NavBtn icon="⚡" label="Edit" active={activeTab === 'admin'} onClick={() => setActiveTab('admin')} />
      </nav>
    </div>
  );
};

const NavBtn = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all ${active ? 'bg-indigo-600/20 text-indigo-400' : 'text-gray-500 hover:text-gray-300'}`}>
    <span className={`text-xl transition-transform ${active ? 'scale-110 -translate-y-0.5' : ''}`}>{icon}</span>
    <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default App;