
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Feed } from './components/Feed';
import { Communities } from './components/Communities';
import { ShortsFeed } from './components/ShortsFeed';
import { CreateWaveModal } from './components/CreateWaveModal';
import { ProfileModal } from './components/ProfileModal';
import { SettingsModal } from './components/SettingsModal';
import { GuildDetail } from './components/GuildDetail';
import { DeepResearch } from './components/DeepResearch';
import { BackendDashboard } from './components/BackendDashboard';
import { Messaging } from './components/Messaging';
import { Login } from './components/Login';
import { Community } from './types';
import { MOCK_USER } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [showCreateWave, setShowCreateWave] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedGuild, setSelectedGuild] = useState<Community | null>(null);
  const [userData, setUserData] = useState(MOCK_USER);

  useEffect(() => {
    const saved = localStorage.getItem('cridge_session');
    if (saved) setIsLoggedIn(true);
  }, []);

  const handleLogin = (sessionKey: string) => {
    setIsLoggedIn(true);
    localStorage.setItem('cridge_session', sessionKey);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('cridge_session');
    setShowProfile(false);
    setActiveTab('feed');
    setSelectedGuild(null);
  };

  const updateProfile = (updated: any) => {
    setUserData(updated);
    Object.assign(MOCK_USER, updated); 
  };

  const renderContent = () => {
    if (selectedGuild) {
      return <GuildDetail guild={selectedGuild} onBack={() => setSelectedGuild(null)} />;
    }

    switch (activeTab) {
      case 'feed':
        return <Feed onStartWave={() => setShowCreateWave(true)} />;
      case 'shorts':
        return <ShortsFeed />;
      case 'communities':
        return <Communities onSelectGuild={(guild) => setSelectedGuild(guild)} />;
      case 'explore':
        return <DeepResearch />;
      case 'messages':
        return <Messaging />;
      case 'system':
        return <BackendDashboard />;
      default:
        return <Feed onStartWave={() => setShowCreateWave(true)} />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} onProfileClick={() => setShowProfile(true)}>
      <div className="h-full">
        {renderContent()}
      </div>
      
      {showCreateWave && <CreateWaveModal onClose={() => setShowCreateWave(false)} />}
      {showProfile && (
        <ProfileModal 
          onClose={() => setShowProfile(false)} 
          onLogout={handleLogout} 
          onSettingsClick={() => {
            setShowProfile(false);
            setShowSettings(true);
          }} 
        />
      )}
      {showSettings && (
        <SettingsModal 
          onClose={() => setShowSettings(false)} 
          onSave={updateProfile}
        />
      )}
    </Layout>
  );
};

export default App;
