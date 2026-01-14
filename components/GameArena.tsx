import React, { useState } from 'react';
import { User, Game } from '../types';
import LudoGame from './LudoGame';
import GreedyGame from './GreedyGame';

const GAMES: Game[] = [
  { id: 'ludo', name: 'Elite Ludo', icon: '🎲', description: 'Classic board game with family.', color: 'from-emerald-500 to-teal-700' },
  { id: 'greedy', name: 'Dice Duel (Greedy)', icon: '💰', description: 'Bet your coins for big wins!', color: 'from-orange-500 to-pink-700' },
  { id: 'mafia', name: 'Mafia Night', icon: '🕵️', description: 'Coming soon: Trust no one.', color: 'from-gray-700 to-black' },
];

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setGlobalNotice: (n: string | null) => void;
}

const GameArena: React.FC<Props> = ({ user, setUser, setGlobalNotice }) => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  if (activeGame === 'ludo') return <LudoGame onExit={() => setActiveGame(null)} />;
  if (activeGame === 'greedy') return <GreedyGame user={user} setUser={setUser} onExit={() => setActiveGame(null)} setGlobalNotice={setGlobalNotice} />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="glass rounded-[3rem] p-10 text-center border border-indigo-500/20 shadow-2xl relative overflow-hidden bg-gradient-to-br from-indigo-900/20 to-transparent">
        <h2 className="text-3xl font-black mb-2 italic">WEPLAY ARENA</h2>
        <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.3em]">Play Together. Win Together.</p>
        
        <div className="grid grid-cols-1 gap-6 mt-10">
          {GAMES.map(game => (
            <div 
              key={game.id}
              onClick={() => game.id !== 'mafia' && setActiveGame(game.id)}
              className={`glass group relative flex items-center gap-6 p-6 rounded-[2.5rem] border border-white/5 cursor-pointer hover:border-white/20 transition-all overflow-hidden ${game.id === 'mafia' ? 'opacity-50 grayscale' : ''}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${game.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${game.color} flex items-center justify-center text-4xl shadow-xl shadow-black/40 relative z-10`}>
                {game.icon}
              </div>
              <div className="text-left relative z-10">
                <h3 className="text-xl font-black uppercase italic tracking-tighter">{game.name}</h3>
                <p className="text-xs text-gray-400 font-bold">{game.description}</p>
                {game.id === 'mafia' && <span className="inline-block mt-2 bg-white/10 px-3 py-1 rounded-full text-[8px] font-black uppercase">Developing...</span>}
              </div>
              <div className="ml-auto text-2xl text-white/20 group-hover:translate-x-2 transition-transform">➜</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameArena;