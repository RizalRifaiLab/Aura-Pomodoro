import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStatsStore = create(
    persist(
        (set, get) => ({
            // Statistics
            totalPomodoros: 0,
            todayPomodoros: 0,
            totalFocusTime: 0, // in seconds
            todayFocusTime: 0, // in seconds
            currentStreak: 0,
            longestStreak: 0,
            lastCompletedDate: null,

            // History (last 7 days)
            dailyHistory: [], // Array of { date, pomodoros, focusTime }

            // Actions
            incrementPomodoros: () => {
                const today = new Date().toDateString();
                const { lastCompletedDate, currentStreak, longestStreak } = get();

                // Check streak
                let newStreak = currentStreak;
                if (lastCompletedDate === today) {
                    // Same day, streak continues
                    newStreak = currentStreak;
                } else {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);

                    if (lastCompletedDate === yesterday.toDateString()) {
                        // Continued from yesterday
                        newStreak = currentStreak + 1;
                    } else {
                        // Streak broken, start new
                        newStreak = 1;
                    }
                }

                set({
                    totalPomodoros: get().totalPomodoros + 1,
                    todayPomodoros: get().todayPomodoros + 1,
                    currentStreak: newStreak,
                    longestStreak: Math.max(newStreak, longestStreak),
                    lastCompletedDate: today,
                });

                // Update daily history
                get().updateDailyHistory(1, 0);
            },

            addFocusTime: (seconds) => {
                set({
                    totalFocusTime: get().totalFocusTime + seconds,
                    todayFocusTime: get().todayFocusTime + seconds,
                });

                get().updateDailyHistory(0, seconds);
            },

            updateDailyHistory: (pomodoros, focusTime) => {
                const today = new Date().toDateString();
                const { dailyHistory } = get();

                const existingIndex = dailyHistory.findIndex(
                    (entry) => entry.date === today
                );

                if (existingIndex >= 0) {
                    // Update existing entry
                    const updated = [...dailyHistory];
                    updated[existingIndex] = {
                        date: today,
                        pomodoros: updated[existingIndex].pomodoros + pomodoros,
                        focusTime: updated[existingIndex].focusTime + focusTime,
                    };
                    set({ dailyHistory: updated.slice(-7) }); // Keep last 7 days
                } else {
                    // Add new entry
                    set({
                        dailyHistory: [
                            ...dailyHistory,
                            { date: today, pomodoros, focusTime },
                        ].slice(-7), // Keep last 7 days
                    });
                }
            },

            resetDailyStats: () => {
                set({
                    todayPomodoros: 0,
                    todayFocusTime: 0,
                });
            },

            resetAllStats: () => {
                set({
                    totalPomodoros: 0,
                    todayPomodoros: 0,
                    totalFocusTime: 0,
                    todayFocusTime: 0,
                    currentStreak: 0,
                    longestStreak: 0,
                    lastCompletedDate: null,
                    dailyHistory: [],
                });
            },

            // Getters
            getFormattedTotalTime: () => {
                const { totalFocusTime } = get();
                const hours = Math.floor(totalFocusTime / 3600);
                const minutes = Math.floor((totalFocusTime % 3600) / 60);

                if (hours > 0) {
                    return `${hours}h ${minutes}m`;
                }
                return `${minutes}m`;
            },

            getFormattedTodayTime: () => {
                const { todayFocusTime } = get();
                const hours = Math.floor(todayFocusTime / 3600);
                const minutes = Math.floor((todayFocusTime % 3600) / 60);

                if (hours > 0) {
                    return `${hours}h ${minutes}m`;
                }
                return `${minutes}m`;
            },
        }),
        {
            name: 'aura-sync-stats',
        }
    )
);

// Check and reset daily stats at midnight
const checkDailyReset = () => {
    const store = useStatsStore.getState();
    const today = new Date().toDateString();

    if (store.lastCompletedDate && store.lastCompletedDate !== today) {
        const lastDate = new Date(store.lastCompletedDate);
        const todayDate = new Date();
        const daysDiff = Math.floor(
            (todayDate - lastDate) / (1000 * 60 * 60 * 24)
        );

        // Reset today's stats
        store.resetDailyStats();

        // If more than 1 day passed, reset streak
        if (daysDiff > 1) {
            useStatsStore.setState({ currentStreak: 0 });
        }
    }
};

// Run check on load and every hour
checkDailyReset();
setInterval(checkDailyReset, 3600000); // Every hour

export default useStatsStore;
