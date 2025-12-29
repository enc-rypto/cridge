
import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, MessageSquare, ArrowLeft, MoreHorizontal, User } from 'lucide-react';
import { ChatRoom, Message } from '../types';
import { MOCK_USER } from '../constants';

const MOCK_ROOMS: ChatRoom[] = [
  { id: 'r1', peerId: 'u2', peerName: 'ZeroX', peerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZeroX', lastMessage: 'That build is fire!', unreadCount: 2 },
  { id: 'r2', peerId: 'u3', peerName: 'PixelPixie', peerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pixel', lastMessage: 'Did you check the new repo?', unreadCount: 0 },
];

export const Messaging: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim() || !selectedRoom) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: MOCK_USER.id,
      text: input,
      timestamp: 'Just now'
    };

    setMessages([...messages, newMsg]);
    setInput('');

    // Simulate peer reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedRoom.peerId,
        text: "Vibe checked. Let's build it! 🚀",
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  if (selectedRoom) {
    return (
      <div className="flex flex-col h-full bg-[#050507] animate-in slide-in-from-right duration-300">
        <header className="glass p-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedRoom(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-400">
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <img src={selectedRoom.peerAvatar} className="w-10 h-10 rounded-xl border border-white/10" alt="Peer" />
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-tight">{selectedRoom.peerName}</h3>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active Now</span>
              </div>
            </div>
          </div>
          <button className="p-2 text-zinc-500"><MoreHorizontal size={20} /></button>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-20 text-center space-y-4">
              <MessageSquare size={64} />
              <p className="text-xs font-black uppercase tracking-[0.3em]">Encrypted Channel Established</p>
            </div>
          )}
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.senderId === MOCK_USER.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-[24px] text-sm font-medium ${
                msg.senderId === MOCK_USER.id 
                  ? 'bg-violet-600 text-white rounded-tr-none shadow-lg shadow-violet-600/20' 
                  : 'glass border-white/5 text-zinc-200 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 pt-2 bg-gradient-to-t from-[#050507] to-transparent">
          <div className="glass p-2 rounded-[32px] border-white/10 flex items-center gap-2">
            <input 
              type="text"
              placeholder="Type your vibe..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-white px-4 font-medium"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              onClick={handleSendMessage}
              className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform shadow-lg"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      <div className="space-y-1">
        <h2 className="text-4xl font-black italic tracking-tighter gradient-text uppercase">COMM CHANNELS</h2>
        <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest leading-none">Peer-to-Peer Neural Messaging</p>
      </div>

      <div className="space-y-3">
        {MOCK_ROOMS.map(room => (
          <div 
            key={room.id}
            onClick={() => setSelectedRoom(room)}
            className="glass p-5 rounded-[32px] border-white/5 flex items-center gap-4 group active:scale-[0.98] transition-all cursor-pointer hover:bg-white/[0.03]"
          >
            <div className="relative">
              <img src={room.peerAvatar} className="w-14 h-14 rounded-2xl border border-white/10 shadow-xl" alt="Peer" />
              {room.unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-[#050507]">
                  {room.unreadCount}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-white uppercase tracking-tight">{room.peerName}</h4>
              <p className="text-zinc-500 text-xs truncate font-medium">{room.lastMessage}</p>
            </div>
            <Sparkles size={16} className="text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      <div className="p-10 border-2 border-dashed border-zinc-900 rounded-[48px] flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-[28px] glass border-zinc-800 flex items-center justify-center text-zinc-700">
           <User size={32} strokeWidth={3} />
        </div>
        <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Connect with more peers</p>
        <button className="px-8 py-3 bg-zinc-900 text-zinc-400 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors">Find Peers</button>
      </div>
    </div>
  );
};
