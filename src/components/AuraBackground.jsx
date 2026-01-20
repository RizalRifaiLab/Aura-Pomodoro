import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useTimerStore from '../store/timerStore';
import useSettingsStore from '../store/settingsStore';
import { generateMeshGradient, getPhaseColors } from '../utils/colors';
import { PHASES } from '../store/timerStore';

const AuraBackground = () => {
    const { currentPhase, isRunning } = useTimerStore();
    const { auraPreset } = useSettingsStore();
    const [colors, setColors] = useState([]);
    const [animationsReady, setAnimationsReady] = useState(false);

    useEffect(() => {
        const phase = currentPhase === PHASES.FOCUS ? 'focus' : 'break';
        const phaseColors = getPhaseColors(auraPreset, phase);
        setColors(phaseColors.colors);
    }, [currentPhase, auraPreset]);

    // Defer heavy animations until after initial render
    useEffect(() => {
        // Use requestIdleCallback if available, otherwise setTimeout
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                setAnimationsReady(true);
            });
        } else {
            setTimeout(() => {
                setAnimationsReady(true);
            }, 100);
        }
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                overflow: 'hidden',
                background: '#0a0a0a',
            }}
        >
            {/* Animated Mesh Gradient */}
            <motion.div
                key={`${currentPhase}-${auraPreset}`}
                initial={{ opacity: animationsReady ? 0 : 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: animationsReady ? 1.5 : 0 }}
                style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    backgroundImage: generateMeshGradient(colors),
                    backgroundSize: '200% 200%',
                    filter: isRunning ? 'blur(80px)' : 'blur(60px)',
                }}
                className={isRunning ? 'animate-gradient-fast animate-pulse-aura' : 'animate-gradient'}
            />

            {/* Overlay gradient for depth */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(10, 10, 10, 0.5) 100%)',
                }}
            />

            {/* Vignette effect */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.7) 100%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Floating orbs for extra ambiance - deferred for performance */}
            {animationsReady && (
                <>
                    <motion.div
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -100, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        style={{
                            position: 'absolute',
                            top: '20%',
                            left: '10%',
                            width: '300px',
                            height: '300px',
                            borderRadius: '50%',
                            background: colors[0] || '#8B5CF6',
                            filter: 'blur(100px)',
                            opacity: 0.3,
                        }}
                    />

                    <motion.div
                        animate={{
                            x: [0, -80, 0],
                            y: [0, 120, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        style={{
                            position: 'absolute',
                            bottom: '15%',
                            right: '15%',
                            width: '400px',
                            height: '400px',
                            borderRadius: '50%',
                            background: colors[1] || '#6366F1',
                            filter: 'blur(120px)',
                            opacity: 0.25,
                        }}
                    />

                    <motion.div
                        animate={{
                            x: [0, 60, 0],
                            y: [0, -60, 0],
                            scale: [1, 1.15, 1],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '20%',
                            width: '250px',
                            height: '250px',
                            borderRadius: '50%',
                            background: colors[2] || '#7C3AED',
                            filter: 'blur(90px)',
                            opacity: 0.2,
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default AuraBackground;
