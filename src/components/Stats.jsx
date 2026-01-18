import { motion } from 'framer-motion';
import { Target, Clock, Flame } from 'lucide-react';
import useStatsStore from '../store/statsStore';
import useSettingsStore from '../store/settingsStore';

const Stats = () => {
    const {
        todayPomodoros,
        currentStreak,
        getFormattedTodayTime,
    } = useStatsStore();
    const { showStats } = useSettingsStore();

    if (!showStats) return null;

    const stats = [
        {
            icon: Target,
            label: 'Today',
            value: todayPomodoros,
            suffix: todayPomodoros === 1 ? 'session' : 'sessions',
        },
        {
            icon: Clock,
            label: 'Focus Time',
            value: getFormattedTodayTime(),
            suffix: '',
        },
        {
            icon: Flame,
            label: 'Streak',
            value: currentStreak,
            suffix: currentStreak === 1 ? 'day' : 'days',
        },
    ];

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
                position: 'fixed',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                zIndex: 10,
                justifyContent: 'center',
                maxWidth: '90%',
            }}
        >
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <motion.div
                        key={stat.label}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="glass"
                        style={{
                            padding: '1rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            minWidth: '140px',
                            flex: '0 1 auto',
                        }}
                    >
                        <Icon size={24} style={{ opacity: 0.7 }} />
                        <div>
                            <div
                                style={{
                                    fontSize: '0.75rem',
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    marginBottom: '0.25rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                }}
                            >
                                {stat.label}
                            </div>
                            <div
                                style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 600,
                                    fontFamily: 'var(--font-display)',
                                }}
                            >
                                {stat.value}{' '}
                                {stat.suffix && (
                                    <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                                        {stat.suffix}
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

export default Stats;
