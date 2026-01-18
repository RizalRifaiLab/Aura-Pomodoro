import { useEffect, useRef } from 'react';
import useTimerStore from '../store/timerStore';
import useSettingsStore from '../store/settingsStore';
import useStatsStore from '../store/statsStore';
import {
    notifyFocusComplete,
    notifyBreakComplete,
    notifyLongBreakComplete,
} from '../utils/notifications';
import { PHASES } from '../store/timerStore';

const useTimer = () => {
    const {
        isRunning,
        isPaused,
        timeRemaining,
        currentPhase,
        tick,
        complete,
    } = useTimerStore();

    const { soundEnabled, notificationsEnabled } = useSettingsStore();
    const addFocusTime = useStatsStore((state) => state.addFocusTime);

    const intervalRef = useRef(null);
    const previousPhaseRef = useRef(currentPhase);
    const previousIsRunningRef = useRef(isRunning);

    // Audio refs for all sounds
    const completeSoundRef = useRef(null);
    const runningSoundRef = useRef(null);
    const pauseSoundRef = useRef(null);

    // Initialize audio files
    useEffect(() => {
        completeSoundRef.current = new Audio('/sounds/complete.mp3');
        completeSoundRef.current.volume = 0.5;

        runningSoundRef.current = new Audio('/sounds/running.mp3');
        runningSoundRef.current.volume = 0.5;

        pauseSoundRef.current = new Audio('/sounds/pause.mp3');
        pauseSoundRef.current.volume = 0.5;
    }, []);

    // Play sound when timer starts or pauses
    useEffect(() => {
        const wasRunning = previousIsRunningRef.current;
        const nowRunning = isRunning;

        // Timer just started (was not running, now is running)
        if (!wasRunning && nowRunning && soundEnabled) {
            if (runningSoundRef.current) {
                runningSoundRef.current.currentTime = 0;
                runningSoundRef.current.play().catch(() => {
                    // Ignore audio play errors
                });
            }
        }

        // Timer just paused (was running, now is paused and not at 0)
        if (wasRunning && isPaused && timeRemaining > 0 && soundEnabled) {
            if (pauseSoundRef.current) {
                pauseSoundRef.current.currentTime = 0;
                pauseSoundRef.current.play().catch(() => {
                    // Ignore audio play errors
                });
            }
        }

        // Update previous state
        previousIsRunningRef.current = isRunning;
    }, [isRunning, isPaused, timeRemaining, soundEnabled]);

    // Handle timer countdown
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                tick();
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, tick]);

    // Handle timer completion
    useEffect(() => {
        if (timeRemaining === 0 && isRunning) {
            // Play completion sound
            if (soundEnabled && completeSoundRef.current) {
                completeSoundRef.current.currentTime = 0;
                completeSoundRef.current.play().catch(() => {
                    // Ignore audio play errors
                });
            }

            // Send notification
            if (notificationsEnabled) {
                if (currentPhase === PHASES.FOCUS) {
                    notifyFocusComplete();
                } else if (currentPhase === PHASES.SHORT_BREAK) {
                    notifyBreakComplete();
                } else if (currentPhase === PHASES.LONG_BREAK) {
                    notifyLongBreakComplete();
                }
            }

            // Complete the phase
            complete();
        }
    }, [timeRemaining, isRunning, currentPhase, soundEnabled, notificationsEnabled, complete]);

    // Track phase changes
    useEffect(() => {
        if (previousPhaseRef.current !== currentPhase) {
            previousPhaseRef.current = currentPhase;
        }
    }, [currentPhase]);

    // Update focus time in stats (every second during focus)
    useEffect(() => {
        if (isRunning && currentPhase === PHASES.FOCUS) {
            const focusInterval = setInterval(() => {
                addFocusTime(1);
            }, 1000);

            return () => clearInterval(focusInterval);
        }
    }, [isRunning, currentPhase, addFocusTime]);

    return {
        isRunning,
        timeRemaining,
        currentPhase,
    };
};

export default useTimer;
