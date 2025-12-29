
import React from 'react';
import { X, Settings, LogOut, Award, Zap, TrendingUp } from 'lucide-react';
import { MOCK_USER } from '../constants';

interface ProfileModalProps {
  onClose: () => void;
  onLogout: () => void;
  onSettingsClick: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, onLogout, onSettingsClick }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-[400px] glass rounded-[56px] p-8 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex justify-end">
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center text-center -mt-4 space-y-4">
          <div className="relative">
            <img src={MOCK_USER.avatar} className="w-28 h-28 rounded-[40px] border-4 border-zinc-900 shadow-2xl" alt="Me" />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-violet-600 rounded-2xl flex items-center justify-center border-4 border-black text-white shadow-lg">
              <Zap size={18} fill="white" />
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">{MOCK_USER.name}</h2>
            <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest mt-1">LVL 42 Community Builder</p>
          </div>

          <p className="text-zinc-400 font-medium px-4">{MOCK_USER.bio}</p>

          <div className="flex gap-2 flex-wrap justify-center py-2">
            {MOCK_USER.skills.map(skill => (
              <span key={skill} className="px-3 py-1.5 bg-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-500 border border-white/5">
                {skill}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 w-full gap-3 py-4">
            <div className="glass p-4 rounded-3xl border-white/5">
              <Award size={20} className="text-pink-500 mx-auto mb-2" />
              <p className="text-lg font-black text-white">1.2k</p>
              <p className="text-[8px] font-black uppercase text-zinc-500 tracking-tighter">Impact</p>
            </div>
            <div className="glass p-4 rounded-3xl border-white/5">
              <TrendingUp size={20} className="text-violet-400 mx-auto mb-2" />
              <p className="text-lg font-black text-white">84%</p>
              <p className="text-[8px] font-black uppercase text-zinc-500 tracking-tighter">Energy</p>
            </div>
            <div className="glass p-4 rounded-3xl border-white/5">
              <Zap size={20} className="text-yellow-400 mx-auto mb-2" />
              <p className="text-lg font-black text-white">212</p>
              <p className="text-[8px] font-black uppercase text-zinc-500 tracking-tighter">Waves</p>
            </div>
          </div>

          <div className="w-full space-y-2 pt-4">
            <button 
              onClick={onSettingsClick}
              className="w-full py-4 glass rounded-[24px] flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest text-zinc-300 hover:bg-white/5 active:scale-95 transition-all"
            >
              <Settings size={18} />
              Settings
            </button>
            <button 
              onClick={onLogout}
              className="w-full py-4 rounded-[24px] flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 active:scale-95 transition-all"
            >
              <LogOut size={18} />
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
