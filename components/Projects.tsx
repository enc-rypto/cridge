
import React from 'react';
import { LayoutGrid, Users, Clock, CheckCircle2 } from 'lucide-react';

export const Projects: React.FC = () => {
  const ACTIVE_PROJECTS = [
    { 
      id: 'pr1', 
      title: 'Decentralized Grid', 
      community: 'Eco-Tech', 
      progress: 65, 
      members: 12, 
      status: 'building',
      deadline: '14 days left'
    },
    { 
      id: 'pr2', 
      title: 'AI Storyteller Bot', 
      community: 'Game Dev Lab', 
      progress: 90, 
      members: 5, 
      status: 'building',
      deadline: '2 days left'
    },
    { 
      id: 'pr3', 
      title: 'Ethical Hacking Kit', 
      community: 'Web3 Architects', 
      progress: 25, 
      members: 34, 
      status: 'ideation',
      deadline: 'Ongoing'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-1">Collaboration Hub</h2>
        <p className="text-zinc-500">Active projects within your network.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ACTIVE_PROJECTS.map(project => (
          <div key={project.id} className="glass-effect p-6 rounded-3xl border border-zinc-800/50 hover:border-indigo-500/30 transition-all cursor-pointer group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    project.status === 'ideation' ? 'bg-amber-400/10 text-amber-400' : 'bg-emerald-400/10 text-emerald-400'
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">{project.community}</span>
                </div>
                <h3 className="text-2xl font-bold group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                <div className="flex items-center gap-6 text-zinc-400">
                  <div className="flex items-center gap-1.5 text-sm">
                    <Users size={16} />
                    <span>{project.members} contributors</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Clock size={16} />
                    <span>{project.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 max-w-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-500 mb-1">
                  <span>OVERALL PROGRESS</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <button className="w-full mt-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-sm transition-colors border border-zinc-700">
                  Enter Workspace
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="glass-effect p-6 rounded-3xl text-center">
          <p className="text-zinc-500 text-sm mb-1 uppercase tracking-wider font-bold">Completed Together</p>
          <p className="text-4xl font-black text-white">24</p>
          <div className="flex justify-center mt-2 text-emerald-500">
            <CheckCircle2 size={24} />
          </div>
        </div>
        <div className="glass-effect p-6 rounded-3xl text-center">
          <p className="text-zinc-500 text-sm mb-1 uppercase tracking-wider font-bold">Total Impact</p>
          <p className="text-4xl font-black text-white">4.2M</p>
          <p className="text-xs text-zinc-600 mt-2">users reached</p>
        </div>
        <div className="glass-effect p-6 rounded-3xl text-center">
          <p className="text-zinc-500 text-sm mb-1 uppercase tracking-wider font-bold">AI Support Hours</p>
          <p className="text-4xl font-black text-white">1.8k</p>
          <p className="text-xs text-zinc-600 mt-2">automated tasks</p>
        </div>
      </div>
    </div>
  );
};
