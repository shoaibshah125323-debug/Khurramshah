
import React, { useState } from 'react';
import { Family, User, FamilyRole, JoinRequest } from '../types';
import { MAX_FAM_ACTIVITY } from '../constants';

interface Props {
  family: Family | null;
  user: User;
  setFamily: React.Dispatch<React.SetStateAction<Family | null>>;
}

const FamilySystem: React.FC<Props> = ({ family, user, setFamily }) => {
  const [searchFamUid, setSearchFamUid] = useState('');
  const [activeTab, setActiveTab] = useState<'members' | 'requests' | 'chat'>('members');
  const [chatInput, setChatInput] = useState('');

  const canCreate = user.totalCharm >= 30000;

  const handleSendJoinRequest = () => {
    if (!searchFamUid) return;
    alert(`Request sent to Family UID ${searchFamUid}! Waiting for Deputy or Admin approval.`);
    setSearchFamUid('');
  };

  const approveRequest = (req: JoinRequest) => {
    if (!family) return;
    setFamily({
      ...family,
      members: [...family.members, { uid: req.uid, username: req.username, role: 'Member', contribution: 0 }],
      joinRequests: family.joinRequests.filter(r => r.uid !== req.uid)
    });
    alert(`Approved ${req.username} to the family!`);
  };

  if (!family) return (
    <div className="space-y-6">
      <div className="glass rounded-[3rem] p-10 text-center border border-white/10 shadow-2xl animate-in slide-in-from-bottom-8">
        <div className="text-8xl mb-6 opacity-30">🛡️</div>
        <h2 className="text-2xl font-black mb-2">The Sovereign Path</h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">Search a UID to join or build your own dynasty.</p>
        
        <div className="flex gap-2 mb-10">
          <input 
            value={searchFamUid}
            onChange={e => setSearchFamUid(e.target.value)}
            placeholder="Search Family UID (6-digits)"
            className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:ring-1 ring-indigo-500"
          />
          <button onClick={handleSendJoinRequest} className="bg-indigo-600 px-8 rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-indigo-600/20">Apply</button>
        </div>

        <div className="pt-6 border-t border-white/5">
          {!canCreate ? (
            <div className="bg-white/5 px-6 py-4 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">
              Diamond 1 Required to Create Family (30k Charm)
            </div>
          ) : (
            <button 
              onClick={() => setFamily({
                id: 'fam-' + Date.now(),
                uid: Math.floor(100000 + Math.random() * 900000).toString(),
                name: 'Sovereign Knights',
                tag: 'SOV',
                level: 1,
                activity: 0,
                ownerUid: user.uid,
                members: [{ uid: user.uid, username: user.username, role: 'Owner', contribution: 0 }],
                joinRequests: [],
                chat: []
              })}
              className="w-full py-5 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-3xl font-black text-xs uppercase shadow-2xl active:scale-95 transition-all"
            >
              Found New Family (Level 1)
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const isManagement = family.ownerUid === user.uid || 
                       family.members.find(m => m.uid === user.uid && (m.role === 'Deputy' || m.role === 'Admin'));

  const progress = (family.activity / MAX_FAM_ACTIVITY) * 100;

  // Sorting members by contribution for the leaderboard feel
  const sortedMembers = [...family.members].sort((a, b) => b.contribution - a.contribution);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="glass rounded-[3.5rem] p-10 bg-gradient-to-br from-indigo-900/40 to-transparent relative overflow-hidden border border-indigo-500/30 shadow-2xl">
        <div className="flex justify-between items-start mb-10">
           <div>
              <h2 className="text-3xl font-black">{family.name} <span className="text-indigo-400">[{family.tag}]</span></h2>
              <div className="flex items-center gap-2 mt-2">
                 <span className="bg-indigo-600 text-[9px] font-black px-2 py-0.5 rounded shadow-lg uppercase tracking-wider">UID: {family.uid}</span>
                 <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">LV. {family.level}</span>
              </div>
           </div>
           <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl shadow-xl">🛡️</div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
            <span>Dynasty Activity Score</span>
            <span className="text-indigo-400">{family.activity.toLocaleString()} XP / 1B</span>
          </div>
          <div className="h-6 bg-black/40 rounded-full overflow-hidden border border-white/10 p-1">
            <div className="h-full bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500 rounded-full transition-all duration-1000 relative shadow-[0_0_15px_rgba(99,102,241,0.5)]" style={{ width: `${Math.max(progress, 2)}%` }}>
               <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <p className="text-[9px] text-gray-600 font-black uppercase text-center tracking-[0.2em] mt-2">Send gifts to increase Family Ranking!</p>
        </div>
      </div>

      <div className="glass rounded-[2.5rem] p-2 flex border border-white/5">
        {['members', 'requests', 'chat'].map(t => (
          <button 
            key={t}
            onClick={() => setActiveTab(t as any)}
            className={`flex-1 py-3 text-[10px] font-black uppercase rounded-2xl transition-all ${activeTab === t ? 'bg-indigo-600/20 text-white shadow-inner border border-indigo-500/20' : 'text-gray-500 hover:text-gray-300'}`}
          >
            {t} {t === 'requests' && family.joinRequests.length > 0 && `(${family.joinRequests.length})`}
          </button>
        ))}
      </div>

      {activeTab === 'members' && (
        <div className="space-y-3 animate-in slide-in-from-top-4">
          <div className="px-4 py-2 text-[9px] font-black uppercase tracking-widest text-gray-500 flex justify-between">
             <span>Member (UID)</span>
             <span>Contribution (XP)</span>
          </div>
          {sortedMembers.map((m, idx) => (
            <div key={m.uid} className={`flex justify-between items-center bg-white/5 p-4 rounded-3xl border border-white/5 transition-all ${m.uid === user.uid ? 'border-indigo-500/30 bg-indigo-500/5' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs ${idx < 3 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/40' : 'bg-indigo-500/20 text-indigo-400'}`}>
                    {idx + 1}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-black">{m.username}</p>
                    {idx === 0 && <span className="text-[8px] bg-yellow-500 text-black px-1.5 rounded font-black">MVP</span>}
                  </div>
                  <p className="text-[9px] text-gray-500 uppercase font-bold">UID: {m.uid} • {m.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-indigo-400 font-black">+{m.contribution.toLocaleString()} XP</p>
                <div className="w-16 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                   <div className="h-full bg-indigo-500" style={{ width: `${(m.contribution / (family.activity || 1)) * 100}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-3 animate-in slide-in-from-top-4">
          {family.joinRequests.length === 0 ? (
            <div className="text-center py-10 text-[10px] text-gray-600 font-black uppercase tracking-widest">No pending applicants</div>
          ) : (
            family.joinRequests.map(req => (
              <div key={req.uid} className="flex justify-between items-center bg-white/5 p-5 rounded-3xl border border-white/5">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-indigo-600/20 rounded-full flex items-center justify-center font-black">{req.username[0]}</div>
                   <div>
                     <p className="text-xs font-black">{req.username}</p>
                     <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">UID: {req.uid}</p>
                   </div>
                </div>
                {isManagement && (
                  <div className="flex gap-2">
                    <button onClick={() => approveRequest(req)} className="px-4 py-2 bg-emerald-500 text-black rounded-xl text-[10px] font-black uppercase shadow-lg shadow-emerald-500/20">Approve</button>
                    <button className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-[10px] font-black uppercase">Reject</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="flex flex-col h-[450px] glass rounded-[2.5rem] p-6 border border-white/5 animate-in slide-in-from-bottom-4">
           <div className="flex-1 overflow-y-auto space-y-4 mb-4 custom-scrollbar">
              <div className="bg-indigo-600/10 p-4 rounded-2xl border border-indigo-500/20 text-center">
                 <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-1">Family Message Center</p>
                 <p className="text-[8px] text-gray-500 uppercase tracking-widest">Only members of {family.name} can view this wall.</p>
              </div>
              {family.chat.map(m => (
                <div key={m.id} className="group">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{m.senderName}</span>
                    <span className="text-[8px] text-gray-600 font-mono">UID:{m.senderUid}</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5 inline-block max-w-[80%]">
                    <p className="text-[11px] text-gray-300">{m.text}</p>
                  </div>
                </div>
              ))}
           </div>
           <div className="flex gap-2">
              <input 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && chatInput && (setFamily({...family, chat: [...family.chat, {id: Date.now().toString(), senderUid: user.uid, senderName: user.username, text: chatInput, timestamp: Date.now()}]}), setChatInput(''))}
                placeholder="Secure transmission..." 
                className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-xs focus:ring-1 ring-indigo-500 focus:outline-none transition-all" 
              />
              <button onClick={() => chatInput && (setFamily({...family, chat: [...family.chat, {id: Date.now().toString(), senderUid: user.uid, senderName: user.username, text: chatInput, timestamp: Date.now()}]}), setChatInput(''))} className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl active:scale-90 transition-all hover:bg-indigo-500">🚀</button>
           </div>
        </div>
      )}
    </div>
  );
};

export default FamilySystem;
