
import React from 'react';
import { Users, Play, BrainCircuit, LayoutGrid, Terminal, MessageSquare } from 'lucide-react';
import { Community, User, ShortContent } from './types';

export const NAV_ITEMS = [
  { id: 'feed', label: 'Feed', icon: <LayoutGrid size={24} /> },
  { id: 'explore', label: 'Sync', icon: <BrainCircuit size={24} /> },
  { id: 'messages', label: 'Chat', icon: <MessageSquare size={24} /> },
  { id: 'shorts', label: 'Sparks', icon: <Play size={24} /> },
  { id: 'communities', label: 'Guilds', icon: <Users size={24} /> },
  { id: 'system', label: 'Node', icon: <Terminal size={24} /> },
];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex "Aura"',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  bio: 'Building dreams & breaking prod. ✨',
  skills: ['Creative Coding', 'Art', 'Chill Vibes']
};

export const MOCK_SHORTS: ShortContent[] = [
  { id: 's1', userId: 'u2', communityId: 'c1', title: 'Solarpunk Morning 🌿', type: 'image', url: 'https://picsum.photos/seed/nature/400/700', likes: 1200, comments: 45, timestamp: '2h' },
  { id: 's2', userId: 'u3', communityId: 'c2', title: 'POV: You fixed the CSS 🤡', type: 'image', url: 'https://picsum.photos/seed/meme/400/700', likes: 850, comments: 120, timestamp: '5h' },
  { id: 's3', userId: 'u4', communityId: 'c3', title: 'Retro Hardware Haul! 📟', type: 'image', url: 'https://picsum.photos/seed/tech/400/700', likes: 2100, comments: 89, timestamp: '12h' },
];

export const MOCK_COMMUNITIES: Community[] = [
  { id: 'c1', name: 'Digital Gardeners', description: 'Growing creative code and solarpunk dreams.', icon: '🌱', memberCount: 2100, tags: ['Eco', 'Code', 'Art'] },
  { id: 'c2', name: 'Meme Logic Lab', description: 'Turning internet culture into functional software.', icon: '🤡', memberCount: 4500, tags: ['Culture', 'Python', 'Viral'] },
  { id: 'c3', name: 'Neon Hardware', description: 'Retro-future electronics and wearable tech.', icon: '📟', memberCount: 890, tags: ['Physical', 'IoT', 'Fashion'] },
];
