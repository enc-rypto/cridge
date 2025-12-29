
import React, { useState } from 'react';
import { MOCK_COMMUNITIES } from '../constants';
import { Community } from '../types';
import { Search, Plus, ChevronRight, UserPlus, Check } from 'lucide-react';

interface CommunitiesProps {
  onSelectGuild: (guild: Community) => void;
}

export const Communities: React.FC<CommunitiesProps> = ({ onSelectGuild }) => {
  const [search, setSearch] = useState('');
  const [joinedGuilds, setJoinedGuilds] = useState<Set<string>>(new Set(['c1']));
  
  const filtered = MOCK_COMMUNITIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleJoin = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newSet = new Set(joinedGuilds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setJoinedGuilds(newSet);
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      <div className="space-y-1">
        <h2 className="text-4xl font-black italic tracking-tighter gradient-text uppercase">GUILDS</h2>
        <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest leading-none">Find your tribe. Start the wave.</p>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-violet-500 transition-colors" size={20} />
        <input 
          type="text"
          placeholder="Search vibes..."
          className="w-full glass rounded-[28px] py-5 pl-12 pr-4 text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all placeholder:text-zinc-700 font-bold tracking-tight shadow-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5">
        {filtered.map(guild => {
          const isJoined = joinedGuilds.has(guild.id);
          return (
            <div 
              key={guild.id} 
              onClick={() => onSelectGuild(guild)}
              className="glass p-6 rounded-[44px] flex items-center gap-5 group hover:border-violet-500/50 transition-all cursor-pointer relative overflow-hidden active:scale-[0.97]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 blur-3xl -mr-10 -mt-10 group-hover:bg-violet-600/20 transition-all"></div>
              
              <div className="w-16 h-16 bg-zinc-900 rounded-[22px] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-xl border border-white/5">
                {guild.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-black mb-0.5 tracking-tighter text-zinc-100 uppercase">{guild.name}</h3>
                <p className="text-zinc-500 text-xs font-semibold line-clamp-1 opacity-80">{guild.description}</p>
                
                <div className="flex items-center gap-4 mt-4">
                  <button 
                    onClick={(e) => toggleJoin(e, guild.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      isJoined 
                        ? 'bg-zinc-800 text-zinc-400 border border-zinc-700' 
                        : 'bg-white text-black hover:bg-violet-400'
                    }`}
                  >
                    {isJoined ? <Check size={14} /> : <UserPlus size={14} />}
                    {isJoined ? 'Member' : 'Join'}
                  </button>
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-tighter">
                    {guild.memberCount + (isJoined && guild.id !== 'c1' ? 1 : 0)} Peers
                  </span>
                </div>
              </div>

              <div className="text-zinc-600">
                <ChevronRight size={22} />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-12 text-center glass rounded-[44px] border-dashed border-2 border-zinc-800 bg-transparent flex flex-col items-center">
        <div className="w-16 h-16 bg-zinc-900 rounded-[24px] flex items-center justify-center text-zinc-700 mb-5 border border-zinc-800 shadow-inner">
            <Plus size={32} strokeWidth={3} />
        </div>
        <p className="text-zinc-500 text-[10px] font-black mb-5 uppercase tracking-[0.25em]">Manifest a new guild?</p>
        <button className="px-10 py-4 bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 text-zinc-300 rounded-2xl font-black text-xs transition-all border border-zinc-700 uppercase tracking-[0.2em] active:scale-95 shadow-xl">
          Launch Guild
        </button>
      </div>
    </div>
  );
};
