// Browser notification utilities

let notificationPermission = 'default';

// Request notification permission
export const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
        console.log('This browser does not support notifications');
        return false;
    }

    if (Notification.permission === 'granted') {
        notificationPermission = 'granted';
        return true;
    }

    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        notificationPermission = permission;
        return permission === 'granted';
    }

    return false;
};

// Send a notification
export const sendNotification = (title, options = {}) => {
    if (!('Notification' in window)) {
        return null;
    }

    if (Notification.permission === 'granted') {
        const notification = new Notification(title, {
            icon: '/favicon.svg',
            badge: '/favicon.svg',
            vibrate: [200, 100, 200],
            tag: 'aura-sync',
            renotify: true,
            ...options,
        });

        // Auto-close notification after 5 seconds
        setTimeout(() => {
            notification.close();
        }, 5000);

        return notification;
    }

    return null;
};

// Specific notification types
export const notifyFocusComplete = () => {
    return sendNotification('Focus Session Complete! 🎯', {
        body: 'Great work! Time for a well-deserved break.',
        tag: 'focus-complete',
    });
};

export const notifyBreakComplete = () => {
    return sendNotification('Break Time Over! ⚡', {
        body: "Ready to get back to work? Let's crush it!",
        tag: 'break-complete',
    });
};

export const notifyLongBreakComplete = () => {
    return sendNotification('Long Break Complete! 🌟', {
        body: "You've completed multiple focus sessions. Amazing job!",
        tag: 'long-break-complete',
    });
};

export default {
    requestNotificationPermission,
    sendNotification,
    notifyFocusComplete,
    notifyBreakComplete,
    notifyLongBreakComplete,
};
