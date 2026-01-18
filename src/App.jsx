import { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import AuraBackground from './components/AuraBackground';
import Timer from './components/Timer';
import Controls from './components/Controls';
import TaskInput from './components/TaskInput';
import Stats from './components/Stats';
import Settings from './components/Settings';
import useTimer from './hooks/useTimer';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';
import './styles/index.css';

function App() {
  const [showSettings, setShowSettings] = useState(false);

  // Initialize timer hook
  useTimer();

  // Initialize keyboard shortcuts
  useKeyboardShortcuts(setShowSettings);

  return (
    <>
      {/* Animated Background */}
      <AuraBackground />

      {/* Task Input */}
      <TaskInput />

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Timer />
        <Controls />
      </div>

      {/* Statistics */}
      <Stats />

      {/* Logo and Branding - Top Left */}
      <div
        style={{
          position: 'fixed',
          top: '2rem',
          left: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1.25rem',
          zIndex: 10,
        }}
        className="glass"
      >
        <img
          src="/logo.svg"
          alt="Aura-Pomodoro Logo"
          style={{
            width: '32px',
            height: '32px',
          }}
        />
        <span
          style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            background: 'linear-gradient(135deg, #8B5CF6, #6366F1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.02em',
          }}
        >
          Aura-Pomodoro
        </span>
      </div>

      {/* Settings Button - Top Right */}
      <button
        onClick={() => setShowSettings(true)}
        className="glass-button"
        style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          width: '48px',
          height: '48px',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
        aria-label="Open settings"
      >
        <SettingsIcon size={24} />
      </button>

      {/* Settings Panel */}
      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
}

export default App;
