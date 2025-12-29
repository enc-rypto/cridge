
import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { MOCK_USER, MOCK_COMMUNITIES } from '../constants';
import { Heart, MessageCircle, Sparkles, Image as ImageIcon, Plus, Share2, Zap } from 'lucide-react';
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

  const handleRefine = async () => {
    if (!newPost.trim()) return;
    setIsRefining(true);
    const refined = await generateCatchyCaption(newPost);
    setNewPost(refined || newPost);
    setIsRefining(false);
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
    <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      
      {/* AI Vibe Hook */}
      <section className="relative overflow-hidden glass rounded-[32px] p-6 border-violet-500/30 bg-gradient-to-br from-violet-600/10 to-pink-500/10 border shadow-lg shadow-violet-500/5">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">Vibe Check</span>
        </div>
        <div className="min-h-[60px] flex flex-col justify-center">
          {isCheckingVibe ? (
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-200"></div>
            </div>
          ) : (
            <p className="text-lg font-bold italic leading-tight text-white tracking-tight">
              "{vibeHook}"
            </p>
          )}
        </div>
        <button 
          onClick={handleVibeCheck}
          className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
        >
          <Sparkles size={12} />
          Sync Vibe
        </button>
      </section>

      {/* Daily Sparks */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-sm font-black italic tracking-tight text-zinc-400 uppercase">CONTENT SPARKS</h3>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse"></div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar -mx-4 px-4">
          <button 
            onClick={onStartWave}
            className="shrink-0 w-36 h-48 rounded-[32px] glass border-dashed border-2 border-zinc-800 flex flex-col items-center justify-center gap-3 active:scale-95 transition-all"
          >
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-500">
              <Plus size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter text-zinc-600">Start Wave</span>
          </button>
          {sparks.map((spark, i) => (
            <div 
              key={i} 
              onClick={() => {
                setNewPost(spark.description);
                // Optional: scroll to the post input
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="shrink-0 w-36 h-48 rounded-[32px] p-5 bg-gradient-to-br from-violet-600/20 to-pink-500/20 border border-white/10 flex flex-col justify-between group shadow-xl active:scale-95 transition-all cursor-pointer"
            >
              <span className="text-3xl drop-shadow-lg">{spark.emoji}</span>
              <p className="text-[11px] font-extrabold leading-snug text-white uppercase tracking-tight">{spark.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Share Progress Card */}
      <section id="post-input" className="glass p-5 rounded-[40px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent">
        <div className="flex gap-4">
          <img src={MOCK_USER.avatar} className="w-12 h-12 rounded-2xl border border-zinc-800 shadow-xl" alt="Me" />
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's the wave?"
            className="flex-1 bg-transparent border-none focus:ring-0 text-base font-semibold resize-none placeholder-zinc-700 min-h-[50px] pt-3"
          />
        </div>
        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-zinc-400 transition-colors">
                    <ImageIcon size={20} />
                </button>
                <button 
                    onClick={handleRefine}
                    disabled={isRefining || !newPost}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-600/10 text-violet-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-600/20 transition-all active:scale-95 disabled:opacity-30"
                >
                    <Sparkles size={14} className={isRefining ? 'animate-spin' : ''} />
                    {isRefining ? 'Vibing...' : 'Add Sauce'}
                </button>
            </div>
            <button 
                onClick={handlePost}
                disabled={!newPost}
                className="px-8 py-2.5 bg-white text-black font-black rounded-2xl text-[12px] uppercase tracking-wider active:scale-95 transition-transform disabled:opacity-50 shadow-lg"
            >
                Post
            </button>
        </div>
      </section>

      {/* Post Stream */}
      <section className="space-y-6 pb-20">
        {posts.map((post) => {
            const guild = MOCK_COMMUNITIES.find(c => c.id === post.communityId);
            const isLiked = likedPosts.has(post.id);
            return (
                <article key={post.id} className="glass rounded-[48px] overflow-hidden border border-white/5 shadow-2xl transition-transform active:scale-[0.99]">
                    <div className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userId}`} className="w-11 h-11 rounded-full border-2 border-zinc-900 shadow-lg" alt="user" />
                        <div>
                          <h4 className="text-sm font-black text-zinc-100 tracking-tight uppercase">@{post.userId === MOCK_USER.id ? 'me' : `user_${post.userId}`}</h4>
                          <div className="flex items-center gap-2">
                             <span className="text-[10px] text-violet-400 font-bold uppercase tracking-tighter bg-violet-400/10 px-1.5 py-0.5 rounded">in {guild?.name || 'Waves'}</span>
                             <span className="text-[10px] text-zinc-600 font-bold">• {post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-6 pb-6">
                      <p className="text-zinc-200 text-base font-medium leading-relaxed tracking-tight">{post.content}</p>
                    </div>

                    {post.media && (
                      <div className="px-3 pb-3">
                        <img src={post.media} className="w-full aspect-square object-cover rounded-[40px] border border-white/10" alt="content" />
                      </div>
                    )}

                    <div className="px-10 py-5 flex items-center justify-between border-t border-white/5 bg-white/[0.01]">
                        <div className="flex items-center gap-12">
                            <button 
                              onClick={() => toggleLike(post.id)}
                              className={`flex items-center gap-2.5 transition-all scale-110 ${isLiked ? 'text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]' : 'text-zinc-500 hover:text-pink-500'}`}
                            >
                                <Heart size={22} className={isLiked ? 'fill-pink-500' : ''} />
                                <span className="text-xs font-black">{post.likes + (isLiked ? 1 : 0)}</span>
                            </button>
                            <button className="flex items-center gap-2.5 text-zinc-500 hover:text-violet-500 transition-all scale-110">
                                <MessageCircle size={22} />
                                <span className="text-xs font-black">{post.comments}</span>
                            </button>
                        </div>
                        <button className="text-zinc-600 hover:text-white transition-colors">
                            <Share2 size={20} />
                        </button>
                    </div>
                </article>
            );
        })}
      </section>
    </div>
  );
};
