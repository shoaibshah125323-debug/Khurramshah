import React, { useState } from 'react';
import { User } from '../types';

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  onExit: () => void;
  setGlobalNotice: (n: string | null) => void;
}

const GreedyGame: React.FC<Props> = ({ user, setUser, onExit, setGlobalNotice }) => {
  const [bet, setBet] = useState(10);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const handleBet = (outcome: 'high' | 'low') => {
    if (user.coins < bet) return alert("Not enough coins! Top up on WhatsApp.");
    setIsRolling(true);
    
    setTimeout(() => {
      const die1 = Math.floor(Math.random() * 6) + 1;
      const die2 = Math.floor(Math.random() * 6) + 1;
      const total = die1 + die2;
      setResult(total);
      setIsRolling(false);

      const win = (outcome === 'high' && total > 7) || (outcome === 'low' && total < 7);
      
      if (win) {
        const winAmt = bet * 2;
        setUser(p => ({ ...p, coins: p.coins + bet }));
        if (winAmt >= 1000) {
          setGlobalNotice(`💰 JACKPOT: ${user.username} just won ${winAmt} coins in DICE DUEL! 💰`);
          setTimeout(() => setGlobalNotice(null), 5000);
        }
      } else {
        setUser(p => ({ ...p, coins: p.coins - bet }));
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#07070e] flex flex-col p-6 animate-in fade-in">
      <header className="flex justify-between items-center mb-10">
        <button onClick={onExit} className="w-12 h-12 glass rounded-2xl flex items-center justify-center">✕</button>
        <div className="text-center">
          <h2 className="text-xl font-black uppercase italic tracking-tighter text-orange-500">Dice Duel</h2>
          <p className="text-[8px] text-gray-500 font-black uppercase tracking-[0.3em]">Greedy Social Edition</p>
        </div>
        <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
          <span className="text-yellow-500 text-xs">🪙</span>
          <span className="text-xs font-black">{user.coins.toLocaleString()}</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-12">
        <div className="flex gap-6 items-center">
          <div className={`w-24 h-24 glass rounded-3xl border-4 border-orange-500/30 flex items-center justify-center text-4xl shadow-2xl ${isRolling ? 'animate-spin' : ''}`}>
            {result ? result : '🎲'}
          </div>
        </div>

        <div className="w-full space-y-6">
          <div className="flex gap-4 justify-center">
            {[10, 50, 100, 500].map(amt => (
              <button 
                key={amt} 
                onClick={() => setBet(amt)}
                className={`w-16 h-12 rounded-xl text-[10px] font-black border transition-all ${bet === amt ? 'bg-orange-600 border-orange-400 shadow-lg shadow-orange-600/30' : 'bg-white/5 border-white/10 text-gray-500'}`}
              >
                {amt}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleBet('low')}
              disabled={isRolling}
              className="group glass relative overflow-hidden p-8 rounded-[2rem] border border-blue-500/20 hover:border-blue-500 transition-all text-center"
            >
              <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors"></div>
              <h4 className="text-2xl font-black italic relative z-10">LOW</h4>
              <p className="text-[10px] font-black uppercase text-blue-400 relative z-10">2x (2-6)</p>
            </button>
            <button 
              onClick={() => handleBet('high')}
              disabled={isRolling}
              className="group glass relative overflow-hidden p-8 rounded-[2rem] border border-red-500/20 hover:border-red-500 transition-all text-center"
            >
              <div className="absolute inset-0 bg-red-500/10 group-hover:bg-red-500/20 transition-colors"></div>
              <h4 className="text-2xl font-black italic relative z-10">HIGH</h4>
              <p className="text-[10px] font-black uppercase text-red-400 relative z-10">2x (8-12)</p>
            </button>
          </div>
        </div>

        <div className="text-center p-6 glass rounded-3xl border border-white/5 w-full max-w-xs">
          <p className="text-[10px] text-gray-500 font-black uppercase mb-2">Rules</p>
          <p className="text-[11px] leading-relaxed text-gray-400">Guess the sum of two dice. If correct, you double your coins. 7 is always a loss for all bets!</p>
        </div>
      </div>
    </div>
  );
};

export default GreedyGame;