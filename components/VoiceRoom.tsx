
import React, { useState } from 'react';
import { User, Gift, RoomConfig } from '../types';
import { GIFTS } from '../constants';

interface Props {
  user: User;
  room: RoomConfig;
  setRoom: React.Dispatch<React.SetStateAction<RoomConfig>>;
  onSendGift: (g: Gift, count: number) => void;
}

const VoiceRoom: React.FC<Props> = ({ user, room, setRoom, onSendGift }) => {
  const [showGifts, setShowGifts] = useState(false);
  const [giftCount, setGiftCount] = useState(1);
  const [isEditingRoom, setIsEditingRoom] = useState(false);
  const [adminUid, setAdminUid] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', name: 'System', text: `Room ID: ${room.uid} | Welcome!` },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleAddAdmin = () => {
    if (!adminUid) return;
    setRoom(prev => ({ ...prev, admins: [...prev.admins, adminUid] }));
    setAdminUid('');
    alert(`UID ${adminUid} added as Room Admin!`);
  };

  const handleSendGiftLocal = (g: Gift) => {
    onSendGift(g, giftCount);
    setShowGifts(false);
    setMessages(p => [...p, { id: Date.now().toString(), name: user.username, text: `sent ${giftCount}x ${g.name}!` }]);
  };

  const isRoomAdmin = room.ownerUid === user.uid || room.admins.includes(user.uid);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className={`glass rounded-[3rem] p-8 border border-indigo-500/20 shadow-2xl relative overflow-hidden transition-all duration-700 ${room.theme}`}>
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-black">{room.title}</h2>
            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">ID: {room.uid}</p>
          </div>
          {isRoomAdmin && (
            <button onClick={() => setIsEditingRoom(!isEditingRoom)} className="w-10 h-10 glass rounded-full flex items-center justify-center">⚙️</button>
          )}
        </div>

        {isEditingRoom && (
          <div className="glass p-6 rounded-3xl mb-10 space-y-4 border border-white/10 animate-in slide-in-from-top-4">
            <input 
              value={room.title}
              onChange={e => setRoom({...room, title: e.target.value})}
              placeholder="Edit Room Title"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs"
            />
            <div className="flex gap-4 items-center">
              <input 
                value={adminUid}
                onChange={e => setAdminUid(e.target.value)}
                placeholder="Add Admin UID"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs"
              />
              <button onClick={handleAddAdmin} className="bg-indigo-600 px-6 py-3 rounded-xl font-bold text-[10px]">ADD</button>
            </div>
            <div className="flex gap-2">
              {['bg-[#0d0d1a]', 'bg-[#1a1b3a]', 'bg-[#2d1b2e]', 'bg-[#1a2d2e]'].map(c => (
                <button key={c} onClick={() => setRoom({...room, theme: c})} className={`w-8 h-8 rounded-full border border-white/20 ${c}`}></button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 gap-y-12 gap-x-8 mb-10">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center relative transition-all duration-300 ${i === 1 ? user.activeFrame || 'bg-white/5' : 'bg-white/5 border-2 border-dashed border-white/10'}`}>
                {i === 1 ? <img src={user.avatar} className="w-full h-full rounded-full" /> : <span className="text-xl opacity-20 group-hover:opacity-100">+</span>}
                {i === 1 && <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-1 rounded-full border border-black text-[8px] animate-pulse">🎤</div>}
              </div>
              <span className="text-[9px] font-black text-gray-500 uppercase">{i === 1 ? user.username : 'Seat'}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="h-48 glass rounded-3xl p-4 overflow-y-auto space-y-2 custom-scrollbar">
            {messages.map(m => (
              <div key={m.id} className="text-[11px]">
                <span className="font-black text-indigo-400 mr-2">{m.name}:</span>
                <span className="text-gray-300">{m.text}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              value={inputMsg}
              onChange={e => setInputMsg(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && setMessages(p => [...p, { id: Date.now().toString(), name: user.username, text: inputMsg }])}
              placeholder="Chat in room..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-xs focus:outline-none"
            />
            <button onClick={() => setShowGifts(true)} className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-xl shadow-lg active:scale-95 transition-all">🎁</button>
          </div>
        </div>
      </div>

      {showGifts && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowGifts(false)}>
          <div className="glass w-full max-w-lg rounded-[2.5rem] p-6 pb-12 animate-in slide-in-from-bottom-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-sm uppercase text-indigo-400">SELECT GIFT</h3>
              <div className="flex gap-2">
                {[1, 10, 66, 99, 520].map(n => (
                  <button key={n} onClick={() => setGiftCount(n)} className={`px-3 py-1 rounded-lg text-[10px] font-black ${giftCount === n ? 'bg-indigo-600' : 'bg-white/5'}`}>x{n}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {GIFTS.map(g => (
                <button key={g.id} onClick={() => handleSendGiftLocal(g)} className="flex flex-col items-center gap-1 p-3 bg-white/5 rounded-2xl border border-white/5 hover:border-pink-500/50 transition-all">
                  <span className="text-2xl">{g.icon}</span>
                  <span className="text-[8px] font-black uppercase text-center truncate w-full">{g.name}</span>
                  <div className="flex items-center gap-1 text-[9px] font-mono text-yellow-500">
                    <span>🪙</span> {g.price * giftCount}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceRoom;
