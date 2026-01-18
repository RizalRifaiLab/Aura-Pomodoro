import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import useTimerStore from '../store/timerStore';

const Controls = () => {
    const { isRunning, isPaused, start, pause, resume, reset, skipPhase } = useTimerStore();

    const handlePlayPause = () => {
        if (isRunning) {
            pause();
        } else if (isPaused) {
            resume();
        } else {
            start();
        }
    };

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '2rem',
            }}
        >
            {/* Reset Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={reset}
                className="glass-button"
                style={{
                    width: '56px',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                }}
                aria-label="Reset timer"
            >
                <RotateCcw size={24} />
            </motion.button>

            {/* Play/Pause Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayPause}
                className="glass-button glow"
                style={{
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    fontSize: '2rem',
                }}
                aria-label={isRunning ? 'Pause timer' : 'Start timer'}
            >
                <motion.div
                    key={isRunning ? 'pause' : 'play'}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {isRunning ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" />}
                </motion.div>
            </motion.button>

            {/* Skip Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={skipPhase}
                className="glass-button"
                style={{
                    width: '56px',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                }}
                aria-label="Skip to next phase"
            >
                <SkipForward size={24} />
            </motion.button>
        </motion.div>
    );
};

export default Controls;
