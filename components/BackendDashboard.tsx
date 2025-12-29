
import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Server, Zap, Globe, ShieldCheck, Loader2 } from 'lucide-react';
import { getBackendInsight } from '../services/geminiService';

export const BackendDashboard: React.FC = () => {
  const [insight, setInsight] = useState('Initializing Cluster Analysis...');
  const [load, setLoad] = useState(42);
  const [nodes, setNodes] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refreshInsight();
    const interval = setInterval(() => {
      setLoad(prev => Math.min(99, Math.max(10, prev + (Math.random() * 10 - 5))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const refreshInsight = async () => {
    setIsLoading(true);
    const text = await getBackendInsight(8421);
    setInsight(text);
    setIsLoading(false);
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      <div className="space-y-1">
        <h2 className="text-4xl font-black italic tracking-tighter gradient-text uppercase">NODE COMMAND</h2>
        <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest leading-none">GKE Cluster Monitor • Project: CRIDGE-VIBE-01</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass p-5 rounded-[32px] border-violet-500/20 flex flex-col items-center justify-center text-center space-y-2">
          <Cpu size={24} className="text-violet-400 mb-1" />
          <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Neural Load</span>
          <span className="text-3xl font-black italic text-white leading-none">{Math.round(load)}%</span>
        </div>
        <div className="glass p-5 rounded-[32px] border-emerald-500/20 flex flex-col items-center justify-center text-center space-y-2">
          <Server size={24} className="text-emerald-400 mb-1" />
          <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">GKE Pods</span>
          <span className="text-3xl font-black italic text-white leading-none">{nodes + (load > 80 ? 2 : 0)}</span>
        </div>
      </div>

      <div className="glass p-6 rounded-[40px] border-white/5 bg-black/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Activity size={120} strokeWidth={1} />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Zap size={14} className="text-yellow-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">AI Cluster Log</span>
          {isLoading && <Loader2 size={12} className="animate-spin text-zinc-600 ml-auto" />}
        </div>
        <p className="text-sm font-mono text-zinc-300 leading-relaxed border-l-2 border-violet-500 pl-4 py-1 italic">
          {insight}
        </p>
        <button 
          onClick={refreshInsight}
          className="mt-6 text-[10px] font-black uppercase text-violet-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <Activity size={12} /> Sync Infrastructure
        </button>
      </div>

      <section className="space-y-4 pt-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-2">Regional Availability</h3>
        <div className="space-y-3">
          {[
            { region: 'us-central1 (Iowa)', status: 'Optimal', ping: '12ms' },
            { region: 'europe-west1 (Belgium)', status: 'Vibing', ping: '84ms' },
            { region: 'asia-east1 (Taiwan)', status: 'Scalable', ping: '112ms' },
          ].map(r => (
            <div key={r.region} className="glass p-4 rounded-2xl flex items-center justify-between border-white/5">
              <div className="flex items-center gap-3">
                <Globe size={16} className="text-zinc-500" />
                <span className="text-xs font-bold text-zinc-200">{r.region}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">{r.status}</span>
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-tighter">{r.ping}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="p-8 text-center glass rounded-[40px] border-white/5 bg-gradient-to-b from-white/5 to-transparent">
        <ShieldCheck size={40} className="text-violet-500 mx-auto mb-4" />
        <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Binary Security Protocol Active</p>
        <p className="text-[10px] text-zinc-600 font-bold px-6 leading-loose">
          Auto-moderation bots scaling horizontally. Neural firewalls intercepting bad vibes. 
          The backend is locked and loaded for 1M+ concurrent peers.
        </p>
      </div>
    </div>
  );
};
