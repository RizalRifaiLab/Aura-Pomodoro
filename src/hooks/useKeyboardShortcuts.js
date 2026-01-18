import { useEffect } from 'react';
import useTimerStore from '../store/timerStore';

const useKeyboardShortcuts = (setShowSettings) => {
    const { isRunning, isPaused, start, pause, resume, reset, skipPhase } = useTimerStore();

    useEffect(() => {
        const handleKeyPress = (e) => {
            // Ignore if typing in an input field
            if (
                e.target.tagName === 'INPUT' ||
                e.target.tagName === 'TEXTAREA' ||
                e.target.isContentEditable
            ) {
                return;
            }

            switch (e.key.toLowerCase()) {
                case ' ':
                    // Space: Play/Pause
                    e.preventDefault();
                    if (isRunning) {
                        pause();
                    } else if (isPaused) {
                        resume();
                    } else {
                        start();
                    }
                    break;

                case 'r':
                    // R: Reset
                    e.preventDefault();
                    reset();
                    break;

                case 's':
                    // S: Toggle Settings
                    e.preventDefault();
                    setShowSettings((prev) => !prev);
                    break;

                case 'n':
                    // N: Skip to Next phase
                    e.preventDefault();
                    skipPhase();
                    break;

                case 'escape':
                    // Escape: Close settings
                    e.preventDefault();
                    setShowSettings(false);
                    break;

                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [isRunning, isPaused, start, pause, resume, reset, skipPhase, setShowSettings]);
};

export default useKeyboardShortcuts;
