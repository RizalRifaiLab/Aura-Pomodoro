import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useTimerStore from '../store/timerStore';
import useSettingsStore from '../store/settingsStore';

const TaskInput = () => {
    const { currentTask, setCurrentTask } = useTimerStore();
    const { showTaskInput } = useSettingsStore();
    const [localTask, setLocalTask] = useState(currentTask);

    useEffect(() => {
        setLocalTask(currentTask);
    }, [currentTask]);

    const handleBlur = () => {
        setCurrentTask(localTask);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    };

    if (!showTaskInput) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'fixed',
                    top: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    width: 'calc(100% - 500px)', // Leave space for logo (300px) and settings (200px)
                    minWidth: '300px',
                    maxWidth: '600px',
                }}
            >
                <div className="glass" style={{ padding: '0.75rem 1.5rem' }}>
                    <input
                        type="text"
                        value={localTask}
                        onChange={(e) => setLocalTask(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        placeholder="What are you working on?"
                        style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: 'white',
                            fontSize: '1rem',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 500,
                        }}
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default TaskInput;
