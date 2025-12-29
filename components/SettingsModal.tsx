
import React, { useState } from 'react';
import { X, Save, Sparkles, Hash } from 'lucide-react';
import { MOCK_USER } from '../constants';

interface SettingsModalProps {
  onClose: () => void;
  onSave: (updatedUser: any) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState(MOCK_USER.name);
  const [bio, setBio] = useState(MOCK_USER.bio);
  const [skills, setSkills] = useState(MOCK_USER.skills.join(', '));

  const handleSave = () => {
    onSave({
      ...MOCK_USER,
      name,
      bio,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center px-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-[400px] glass rounded-[56px] p-8 border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black italic tracking-tighter gradient-text uppercase">SETTINGS</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Profile Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full glass rounded-[24px] py-4 px-6 text-white outline-none focus:ring-2 focus:ring-violet-500 font-bold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4">Vibe Bio</label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full glass rounded-[24px] py-4 px-6 text-white outline-none focus:ring-2 focus:ring-violet-500 font-medium h-24 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-4 flex items-center gap-2">
              <Hash size={12} /> Interests (Comma separated)
            </label>
            <input 
              type="text" 
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Coding, Art, Futurism..."
              className="w-full glass rounded-[24px] py-4 px-6 text-white outline-none focus:ring-2 focus:ring-violet-500 font-bold"
            />
            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-tighter ml-4 mt-2">
              <Sparkles size={10} className="inline mr-1" /> This powers your Daily AI Sparks
            </p>
          </div>

          <button 
            onClick={handleSave}
            className="w-full py-5 bg-white text-black rounded-[28px] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl"
          >
            Update Identity
            <Save size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
