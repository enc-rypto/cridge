
import React, { useState, useEffect } from 'react';
import { Community, Post } from '../types';
import { ArrowLeft, Sparkles, Zap, Heart, MessageCircle } from 'lucide-react';
import { getCommunityVibeDescription } from '../services/geminiService';

interface GuildDetailProps {
  guild: Community;
  onBack: () => void;
}

export const GuildDetail: React.FC<GuildDetailProps> = ({ guild, onBack }) => {
  const [vibe, setVibe] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommunityVibeDescription(guild.name).then(res => {
      setVibe(res);
      setIsLoading(false);
    });
  }, [guild.name]);

  const MOCK_GUILD_POSTS: Post[] = [
    { id: 'gp1', userId: 'u2', content: `Current progress in ${guild.name} is looking insane! Just finished the prototype.`, timestamp: '1h ago', likes: 42, comments: 12 },
    { id: 'gp2', userId: 'u3', content: "Anyone else feeling the energy today? The wave is strong.", timestamp: '3h ago', likes: 89, comments: 5 }
  ];

  return (
    <div className="animate-in slide-in-from-right duration-300 pb-32">
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-pink-500/30 blur-3xl opacity-50"></div>
        <button 
          onClick={onBack}
          className="absolute top-8 left-6 p-3 glass rounded-2xl text-white z-10 active:scale-90 transition-transform"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="absolute bottom-6 left-6 flex items-end gap-5">
          <div className="w-24 h-24 bg-zinc-900 rounded-[32px] flex items-center justify-center text-5xl shadow-2xl border border-white/10">
            {guild.icon}
          </div>
          <div className="pb-1">
            <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">{guild.name}</h1>
            <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">{guild.memberCount} active peers</p>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-8 mt-4">
        <div className="glass p-6 rounded-[40px] border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-violet-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-violet-400">Guild Vibe Report</span>
          </div>
          {isLoading ? (
            <div className="h-10 w-full bg-white/5 animate-pulse rounded-xl"></div>
          ) : (
            <p className="text-xl font-bold italic text-white tracking-tight">"{vibe}"</p>
          )}
        </div>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black italic text-zinc-500 uppercase tracking-widest">GUILD WAVES</h3>
            <button className="p-2 glass rounded-xl text-zinc-500">
               <Zap size={16} />
            </button>
          </div>

          <div className="space-y-4">
            {MOCK_GUILD_POSTS.map(post => (
              <div key={post.id} className="glass p-6 rounded-[36px] border border-white/5 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-zinc-800"></div>
                  <span className="text-xs font-black text-zinc-400 uppercase tracking-tight">@{post.userId}</span>
                  <span className="text-[10px] text-zinc-600 font-bold ml-auto">{post.timestamp}</span>
                </div>
                <p className="text-zinc-200 font-medium leading-relaxed">{post.content}</p>
                <div className="flex gap-6 mt-4 pt-4 border-t border-white/5">
                  <button className="flex items-center gap-2 text-zinc-500">
                    <Heart size={18} />
                    <span className="text-[10px] font-black">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-zinc-500">
                    <MessageCircle size={18} />
                    <span className="text-[10px] font-black">{post.comments}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <button className="w-full py-5 bg-violet-600 text-white rounded-[28px] font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)] active:scale-95 transition-all">
          Sync with Guild
        </button>
      </div>
    </div>
  );
};
