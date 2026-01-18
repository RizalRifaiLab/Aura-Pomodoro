import { create } from 'zustand';
import useSettingsStore from './settingsStore';
import useStatsStore from './statsStore';

const PHASES = {
    FOCUS: 'focus',
    SHORT_BREAK: 'shortBreak',
    LONG_BREAK: 'longBreak',
};

const useTimerStore = create((set, get) => ({
    // State
    currentPhase: PHASES.FOCUS,
    timeRemaining: 25 * 60, // 25 minutes in seconds
    isRunning: false,
    isPaused: false,
    sessionsCompleted: 0,
    totalFocusTime: 0, // in seconds
    currentTask: '',

    // Actions
    start: () => {
        set({ isRunning: true, isPaused: false });
    },

    pause: () => {
        set({ isPaused: true, isRunning: false });
    },

    resume: () => {
        set({ isRunning: true, isPaused: false });
    },

    reset: () => {
        const { currentPhase } = get();
        const settingsStore = useSettingsStore.getState();
        const durations = settingsStore.durations;

        let newTime;
        if (currentPhase === PHASES.FOCUS) {
            newTime = durations.focus * 60;
        } else if (currentPhase === PHASES.SHORT_BREAK) {
            newTime = durations.shortBreak * 60;
        } else {
            newTime = durations.longBreak * 60;
        }

        set({
            timeRemaining: newTime,
            isRunning: false,
            isPaused: false,
        });
    },

    tick: () => {
        const { isRunning, timeRemaining, currentPhase } = get();

        if (!isRunning || timeRemaining <= 0) return;

        // Increment total focus time if in focus phase
        if (currentPhase === PHASES.FOCUS) {
            set({ totalFocusTime: get().totalFocusTime + 1 });
        }

        set({ timeRemaining: timeRemaining - 1 });
    },

    complete: () => {
        const { currentPhase, sessionsCompleted } = get();
        const settingsStore = useSettingsStore.getState();
        const statsStore = useStatsStore.getState();

        // Update stats
        if (currentPhase === PHASES.FOCUS) {
            statsStore.incrementPomodoros();
            set({ sessionsCompleted: sessionsCompleted + 1 });
        }

        // Determine next phase
        let nextPhase;
        let nextTime;

        if (currentPhase === PHASES.FOCUS) {
            // After 4 focus sessions, take a long break
            if ((sessionsCompleted + 1) % 4 === 0) {
                nextPhase = PHASES.LONG_BREAK;
                nextTime = settingsStore.durations.longBreak * 60;
            } else {
                nextPhase = PHASES.SHORT_BREAK;
                nextTime = settingsStore.durations.shortBreak * 60;
            }
        } else {
            // After any break, go back to focus
            nextPhase = PHASES.FOCUS;
            nextTime = settingsStore.durations.focus * 60;
        }

        set({
            currentPhase: nextPhase,
            timeRemaining: nextTime,
            isRunning: settingsStore.autoStartBreaks && nextPhase !== PHASES.FOCUS
                ? true
                : settingsStore.autoStartPomodoros && nextPhase === PHASES.FOCUS
                    ? true
                    : false,
            isPaused: false,
        });
    },

    skipPhase: () => {
        get().complete();
    },

    setCurrentTask: (task) => {
        set({ currentTask: task });
    },

    // Getters
    getFormattedTime: () => {
        const { timeRemaining } = get();
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },

    getProgress: () => {
        const { currentPhase, timeRemaining } = get();
        const settingsStore = useSettingsStore.getState();

        let totalTime;
        if (currentPhase === PHASES.FOCUS) {
            totalTime = settingsStore.durations.focus * 60;
        } else if (currentPhase === PHASES.SHORT_BREAK) {
            totalTime = settingsStore.durations.shortBreak * 60;
        } else {
            totalTime = settingsStore.durations.longBreak * 60;
        }

        return ((totalTime - timeRemaining) / totalTime) * 100;
    },
}));

export { PHASES };
export default useTimerStore;
