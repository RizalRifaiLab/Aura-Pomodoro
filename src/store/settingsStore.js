import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create(
    persist(
        (set) => ({
            // Timer Durations (in minutes)
            durations: {
                focus: 25,
                shortBreak: 5,
                longBreak: 15,
            },

            // Aura Preset
            auraPreset: 'default',

            // Sound Settings
            soundEnabled: true,
            volume: 0.5,

            // Auto-start Settings
            autoStartPomodoros: false,
            autoStartBreaks: true,

            // Notification Settings
            notificationsEnabled: true,

            // UI Settings
            showStats: true,
            showTaskInput: true,

            // Actions
            updateDurations: (durations) => {
                set({ durations: { ...durations } });
            },

            setFocusDuration: (minutes) => {
                set((state) => ({
                    durations: { ...state.durations, focus: minutes },
                }));
            },

            setShortBreakDuration: (minutes) => {
                set((state) => ({
                    durations: { ...state.durations, shortBreak: minutes },
                }));
            },

            setLongBreakDuration: (minutes) => {
                set((state) => ({
                    durations: { ...state.durations, longBreak: minutes },
                }));
            },

            setAuraPreset: (preset) => {
                set({ auraPreset: preset });
            },

            toggleSound: () => {
                set((state) => ({ soundEnabled: !state.soundEnabled }));
            },

            setVolume: (volume) => {
                set({ volume: Math.max(0, Math.min(1, volume)) });
            },

            toggleAutoStartPomodoros: () => {
                set((state) => ({ autoStartPomodoros: !state.autoStartPomodoros }));
            },

            toggleAutoStartBreaks: () => {
                set((state) => ({ autoStartBreaks: !state.autoStartBreaks }));
            },

            toggleNotifications: () => {
                set((state) => ({ notificationsEnabled: !state.notificationsEnabled }));
            },

            toggleStats: () => {
                set((state) => ({ showStats: !state.showStats }));
            },

            toggleTaskInput: () => {
                set((state) => ({ showTaskInput: !state.showTaskInput }));
            },

            resetToDefaults: () => {
                set({
                    durations: {
                        focus: 25,
                        shortBreak: 5,
                        longBreak: 15,
                    },
                    auraPreset: 'default',
                    soundEnabled: true,
                    volume: 0.5,
                    autoStartPomodoros: false,
                    autoStartBreaks: true,
                    notificationsEnabled: true,
                    showStats: true,
                    showTaskInput: true,
                });
            },
        }),
        {
            name: 'aura-sync-settings',
        }
    )
);

export default useSettingsStore;
