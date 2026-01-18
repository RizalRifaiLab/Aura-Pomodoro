import { motion } from 'framer-motion';
import useTimerStore from '../store/timerStore';
import { PHASES } from '../store/timerStore';

const Timer = () => {
    const { getFormattedTime, currentPhase, getProgress } = useTimerStore();

    const getPhaseLabel = () => {
        switch (currentPhase) {
            case PHASES.FOCUS:
                return 'Focus Time';
            case PHASES.SHORT_BREAK:
                return 'Short Break';
            case PHASES.LONG_BREAK:
                return 'Long Break';
            default:
                return 'Focus Time';
        }
    };

    const progress = getProgress();

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="glass"
            style={{
                padding: '3rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                minWidth: '400px',
            }}
        >
            {/* Phase Label */}
            <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    marginBottom: '1.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255, 255, 255, 0.7)',
                }}
            >
                {getPhaseLabel()}
            </motion.div>

            {/* Timer Display */}
            <motion.div
                key={getFormattedTime()}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                    fontSize: '6rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    lineHeight: 1,
                    marginBottom: '2rem',
                    color: '#ffffff',
                    textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
                }}
            >
                {getFormattedTime()}
            </motion.div>

            {/* Progress Bar */}
            <div
                style={{
                    width: '100%',
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.9))',
                        borderRadius: '2px',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                    }}
                />
            </div>

            {/* Decorative elements */}
            <div
                style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />
        </motion.div>
    );
};

export default Timer;
