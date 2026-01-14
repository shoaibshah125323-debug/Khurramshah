
import { Gift, InventoryItem, ChestType } from './types';

// Strict 5 Coins = 1 Charm ratio as requested
export const GIFTS: Gift[] = [
  { id: 1, name: 'Rose', icon: '🌹', price: 5, charm: 1 },
  { id: 2, name: 'Lollipop', icon: '🍭', price: 25, charm: 5 },
  { id: 3, name: 'Love Letter', icon: '💌', price: 50, charm: 10 },
  { id: 4, name: 'Sparkler', icon: '✨', price: 100, charm: 20 },
  { id: 5, name: 'Ring', icon: '💍', price: 500, charm: 100 },
  { id: 6, name: 'Teddy', icon: '🧸', price: 1250, charm: 250 },
  { id: 7, name: 'Perfume', icon: '🧴', price: 2500, charm: 500 },
  { id: 8, name: 'Magic Hat', icon: '🎩', price: 5000, charm: 1000 },
  { id: 9, name: 'Fireworks', icon: '🎆', price: 10000, charm: 2000 },
  { id: 10, name: 'Sports Car', icon: '🏎️', price: 25000, charm: 5000 },
  { id: 11, name: 'Private Jet', icon: '🛩️', price: 50000, charm: 10000 },
  { id: 12, name: 'Luxury Yacht', icon: '🚢', price: 100000, charm: 20000 },
  { id: 13, name: 'Castle', icon: '🏰', price: 250000, charm: 50000 },
  { id: 14, name: 'Starry Sky', icon: '🌌', price: 500000, charm: 100000 },
  { id: 15, name: 'Unicorn', icon: '🦄', price: 750000, charm: 150000 },
  { id: 16, name: 'Golden Phoenix', icon: '🔥', price: 1000000, charm: 200000 },
  { id: 17, name: 'Dragon Spirit', icon: '🐲', price: 1500000, charm: 300000 },
  { id: 18, name: 'Crystal Heart', icon: '💎', price: 2500000, charm: 500000 },
  { id: 19, name: 'Galaxy Throne', icon: '👑', price: 5000000, charm: 1000000 },
  { id: 20, name: 'Eternal Flame', icon: '🔱', price: 10000000, charm: 2000000 },
];

export const SHOP_ITEMS: InventoryItem[] = [
  { id: 'f1', name: 'Imperial Gold Frame', type: 'frame', price: 250000, image: 'ring-4 ring-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.6)]' },
  { id: 'f2', name: 'Phoenix Rebirth', type: 'frame', price: 500000, image: 'ring-4 ring-orange-600 shadow-[0_0_25px_rgba(234,88,12,0.8)] animate-pulse' },
  { id: 'f3', name: 'Cyber Glitch', type: 'frame', price: 150000, image: 'ring-4 ring-cyan-400 border-2 border-pink-500' },
  { id: 'f4', name: 'Rose Petal Aura', type: 'frame', price: 80000, image: 'ring-4 ring-pink-400' },
  { id: 'b1', name: 'Neon Text Bubble', type: 'bubble', price: 50000, image: 'bg-cyan-500/20 border-cyan-400' },
  { id: 'b2', name: 'Royal Scroll', type: 'bubble', price: 75000, image: 'bg-yellow-500/20 border-yellow-500' },
  { id: 't1', name: 'Cyberpunk District', type: 'theme', price: 1000000, image: 'bg-[#1a1a2e]' },
  { id: 't2', name: 'Sakura Garden', type: 'theme', price: 500000, image: 'bg-[#2d1b2e]' }
];

export const CHARM_RANKS = [
  { label: 'Star 1', min: 1000, icon: '⭐' },
  { label: 'Star 3', min: 13000, icon: '⭐ ⭐ ⭐' },
  { label: 'Diamond 1', min: 30000, icon: '💎' },
  { label: 'Diamond 5', min: 80000, icon: '💎 💎 💎 💎 💎' },
  { label: 'Diamond 6', min: 160000, icon: '💎 💎 💎 💎 💎 💎' },
  { label: 'Crown', min: 300000, icon: '👑' },
];

export const MAX_FAM_ACTIVITY = 1000000000;

export const FAMILY_REWARDS: Record<ChestType, { xpRequired: number, label: string }> = {
  bronze: { xpRequired: 5000000, label: 'Bronze' },
  silver: { xpRequired: 25000000, label: 'Silver' },
  gold: { xpRequired: 100000000, label: 'Gold' },
};
