
import React from 'react';
import { User, InventoryItem } from '../types';
import { SHOP_ITEMS } from '../constants';

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const Shop: React.FC<Props> = ({ user, setUser }) => {
  const buyItem = (item: InventoryItem) => {
    if (user.coins < item.price) return alert('Not enough coins! Contact Admin on WhatsApp.');
    setUser(p => ({
      ...p,
      coins: p.coins - item.price,
      inventory: [...p.inventory, item.id]
    }));
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4">
      <div className="glass rounded-[2.5rem] p-8 bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 text-center">
        <h3 className="text-lg font-black text-yellow-500 mb-2">GET MORE COINS</h3>
        <p className="text-xs text-gray-400 mb-6 font-bold">Automatic top-up is temporarily down. Contact below:</p>
        <div className="bg-black/40 p-4 rounded-3xl border border-white/10 inline-block">
          <p className="text-lg font-mono font-bold text-emerald-400">03273126881</p>
          <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest mt-1">WhatsApp Admin for Purchase</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {SHOP_ITEMS.map(item => {
          const owned = user.inventory.includes(item.id);
          return (
            <div key={item.id} className="glass rounded-[2rem] p-6 flex flex-col items-center gap-4 border border-white/5 hover:border-indigo-500/40 transition-all">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-inner ${item.image}`}>
                {item.type === 'frame' ? '🖼️' : item.type === 'bubble' ? '💬' : '🌌'}
              </div>
              <div className="text-center">
                <h4 className="text-[11px] font-black uppercase tracking-tight truncate w-32">{item.name}</h4>
                <p className="text-[9px] text-gray-500 font-bold uppercase">{item.type}</p>
              </div>
              <button 
                onClick={() => buyItem(item)}
                disabled={owned}
                className={`w-full py-3 rounded-2xl font-black text-[10px] uppercase transition-all ${owned ? 'bg-emerald-500/20 text-emerald-500' : 'bg-indigo-600 hover:scale-105 shadow-lg shadow-indigo-600/20'}`}
              >
                {owned ? 'OWNED' : `🪙 ${item.price.toLocaleString()}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
