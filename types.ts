export type AppTab = 'home' | 'party' | 'family' | 'rank' | 'shop' | 'profile' | 'admin' | 'games';
export type FamilyRole = 'Owner' | 'Deputy' | 'Admin' | 'Member';
export type RankingType = 'charm' | 'family' | 'vip';
export type TimeFilter = 'daily' | 'weekly' | 'total';
export type ChestType = 'bronze' | 'silver' | 'gold';

export interface SocialLink {
  platform: 'WhatsApp' | 'Instagram' | 'Facebook' | 'Snapchat';
  url: string;
}

export interface User {
  uid: string;
  username: string;
  avatar: string;
  coins: number;
  totalCharm: number;
  vipLevel: number;
  vipPoints: number;
  inventory: string[];
  activeFrame: string;
  activeBubble: string;
  friends: string[];
  bio: string;
  socials: SocialLink[];
  giftVault: { giftId: number; count: number; sender: string }[];
  isLoggedIn?: boolean;
}

export interface FamilyMember {
  uid: string;
  username: string;
  role: FamilyRole;
  contribution: number;
}

export interface JoinRequest {
  uid: string;
  username: string;
  avatar: string;
  timestamp: number;
}

export interface Family {
  id: string;
  uid: string;
  name: string;
  tag: string;
  level: number;
  activity: number;
  members: FamilyMember[];
  ownerUid: string;
  joinRequests: JoinRequest[];
  chat: ChatMessage[];
}

export interface RoomConfig {
  uid: string;
  title: string;
  theme: string;
  ownerUid: string;
  admins: string[];
}

export interface ChatMessage {
  id: string;
  senderUid: string;
  senderName: string;
  text: string;
  timestamp: number;
}

export interface Gift {
  id: number;
  name: string;
  icon: string;
  price: number;
  charm: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'frame' | 'bubble' | 'theme';
  price: number;
  image: string;
}

export interface Reward {
  item: string;
  jackpot?: string;
  coins?: number;
}

export interface Seat {
  id: number;
  userId?: string;
  username?: string;
  avatar?: string;
  isMuted?: boolean;
}

export interface Game {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}