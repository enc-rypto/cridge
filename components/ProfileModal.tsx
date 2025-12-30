
import React, { useState, useRef, useEffect } from 'react';
import { X, Settings, LogOut, Award, Zap, TrendingUp, Camera, RefreshCw, Check, Trash2 } from 'lucide-react';
import { MOCK_USER } from '../constants';

interface ProfileModalProps {
  onClose: () => void;
  onLogout: () => void;
  onSettingsClick: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, onLogout, onSettingsClick }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 400, height: 400 }, 
        audio: false 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setShowCamera(true);
      setCapturedImage(null);
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Please enable camera permissions to update your profile vibe.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/png');
        setCapturedImage(dataUrl);
        stopCamera();
      }
    }
  };

  const savePhoto = () => {
    if (capturedImage) {
      MOCK_USER.avatar = capturedImage;
      // In a real app, we'd trigger a state update in the parent or a context provider
      // For this prototype, the shared object reference in constants handles the UI update
      setCapturedImage(null);
      onClose();
    }
  };

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-[400px] glass rounded-[56px] p-8 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden relative">
        
        {/* Close Button */}
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-500">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center text-center space-y-6">
          {/* Avatar / Camera Preview Area */}
          <div className="relative group">
            {!showCamera && !capturedImage ? (
              <div className="relative">
                <img 
                  src={MOCK_USER.avatar} 
                  className="w-32 h-32 rounded-[40px] border-4 border-zinc-900 shadow-2xl object-cover" 
                  alt="Me" 
                />
                <button 
                  onClick={startCamera}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera size={32} className="text-white" />
                </button>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-violet-600 rounded-2xl flex items-center justify-center border-4 border-black text-white shadow-lg">
                  <Zap size={18} fill="white" />
                </div>
              </div>
            ) : capturedImage ? (
              <div className="relative">
                <img 
                  src={capturedImage} 
                  className="w-32 h-32 rounded-[40px] border-4 border-emerald-500 shadow-2xl object-cover animate-in zoom-in duration-300" 
                  alt="Captured" 
                />
                <div className="absolute -bottom-2 -right-2 flex gap-1">
                  <button onClick={() => setCapturedImage(null)} className="w-10 h-10 bg-rose-600 rounded-2xl flex items-center justify-center border-4 border-black text-white shadow-lg active:scale-90 transition-transform">
                    <Trash2 size={18} />
                  </button>
                  <button onClick={savePhoto} className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center border-4 border-black text-white shadow-lg active:scale-90 transition-transform">
                    <Check size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative w-32 h-32 rounded-[40px] border-4 border-violet-500 shadow-2xl overflow-hidden bg-black animate-in fade-in duration-300">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover scale-x-[-1]"
                />
                <div className="absolute inset-0 border-2 border-violet-500/30 rounded-[36px] animate-pulse pointer-events-none"></div>
                <button 
                  onClick={capturePhoto}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-violet-600 shadow-lg active:scale-75 transition-transform flex items-center justify-center overflow-hidden"
                >
                  <div className="w-full h-full bg-white active:bg-zinc-200 transition-colors"></div>
                </button>
                <button 
                  onClick={stopCamera}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full backdrop-blur-md"
                >
                  <RefreshCw size={14} />
                </button>
              </div>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />
          
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">{MOCK_USER.name}</h2>
            <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest mt-1">LVL 42 Community Builder</p>
          </div>

          <p className="text-zinc-400 font-medium px-4 leading-relaxed">{MOCK_USER.bio}</p>

          <div className="flex gap-2 flex-wrap justify-center py-2">
            {MOCK_USER.skills.map(skill => (
              <span key={skill} className="px-3 py-1.5 bg-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-500 border border-white/5">
                {skill}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 w-full gap-3 pt-2">
            <div className="glass p-4 rounded-3xl border-white/5">
              <Award size={20} className="text-pink-500 mx-auto mb-2" />
              <p className="text-lg font-black text-white">1.2k</p>
              <p className="text-[8px] font-black uppercase text-zinc-500 tracking-tighter">Impact</p>
            </div>
            <div className="glass p-4 rounded-3xl border-white/5">
              <TrendingUp size={20} className="text-violet-400 mx-auto mb-2" />
              <p className="text-lg font-black text-white">84%</p>
              <p className="text-[8px] font-black uppercase text-zinc-500 tracking-tighter">Energy</p>
            </div>
            <div className="glass p-4 rounded-3xl border-white/5">
              <Zap size={20} className="text-yellow-400 mx-auto mb-2" />
              <p className="text-lg font-black text-white">212</p>
              <p className="text-[8px] font-black uppercase text-zinc-500 tracking-tighter">Waves</p>
            </div>
          </div>

          <div className="w-full space-y-2 pt-4">
            <button 
              onClick={onSettingsClick}
              className="w-full py-4 glass rounded-[24px] flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest text-zinc-300 hover:bg-white/5 active:scale-95 transition-all"
            >
              <Settings size={18} />
              Settings
            </button>
            <button 
              onClick={onLogout}
              className="w-full py-4 rounded-[24px] flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 active:scale-95 transition-all"
            >
              <LogOut size={18} />
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
