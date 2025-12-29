
import React, { useState } from 'react';
import { Sparkles, Github, Chrome, MessageSquare, Zap, ArrowRight, Loader2 } from 'lucide-react';
import { persistSessionInCloudSQL } from '../services/storageService';

interface LoginProps {
  onLogin: (sessionKey: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState('');

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    setStatusText(`Connecting to ${provider} Cloud...`);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatusText('Generating SQL Session Key...');
    const sessionKey = `sk_${Math.random().toString(36).substr(2, 9)}`;
    await persistSessionInCloudSQL(email || 'social_peer', sessionKey);
    
    setStatusText('Syncing Neural Vibe...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onLogin(sessionKey);
    setIsLoading(false);
  };

  const handleEmailAuth = async () => {
    if (!email) return;
    setIsLoading(true);
    setStatusText('Authenticating Vibe ID...');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatusText('Updating Cloud SQL Registry...');
    const sessionKey = `sk_${Math.random().toString(36).substr(2, 9)}`;
    await persistSessionInCloudSQL(email, sessionKey);
    
    onLogin(sessionKey);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#050507] flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-violet-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-pink-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>

      {isLoading && (
        <div className="absolute inset-0 z-[210] flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="relative">
              <Loader2 size={64} className="text-violet-500 animate-spin" strokeWidth={3} />
              <div className="absolute inset-0 blur-xl bg-violet-500/30 animate-pulse"></div>
           </div>
           <p className="mt-8 text-white font-black italic uppercase tracking-widest text-sm animate-pulse">
             {statusText}
           </p>
        </div>
      )}

      <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center space-y-12">
        <div className="flex flex-col items-center space-y-6 animate-in fade-in zoom-in duration-700">
          <div className="w-24 h-24 bg-gradient-to-br from-violet-600 to-pink-500 rounded-[32px] flex items-center justify-center font-black text-5xl text-white italic shadow-[0_0_50px_rgba(139,92,246,0.4)] animate-bounce-subtle">
            C
          </div>
          <div className="text-center">
            <h1 className="text-6xl font-black italic tracking-tighter gradient-text uppercase leading-none">
              Cridge
            </h1>
            <p className="text-zinc-500 font-bold text-xs uppercase tracking-[0.3em] mt-3 animate-pulse-subtle">
              Bridge the Gap
            </p>
          </div>
        </div>

        <div className="w-full space-y-6 animate-in slide-in-from-bottom-8 duration-700 delay-200">
          <div className="glass p-1.5 rounded-[32px] flex gap-1">
            <button 
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-3.5 rounded-[26px] text-xs font-black uppercase tracking-widest transition-all ${!isSignUp ? 'bg-white text-black shadow-lg' : 'text-zinc-500'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-3.5 rounded-[26px] text-xs font-black uppercase tracking-widest transition-all ${isSignUp ? 'bg-white text-black shadow-lg' : 'text-zinc-500'}`}
            >
              Join Up
            </button>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input 
                type="email" 
                placeholder="vibe-id@cridge.xyz"
                className="w-full glass rounded-[24px] py-5 px-6 text-white outline-none focus:ring-2 focus:ring-violet-500 transition-all placeholder:text-zinc-800 font-bold tracking-tight"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <button 
              onClick={handleEmailAuth}
              disabled={!email}
              className="w-full py-5 bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-[24px] font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_rgba(139,92,246,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
            >
              {isSignUp ? 'Launch My Vibe' : 'Enter the Wave'}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-zinc-800/50"></div>
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Or Sync With</span>
              <div className="h-[1px] flex-1 bg-zinc-800/50"></div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => handleSocialLogin('Google')} className="glass p-4 rounded-2xl flex items-center justify-center hover:bg-white/5 active:scale-90 transition-all border-white/5 group">
                <Chrome size={22} className="text-zinc-400 group-hover:text-white transition-colors" />
              </button>
              <button onClick={() => handleSocialLogin('GitHub')} className="glass p-4 rounded-2xl flex items-center justify-center hover:bg-white/5 active:scale-90 transition-all border-white/5 group">
                <Github size={22} className="text-zinc-400 group-hover:text-white transition-colors" />
              </button>
              <button onClick={() => handleSocialLogin('Discord')} className="glass p-4 rounded-2xl flex items-center justify-center hover:bg-white/5 active:scale-90 transition-all border-white/5 group">
                <MessageSquare size={22} className="text-zinc-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col items-center gap-2 animate-in fade-in duration-1000 delay-500">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">8,421 Peers Vibing Now</span>
           </div>
        </div>
      </div>
    </div>
  );
};
