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

      {/* Main App Container */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          gridTemplateColumns: '1fr',
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          zIndex: 1,
          gap: '1rem',
          padding: '1rem',
          boxSizing: 'border-box',
        }}
      >
        {/* Header Section */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem',
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '1rem',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Logo and Branding */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1.25rem',
              minWidth: 'fit-content',
            }}
            className="glass"
          >
            <img
              src="/logo.svg"
              alt="Aura-Pomodoro Logo"
              style={{
                width: '32px',
                height: '32px',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(135deg, #8B5CF6, #6366F1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              Aura-Pomodoro
            </span>
          </div>

          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(true)}
            className="glass-button"
            style={{
              width: '48px',
              height: '48px',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-label="Open settings"
          >
            <SettingsIcon size={24} />
          </button>
        </header>

        {/* Main Content Section */}
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '1rem',
            position: 'relative',
          }}
        >
          {/* Task Input */}
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <TaskInput />
          </div>

          {/* Timer */}
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <Timer />
          </div>

          {/* Controls */}
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <Controls />
          </div>
        </main>

        {/* Footer Section - Stats */}
        <footer
          style={{
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '1rem',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <Stats />
        </footer>
      </div>

      {/* Settings Panel */}
      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
}

export default App;