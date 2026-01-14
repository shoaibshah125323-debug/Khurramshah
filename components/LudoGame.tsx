import React, { useState } from 'react';

interface Props {
  onExit: () => void;
}

const LudoGame: React.FC<Props> = ({ onExit }) => {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [positions, setPositions] = useState([0, 0, 0, 0]); // 4 pieces
  const [turn, setTurn] = useState(0);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setTimeout(() => {
      const val = Math.floor(Math.random() * 6) + 1;
      setDiceValue(val);
      setIsRolling(false);
      // Simple logic: auto move turn's piece
      setPositions(prev => {
        const next = [...prev];
        next[turn] = Math.min(next[turn] + val, 56); // max board steps
        return next;
      });
      setTurn((turn + 1) % 4);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#07070e] flex flex-col p-4 animate-in fade-in">
      <header className="flex justify-between items-center mb-4">
        <button onClick={onExit} className="w-10 h-10 glass rounded-full flex items-center justify-center">✕</button>
        <h2 className="text-sm font-black uppercase tracking-widest text-indigo-400">Elite Ludo Room</h2>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* Ludo Board Representation */}
        <div className="w-full max-w-sm aspect-square glass rounded-3xl border-8 border-indigo-900/50 relative overflow-hidden grid grid-cols-15 grid-rows-15">
          {/* Visual regions */}
          <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-red-500/20 border-r border-b border-white/5 flex items-center justify-center text-4xl opacity-50">🔴</div>
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-green-500/20 border-l border-b border-white/5 flex items-center justify-center text-4xl opacity-50">🟢</div>
          <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-yellow-500/20 border-r border-t border-white/5 flex items-center justify-center text-4xl opacity-50">🟡</div>
          <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-blue-500/20 border-l border-t border-white/5 flex items-center justify-center text-4xl opacity-50">🔵</div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 glass rotate-45 border-4 border-white/10 flex items-center justify-center">
               <span className="text-xl font-black -rotate-45">FINISH</span>
            </div>
          </div>

          {/* Simulated Pieces */}
          {positions.map((pos, i) => (
             <div 
               key={i} 
               className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all duration-500 z-20 ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-green-500' : i === 2 ? 'bg-yellow-500' : 'bg-blue-500'}`}
               style={{ 
                 top: `${20 + (i < 2 ? 0 : 50)}%`, 
                 left: `${20 + (i % 2 === 0 ? 0 : 50)}%`,
                 transform: `translate(${Math.sin(pos) * 20}px, ${Math.cos(pos) * 20}px)`
               }}
             />
          ))}
        </div>

        {/* Dice Controller */}
        <div className="flex flex-col items-center gap-4">
          <div className={`w-24 h-24 glass rounded-3xl border-4 border-white/10 flex items-center justify-center text-5xl shadow-2xl ${isRolling ? 'animate-bounce' : ''}`}>
            {diceValue}
          </div>
          <button 
            onClick={rollDice}
            disabled={isRolling}
            className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-2xl font-black uppercase text-xs shadow-xl active:scale-95 transition-all"
          >
            {isRolling ? 'Rolling...' : 'Roll Dice'}
          </button>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Player {turn + 1}'s Turn</p>
        </div>
      </div>
    </div>
  );
};

export default LudoGame;