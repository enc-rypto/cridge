
import React, { useState } from 'react';
import { Search, Sparkles, ExternalLink, BrainCircuit, Loader2 } from 'lucide-react';
import { performDeepResearch, ResearchResult } from '../services/geminiService';

export const DeepResearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    const data = await performDeepResearch(query);
    setResult(data);
    setIsSearching(false);
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      <div className="space-y-1">
        <h2 className="text-4xl font-black italic tracking-tighter gradient-text uppercase">BRAIN SYNC</h2>
        <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest leading-none">Deep research powered by Gemini Pro</p>
      </div>

      <div className="glass p-6 rounded-[40px] border-violet-500/20 space-y-4">
        <div className="relative group">
          <BrainCircuit className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500" size={20} />
          <input 
            type="text"
            placeholder="Search complex topics (e.g. Future of Solarpunk)..."
            className="w-full bg-white/5 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:ring-1 focus:ring-violet-500 transition-all font-semibold"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <button 
          onClick={handleSearch}
          disabled={isSearching || !query}
          className="w-full py-4 bg-violet-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all disabled:opacity-50"
        >
          {isSearching ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
          {isSearching ? 'Synchronizing Knowledge...' : 'Initiate Deep Sync'}
        </button>
      </div>

      {result && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="glass p-8 rounded-[48px] border-white/5 shadow-2xl bg-gradient-to-br from-white/[0.02] to-transparent">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-1.5 h-6 bg-violet-500 rounded-full"></div>
               <h3 className="text-lg font-black uppercase italic text-zinc-100">Research Summary</h3>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-zinc-300 leading-relaxed font-medium whitespace-pre-wrap">
                {result.text}
              </p>
            </div>
          </div>

          {result.sources.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-4">Grounding Sources</h4>
              <div className="flex flex-col gap-2">
                {result.sources.map((source, i) => (
                  <a 
                    key={i} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 glass rounded-2xl border-white/5 hover:bg-white/5 active:scale-[0.98] transition-all group"
                  >
                    <span className="text-xs font-bold text-zinc-200 truncate pr-4">{source.title}</span>
                    <ExternalLink size={14} className="text-zinc-600 group-hover:text-violet-400" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
