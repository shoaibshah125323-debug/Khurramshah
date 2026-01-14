
import React from 'react';
import { Seat as SeatType } from '../types';

interface SeatProps {
  seat: SeatType;
  onClick: (seatId: number) => void;
  isCurrentUser: boolean;
}

const Seat: React.FC<SeatProps> = ({ seat, onClick, isCurrentUser }) => {
  return (
    <div 
      className="flex flex-col items-center gap-2 cursor-pointer group"
      onClick={() => onClick(seat.id)}
    >
      <div className={`
        relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
        ${seat.userId ? 'bg-indigo-500/20' : 'bg-white/5 border-2 border-dashed border-white/10 hover:border-white/30'}
        ${isCurrentUser ? 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-[#1a1a2e]' : ''}
      `}>
        {seat.userId ? (
          <>
            <img 
              src={seat.avatar || ''} 
              className="w-full h-full rounded-full object-cover border-2 border-indigo-400/50" 
              alt={seat.username || ''} 
            />
            {seat.isMuted && (
              <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-1 text-[8px] border border-[#1a1a2e]">
                🔇
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-indigo-500/10 animate-pulse pointer-events-none"></div>
          </>
        ) : (
          <span className="text-2xl text-white/20 group-hover:text-white/40 group-hover:scale-110 transition-transform">+</span>
        )}
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-tighter ${seat.userId ? 'text-white' : 'text-gray-500'}`}>
        {seat.userId ? seat.username : `Seat ${seat.id}`}
      </span>
    </div>
  );
};

export default Seat;
