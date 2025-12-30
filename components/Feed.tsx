
import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { MOCK_USER, MOCK_COMMUNITIES } from '../constants';
import { Heart, MessageCircle, Sparkles, Image as ImageIcon, Plus, Share2, Zap, Send, RefreshCw } from 'lucide-react';
import { generateCatchyCaption, getDailySparks, getCommunityVibeDescription } from '../services/geminiService';

interface FeedProps {
  onStartWave: () => void;
}

export const Feed: React.FC<FeedProps> = ({ onStartWave }) => {
  const [newPost, setNewPost] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [isCheckingVibe, setIsCheckingVibe] = useState(false);
  const [vibeHook, setVibeHook] = useState<string>('');
  const [sparks, setSparks] = useState<any[]>([]);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      userId: 'u2',
      communityId: 'c1',
      content: "Neon botanics hitting different tonight. 🌿✨ Finally synced the RGB grow lights with my Spotify. Absolute mood.",
      timestamp: '2h ago',
      likes: 842,
      comments: 56,
      media: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: '2',
      userId: 'u3',
      communityId: 'c2',
      content: "POV: You spend 4 hours debugging only to realize you missed a semicolon in a CSS variable. 🤡",
      timestamp: '4h ago',
      likes: 128,
      comments: 89
    }
  ]);

  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    getDailySparks(MOCK_USER.skills).then(setSparks);
    handleVibeCheck();
  }, []);

  const handleVibeCheck = async () => {
    setIsCheckingVibe(true);
    const vibe = await getCommunityVibeDescription("Cridge Global");
    setVibeHook(vibe);
    setIsCheckingVibe(false);
  };

  const handlePost = async () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      userId: MOCK_USER.id,
      content: newPost,
      timestamp: 'just now',
      likes: 0,
      comments: 0
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const toggleLike = (postId: string) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  return (
    <div className="px-4 pb-24 pt-2 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* Vibe Summary Card */}
      <section className="bg-violet-600/10 border border-violet-500/20 rounded-[28px] p-6 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-4 -translate-y-4">
          <Zap size={120} strokeWidth={3} />
        </div>
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-violet-400 rounded-full"></div>
            <span className="text-[11px] font-black uppercase tracking-widest text-violet-400">Current Energy</span>
          </div>
          <button 
            onClick={handleVibeCheck}
            disabled={isCheckingVibe}
            className="p-2 hover:bg-white/5 rounded-full transition-all active:scale-90 disabled:opacity-50"
            title="Refresh vibe"
          >
            <RefreshCw size={14} className={`text-violet-400 ${isCheckingVibe ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <p className="text-xl font-black italic text-white leading-tight pr-8 relative z-10">
          {isCheckingVibe ? "Syncing..." : `"${vibeHook}"`}
        </p>
      </section>

      {/* Sparks Horizontal List */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Suggested Sparks</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar -mx-4 px-4">
          {sparks.map((spark, i) => (
            <div 
              key={i} 
              onClick={() => setNewPost(spark.description)}
              className="shrink-0 w-32 h-40 rounded-[24px] p-4 bg-zinc-900 border border-white/5 flex flex-col justify-between active:scale-95 transition-all cursor-pointer hover:border-violet-500/30"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">{spark.emoji}</div>
              <p className="text-[10px] font-black uppercase leading-tight text-zinc-300">{spark.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Post Input (Flutter Style Modal Bottom Sheet Feel) */}
      <section className="bg-zinc-900/50 rounded-[32px] p-5 border border-white/5 flex flex-col gap-4">
        <div className="flex gap-4 items-start">
          <img src={MOCK_USER.avatar} className="w-10 h-10 rounded-full border border-white/10" alt="me" />
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share the wave..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-zinc-100 placeholder:text-zinc-700 font-medium resize-none min-h-[60px] p-0"
          />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-xl bg-white/5 text-zinc-400 hover:text-white transition-colors">
              <ImageIcon size={20} />
            </button>
            <button 
              onClick={handlePost}
              disabled={!newPost.trim()}
              className="p-2.5 rounded-xl bg-violet-600 text-white disabled:opacity-30 disabled:grayscale transition-all active:scale-90"
            >
              <Send size={20} />
            </button>
          </div>
          <button 
            onClick={() => generateCatchyCaption(newPost).then(setNewPost)}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600/10 text-violet-400 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
          >
            <Sparkles size={14} /> Add Sauce
          </button>
        </div>
      </section>

      {/* Post List */}
      <section className="space-y-4">
        {posts.map((post) => {
          const isLiked = likedPosts.has(post.id);
          return (
            <div key={post.id} className="bg-zinc-900 border border-white/5 rounded-[28px] overflow-hidden transition-all hover:border-white/10">
              <div className="p-4 flex items-center gap-3">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userId}`} className="w-9 h-9 rounded-full bg-zinc-800" alt="u" />
                <div className="flex-1">
                  <h4 className="text-sm font-black text-zinc-100">@{post.userId === MOCK_USER.id ? 'me' : `peer_${post.userId}`}</h4>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">{post.timestamp}</p>
                </div>
              </div>
              
              <div className="px-5 pb-4">
                <p className="text-zinc-200 text-sm leading-relaxed">{post.content}</p>
              </div>

              {post.media && (
                <div className="px-2 pb-2">
                  <img src={post.media} className="w-full aspect-video object-cover rounded-[20px]" alt="media" />
                </div>
              )}

              <div className="px-6 py-4 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-8">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-2 transition-all ${isLiked ? 'text-pink-500 scale-110' : 'text-zinc-500'}`}
                  >
                    <Heart size={20} className={isLiked ? 'fill-pink-500' : ''} />
                    <span className="text-xs font-black">{post.likes + (isLiked ? 1 : 0)}</span>
                  </button>
                  <button className="flex items-center gap-2 text-zinc-500">
                    <MessageCircle size={20} />
                    <span className="text-xs font-black">{post.comments}</span>
                  </button>
                </div>
                <button className="text-zinc-500 hover:text-white transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* Flutter Style Floating Action Button (FAB) */}
      <button 
        onClick={onStartWave}
        className="fixed bottom-[108px] right-6 h-16 w-16 bg-violet-600 text-white rounded-[24px] flex items-center justify-center shadow-[0_12px_32px_rgba(139,92,246,0.5)] active:scale-90 active:shadow-inner transition-all z-50 group overflow-hidden"
      >
        <Plus size={32} className="group-hover:rotate-90 transition-transform duration-300" />
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </button>
    </div>
  );
};
