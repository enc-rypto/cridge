
import React from 'react';
import { NAV_ITEMS, MOCK_USER } from '../constants';
import { Bell, Search } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onProfileClick: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onProfileClick }) => {
  return (
    <div className="flex flex-col h-full bg-[#050507] text-zinc-100 overflow-hidden font-sans selection:bg-violet-500/30">
      {/* M3 Style Top App Bar */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-600 rounded-2xl flex items-center justify-center font-black text-white italic shadow-lg shadow-violet-600/30 rotate-3">C</div>
          <h1 className="text-2xl font-black tracking-tight uppercase italic gradient-text">Cridge</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-3 hover:bg-white/5 rounded-full transition-all active:scale-90">
            <Search size={22} className="text-zinc-400" />
          </button>
          <button className="p-3 hover:bg-white/5 rounded-full transition-all relative active:scale-90">
            <Bell size={22} className="text-zinc-400" />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-[#050507]"></span>
          </button>
          <button 
            onClick={onProfileClick}
            className="ml-2 w-10 h-10 rounded-full border-2 border-violet-500/20 p-0.5 overflow-hidden active:scale-90 transition-transform shadow-inner bg-zinc-900"
          >
            <img src={MOCK_USER.avatar} alt="Me" className="w-full h-full rounded-full object-cover" />
          </button>
        </div>
      </header>

      {/* Scaffold Body */}
      <main className="flex-1 overflow-y-auto hide-scrollbar relative">
        {children}
      </main>

      {/* Material 3 Navigation Bar (Flutter Style) */}
      <nav className="h-[88px] bg-[#0f0f13] border-t border-white/5 px-4 flex items-center justify-around shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-[60]">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="group flex flex-col items-center justify-center gap-1 w-16"
            >
              <div className={`
                relative px-5 py-1 rounded-full transition-all duration-300
                ${isActive ? 'bg-violet-600/20 text-violet-400' : 'text-zinc-500 hover:text-zinc-300'}
              `}>
                {isActive && (
                  <div className="absolute inset-0 bg-violet-600/10 rounded-full blur-md animate-pulse"></div>
                )}
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-0.5' : 'scale-100'}`}>
                  {item.icon}
                </div>
              </div>
              <span className={`
                text-[10px] font-bold tracking-wide transition-colors duration-300
                ${isActive ? 'text-zinc-100' : 'text-zinc-500'}
              `}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
