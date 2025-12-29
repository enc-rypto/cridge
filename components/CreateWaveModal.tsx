
import React, { useState } from 'react';
import { X, Sparkles, Send, Image as ImageIcon } from 'lucide-react';
import { generateCatchyCaption } from '../services/geminiService';

interface CreateWaveModalProps {
  onClose: () => void;
}

export const CreateWaveModal: React.FC<CreateWaveModalProps> = ({ onClose }) => {
  const [content, setContent] = useState('');
  const [isRefining, setIsRefining] = useState(false);

  const handleRefine = async () => {
    if (!content.trim()) return;
    setIsRefining(true);
    const refined = await generateCatchyCaption(content);
    setContent(refined || content);
    setIsRefining(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-10 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-[430px] glass rounded-[48px] p-8 border border-white/10 shadow-2xl animate-in slide-in-from-bottom-full duration-500">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black italic tracking-tighter gradient-text uppercase">NEW WAVE</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <textarea
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's the community energy today?"
            className="w-full h-40 bg-transparent border-none focus:ring-0 text-xl font-bold p-0 resize-none placeholder:text-zinc-800"
          />

          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefine}
              disabled={isRefining || !content}
              className="flex-1 flex items-center justify-center gap-2 py-4 glass rounded-3xl text-xs font-black uppercase tracking-widest text-violet-400 border-violet-500/20 active:scale-95 transition-all disabled:opacity-30"
            >
              <Sparkles size={16} className={isRefining ? 'animate-spin' : ''} />
              {isRefining ? 'Vibing...' : 'Add AI Sauce'}
            </button>
            <button className="p-4 glass rounded-3xl text-zinc-500 active:scale-95 transition-all">
              <ImageIcon size={20} />
            </button>
          </div>

          <button 
            onClick={() => {
              if (content) onClose();
            }}
            disabled={!content}
            className="w-full py-5 bg-white text-black rounded-[28px] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl disabled:opacity-50"
          >
            Launch Wave
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
