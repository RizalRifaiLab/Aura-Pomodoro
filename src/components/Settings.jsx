import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    Volume2,
    VolumeX,
    Bell,
    BellOff,
    Settings as SettingsIcon,
    Palette,
} from 'lucide-react';
import useSettingsStore from '../store/settingsStore';
import { auraPresets } from '../utils/colors';
import { requestNotificationPermission } from '../utils/notifications';

const Settings = ({ isOpen, onClose }) => {
    const {
        durations,
        setFocusDuration,
        setShortBreakDuration,
        setLongBreakDuration,
        soundEnabled,
        toggleSound,
        notificationsEnabled,
        toggleNotifications,
        autoStartPomodoros,
        toggleAutoStartPomodoros,
        autoStartBreaks,
        toggleAutoStartBreaks,
        auraPreset,
        setAuraPreset,
        resetToDefaults,
    } = useSettingsStore();

    const handleNotificationToggle = async () => {
        if (!notificationsEnabled) {
            const granted = await requestNotificationPermission();
            if (granted) {
                toggleNotifications();
            }
        } else {
            toggleNotifications();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0, 0, 0, 0.5)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 99,
                        }}
                    />

                    {/* Settings Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="glass"
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            height: '100%',
                            width: '100%',
                            maxWidth: '500px',
                            zIndex: 100,
                            padding: '2rem',
                            overflowY: 'auto',
                            borderRadius: 0,
                        }}
                    >
                        {/* Header */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '2rem',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <SettingsIcon size={28} />
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Settings</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="glass-button"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                aria-label="Close settings"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Timer Durations */}
                        <section style={{ marginBottom: '2rem' }}>
                            <h3
                                style={{
                                    fontSize: '1.125rem',
                                    fontWeight: 600,
                                    marginBottom: '1rem',
                                    color: 'rgba(255, 255, 255, 0.9)',
                                }}
                            >
                                Timer Durations
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label
                                        style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.875rem',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                        }}
                                    >
                                        Focus (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="60"
                                        value={durations.focus}
                                        onChange={(e) => setFocusDuration(Number(e.target.value))}
                                        className="glass-button"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            fontSize: '1rem',
                                        }}
                                    />
                                </div>

                                <div>
                                    <label
                                        style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.875rem',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                        }}
                                    >
                                        Short Break (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="30"
                                        value={durations.shortBreak}
                                        onChange={(e) => setShortBreakDuration(Number(e.target.value))}
                                        className="glass-button"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            fontSize: '1rem',
                                        }}
                                    />
                                </div>

                                <div>
                                    <label
                                        style={{
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.875rem',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                        }}
                                    >
                                        Long Break (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="60"
                                        value={durations.longBreak}
                                        onChange={(e) => setLongBreakDuration(Number(e.target.value))}
                                        className="glass-button"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            fontSize: '1rem',
                                        }}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Aura Preset */}
                        <section style={{ marginBottom: '2rem' }}>
                            <h3
                                style={{
                                    fontSize: '1.125rem',
                                    fontWeight: 600,
                                    marginBottom: '1rem',
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                }}
                            >
                                <Palette size={20} />
                                Aura Theme
                            </h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                {Object.entries(auraPresets).map(([key, preset]) => (
                                    <button
                                        key={key}
                                        onClick={() => setAuraPreset(key)}
                                        className="glass-button"
                                        style={{
                                            padding: '1rem',
                                            textAlign: 'left',
                                            border: auraPreset === key ? '2px solid rgba(255, 255, 255, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '40px',
                                                borderRadius: '8px',
                                                background: preset.focus.gradient,
                                                marginBottom: '0.5rem',
                                            }}
                                        />
                                        <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                                            {preset.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Toggle Settings */}
                        <section style={{ marginBottom: '2rem' }}>
                            <h3
                                style={{
                                    fontSize: '1.125rem',
                                    fontWeight: 600,
                                    marginBottom: '1rem',
                                    color: 'rgba(255, 255, 255, 0.9)',
                                }}
                            >
                                Preferences
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <ToggleOption
                                    icon={soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                                    label="Sound Effects"
                                    checked={soundEnabled}
                                    onChange={toggleSound}
                                />

                                <ToggleOption
                                    icon={notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
                                    label="Notifications"
                                    checked={notificationsEnabled}
                                    onChange={handleNotificationToggle}
                                />

                                <ToggleOption
                                    label="Auto-start Pomodoros"
                                    checked={autoStartPomodoros}
                                    onChange={toggleAutoStartPomodoros}
                                />

                                <ToggleOption
                                    label="Auto-start Breaks"
                                    checked={autoStartBreaks}
                                    onChange={toggleAutoStartBreaks}
                                />
                            </div>
                        </section>

                        {/* Reset Button */}
                        <button
                            onClick={resetToDefaults}
                            className="glass-button"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                fontSize: '1rem',
                                fontWeight: 600,
                            }}
                        >
                            Reset to Defaults
                        </button>

                        {/* Keyboard Shortcuts Help */}
                        <section style={{ marginTop: '2rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                            <h4 style={{ marginBottom: '0.75rem', fontWeight: 600 }}>Keyboard Shortcuts</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div><kbd style={{ padding: '0.25rem 0.5rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}>Space</kbd> Play/Pause</div>
                                <div><kbd style={{ padding: '0.25rem 0.5rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}>R</kbd> Reset</div>
                                <div><kbd style={{ padding: '0.25rem 0.5rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}>N</kbd> Skip</div>
                                <div><kbd style={{ padding: '0.25rem 0.5rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}>S</kbd> Settings</div>
                                <div><kbd style={{ padding: '0.25rem 0.5rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px' }}>Esc</kbd> Close</div>
                            </div>
                        </section>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// Toggle Option Component
const ToggleOption = ({ icon, label, checked, onChange }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {icon}
                <span style={{ fontSize: '0.9375rem' }}>{label}</span>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                    style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: checked ? 'rgba(139, 92, 246, 0.6)' : 'rgba(255, 255, 255, 0.2)',
                        transition: '0.3s',
                        borderRadius: '26px',
                    }}
                >
                    <span
                        style={{
                            position: 'absolute',
                            content: '',
                            height: '20px',
                            width: '20px',
                            left: checked ? '27px' : '3px',
                            bottom: '3px',
                            background: 'white',
                            transition: '0.3s',
                            borderRadius: '50%',
                        }}
                    />
                </span>
            </label>
        </div>
    );
};

export default Settings;
