
import React from 'react';
import { NAV_ITEMS, MOCK_USER } from '../constants';
import { Bell } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col h-full bg-[#050507] overflow-hidden">
      {/* App Header */}
      <header className="glass px-6 pt-6 pb-4 flex items-center justify-between border-b border-white/5 z-50">
        <div className="flex items-center gap-2" onClick={() => setActiveTab('feed')}>
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl flex items-center justify-center font-black text-white italic shadow-lg shadow-violet-600/20">C</div>
          <span className="font-extrabold text-2xl tracking-tighter gradient-text">Cridge</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 hover:bg-white/5 rounded-2xl transition-colors relative bg-white/5 border border-white/5">
            <Bell size={20} className="text-zinc-300" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-pink-500 rounded-full border-2 border-[#050507]"></span>
          </button>
          <div className="w-10 h-10 rounded-2xl border border-white/10 p-0.5 overflow-hidden">
            <img src={MOCK_USER.avatar} alt="Me" className="w-full h-full rounded-[14px] object-cover" />
          </div>
        </div>
      </header>

      {/* Main Content Scroll Area */}
      <main className="flex-1 overflow-y-auto hide-scrollbar relative bg-[#050507]">
        {children}
      </main>

      {/* Bottom Floating Nav */}
      <div className="px-4 pb-6 pt-2 bg-gradient-to-t from-[#050507] to-transparent pointer-events-none">
        <nav className="glass mx-auto rounded-[32px] px-6 py-3 flex items-center justify-around shadow-2xl border border-white/10 pointer-events-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative py-1 ${
                  isActive ? 'text-white' : 'text-zinc-500'
                }`}
              >
                <div className={`${isActive ? 'text-violet-400 scale-110' : 'scale-100'} transition-transform duration-300`}>
                  {item.icon}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                  {item.label}
                </span>
                {isActive && <div className="absolute -bottom-1 w-1 h-1 bg-violet-400 rounded-full shadow-[0_0_8px_#8b5cf6]"></div>}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
