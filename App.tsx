
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Feed } from './components/Feed';
import { Communities } from './components/Communities';
import { ShortsFeed } from './components/ShortsFeed';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <Feed />;
      case 'shorts':
        return <ShortsFeed />;
      case 'communities':
        return <Communities />;
      case 'explore':
        return (
          <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-4xl font-black italic tracking-tighter gradient-text uppercase">EXPLORE</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Generative Art', color: 'from-pink-500 to-rose-500', emoji: '🎨' },
                { label: 'Solarpunk', color: 'from-blue-500 to-cyan-500', emoji: '🌿' },
                { label: 'Urban Tech', color: 'from-emerald-500 to-teal-500', emoji: '🏙️' },
                { label: 'Deep Vibes', color: 'from-violet-500 to-purple-500', emoji: '🪐' },
              ].map(tag => (
                <div key={tag.label} className={`h-44 rounded-[32px] p-6 bg-gradient-to-br ${tag.color} relative overflow-hidden group active:scale-95 transition-all shadow-lg shadow-black/20`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <span className="text-3xl">{tag.emoji}</span>
                    <span className="font-black text-xl italic uppercase tracking-tighter leading-tight">{tag.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <Feed />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="h-full">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
