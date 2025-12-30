
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
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="w-full max-w-[430px] bg-[#1c1b1f] rounded-t-[32px] p-6 pb-12 shadow-2xl animate-in slide-in-from-bottom-full duration-500"
      >
        {/* M3 Modal Handle */}
        <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mb-6"></div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-zinc-100 uppercase tracking-tight">Create New Wave</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500">
            <X size={22} />
          </button>
        </div>

        <div className="space-y-6">
          <textarea
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's your spark today?"
            className="w-full h-48 bg-zinc-900 rounded-[24px] p-6 text-xl font-medium text-zinc-100 placeholder:text-zinc-700 focus:ring-2 focus:ring-violet-500 outline-none transition-all resize-none border border-white/5"
          />

          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefine}
              disabled={isRefining || !content}
              className="flex-1 flex items-center justify-center gap-3 py-4 bg-violet-600/10 rounded-2xl text-xs font-black uppercase tracking-widest text-violet-400 border border-violet-500/20 active:scale-95 transition-all disabled:opacity-30"
            >
              <Sparkles size={18} className={isRefining ? 'animate-spin' : ''} />
              {isRefining ? 'Syncing...' : 'Polish with AI'}
            </button>
            <button className="p-4 bg-zinc-900 rounded-2xl text-zinc-500 border border-white/5 active:scale-95 transition-all hover:text-zinc-300">
              <ImageIcon size={22} />
            </button>
          </div>

          <button 
            onClick={() => {
              if (content) onClose();
            }}
            disabled={!content}
            className="w-full py-5 bg-violet-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 active:scale-95 transition-all shadow-[0_8px_24px_rgba(139,92,246,0.4)] disabled:opacity-50"
          >
            Broadcast Wave
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
