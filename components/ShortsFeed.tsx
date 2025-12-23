
import React from 'react';
import { MOCK_SHORTS, MOCK_USER, MOCK_COMMUNITIES } from '../constants';
import { Heart, MessageCircle, Share2, MoreVertical, Music, Sparkles } from 'lucide-react';

export const ShortsFeed: React.FC = () => {
  return (
    <div className="h-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar">
      {MOCK_SHORTS.map((short) => {
        const guild = MOCK_COMMUNITIES.find(c => c.id === short.communityId);
        return (
            <div key={short.id} className="relative w-full h-full snap-start overflow-hidden bg-black">
            <img src={short.url} className="absolute inset-0 w-full h-full object-cover opacity-90" alt={short.title} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/95"></div>
            
            {/* Metadata Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pb-32 space-y-5">
                <div className="flex items-center gap-3">
                <div className="relative">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${short.userId}`} className="w-14 h-14 rounded-2xl border-2 border-white shadow-2xl" alt="user" />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full p-1.5 border-2 border-black">
                        <Sparkles size={10} className="text-white" />
                    </div>
                </div>
                <div>
                    <h4 className="font-black text-white text-xl tracking-tighter uppercase">@{short.userId === MOCK_USER.id ? 'me' : `user_${short.userId}`}</h4>
                    <span className="text-xs font-black text-violet-400 uppercase tracking-widest">{guild?.name}</span>
                </div>
                </div>
                
                <p className="text-white text-lg font-bold leading-snug max-w-[90%] drop-shadow-xl">
                {short.title}
                </p>
                
                <div className="flex items-center gap-3 text-zinc-300 text-[10px] font-black uppercase tracking-widest bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-xl border border-white/10">
                  <Music size={14} className="animate-pulse" />
                  <span className="max-w-[150px] truncate">Cridge AI Mix - Vol.{short.id}</span>
                </div>
            </div>

            {/* Action Bar */}
            <div className="absolute right-4 bottom-40 flex flex-col gap-8 items-center z-20">
                <div className="flex flex-col items-center group">
                  <button className="p-4 bg-white/10 backdrop-blur-2xl rounded-3xl text-white active:scale-90 transition-all border border-white/20 hover:bg-pink-500 shadow-2xl">
                      <Heart size={30} fill="white" />
                  </button>
                  <span className="text-xs font-black text-white mt-2 drop-shadow-lg">{short.likes}</span>
                </div>
                <div className="flex flex-col items-center">
                  <button className="p-4 bg-white/10 backdrop-blur-2xl rounded-3xl text-white border border-white/20 active:scale-90 transition-all hover:bg-violet-500">
                      <MessageCircle size={30} fill="white" />
                  </button>
                  <span className="text-xs font-black text-white mt-2 drop-shadow-lg">{short.comments}</span>
                </div>
                <button className="p-4 bg-white/10 backdrop-blur-2xl rounded-3xl text-white border border-white/20">
                  <Share2 size={30} />
                </button>
                <button className="p-4 bg-white/10 backdrop-blur-2xl rounded-3xl text-white border border-white/20">
                  <MoreVertical size={30} />
                </button>
            </div>
            </div>
        );
      })}
    </div>
  );
};
