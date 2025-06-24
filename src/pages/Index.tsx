
import { useState } from 'react';
import { LoginForm } from '@/components/LoginForm';
import { Dashboard } from '@/components/Dashboard';
import { ApplicationWindow } from '@/components/ApplicationWindow';

export type User = {
  email: string;
  name: string;
  role: string;
};

export type Application = {
  id: string;
  name: string;
  description: string;
};

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const handleLogin = (email: string) => {
    const name = email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
    setUser({
      email,
      name,
      role: 'Supervisor'
    });
  };

  const handleSelectApp = (app: Application) => {
    setSelectedApp(app);
  };

  const handleBackToDashboard = () => {
    setSelectedApp(null);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (selectedApp) {
    return (
      <ApplicationWindow 
        application={selectedApp} 
        user={user}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <Dashboard 
      user={user} 
      onSelectApp={handleSelectApp}
      onLogout={() => setUser(null)}
    />
  );
};

export default Index;
