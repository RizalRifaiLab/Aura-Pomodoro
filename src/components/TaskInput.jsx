import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Lock } from 'lucide-react';
import useTimerStore from '../store/timerStore';
import useSettingsStore from '../store/settingsStore';

const TaskInput = () => {
    const { currentTask, setCurrentTask, isTaskLocked, lockTask, deleteTask, start } = useTimerStore();
    const { showTaskInput } = useSettingsStore();
    const [localTask, setLocalTask] = useState(currentTask);

    useEffect(() => {
        setLocalTask(currentTask);
    }, [currentTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (localTask.trim() && !isTaskLocked) {
            setCurrentTask(localTask);
            lockTask();
            start(); // Auto-start timer when task is locked
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !isTaskLocked) {
            handleSubmit(e);
        }
    };

    const handleDelete = () => {
        deleteTask();
        setLocalTask('');
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
                    width: 'calc(100% - 500px)',
                    minWidth: '300px',
                    maxWidth: '600px',
                }}
            >
                <div className="glass" style={{
                    padding: '0.75rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                }}>
                    {isTaskLocked && (
                        <Lock
                            size={18}
                            style={{
                                color: '#8B5CF6',
                                flexShrink: 0
                            }}
                        />
                    )}

                    <input
                        type="text"
                        value={localTask}
                        onChange={(e) => !isTaskLocked && setLocalTask(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="What are you working on?"
                        disabled={isTaskLocked}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: isTaskLocked ? '#a0a0a0' : 'white',
                            fontSize: '1rem',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 500,
                            cursor: isTaskLocked ? 'not-allowed' : 'text',
                        }}
                    />

                    {isTaskLocked && (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            onClick={handleDelete}
                            className="glass-button"
                            style={{
                                width: '36px',
                                height: '36px',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                flexShrink: 0,
                            }}
                            aria-label="Delete task"
                        >
                            <Trash2 size={18} style={{ color: '#EF4444' }} />
                        </motion.button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default TaskInput;
