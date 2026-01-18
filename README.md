# Aura-Pomodoro ⏱️✨

<div align="center">
  <img src="public/product image.png" alt="Aura-Pomodoro Preview" width="800">
  
  <p><strong>A beautiful ambient workspace with a Pomodoro timer and dynamic aura themes</strong></p>
  
  [![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://your-deployed-url.vercel.app)
  [![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
</div>

---

## 🌟 Features

### ⏱️ **Pomodoro Timer**
- Customizable focus sessions (default: 25 minutes)
- Short breaks (default: 5 minutes)
- Long breaks after 4 sessions (default: 15 minutes)
- Visual progress bar
- Pause, resume, and skip functionality

### 🎨 **Dynamic Aura Themes**
Choose from 5 beautiful ambient background themes:
- **Purple Dreams** - Deep purple to indigo gradient
- **Ocean Waves** - Blue to orange ocean vibes
- **Sunset Bliss** - Pink to cyan sunset colors
- **Forest Zen** - Lime to purple nature tones
- **Midnight Blue** - Dark blue to golden night sky

Each theme features:
- Animated mesh gradients
- Pulsing effects when timer is active
- Floating ambient orbs for depth
- Smooth color transitions

### 🔊 **Audio Feedback**
- Start sound when timer begins
- Pause sound when timer is paused
- Completion sound when phase ends
- Toggle sounds on/off in settings

### 📊 **Statistics Tracking**
- Today's completed Pomodoros
- Total focus time
- Current streak counter
- Daily history (last 7 days)
- All data persists in localStorage

### ⚙️ **Customization**
- Adjust timer durations for all phases
- Switch between aura themes instantly
- Enable/disable sounds and notifications
- Auto-start options for breaks and Pomodoros
- Settings persist across sessions

### ⌨️ **Keyboard Shortcuts**
- `Space` - Play/Pause timer
- `R` - Reset timer
- `N` - Skip to next phase
- `S` - Open settings
- `Esc` - Close modals

### 🔔 **Browser Notifications**
Get notified when each phase completes, even when the tab is in the background.

### 📝 **Task Notes**
Quick input field to note what you're working on during focus sessions.

### 🎭 **Glassmorphic Design**
- Frosted glass UI components
- Backdrop blur effects
- Soft neon glows
- Dark mode optimized
- Smooth Framer Motion animations

---

## 🚀 Tech Stack

- **React 19** - Modern UI framework
- **Vite 7** - Lightning-fast build tool
- **Zustand** - Lightweight state management
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **CSS3** - Glassmorphism and gradients

---

## 📦 Installation

### Prerequisites
- Node.js 18+ (recommended: v20 LTS)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Aura-Pomodoro.git
   cd Aura-Pomodoro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173/
   ```

---

## 🎯 Usage

### Starting a Pomodoro Session
1. Click the **Play** button or press `Space`
2. Focus on your task for 25 minutes
3. Take a 5-minute break when the timer completes
4. After 4 focus sessions, enjoy a longer 15-minute break

### Customizing Settings
1. Click the **Settings** icon (gear) in the top-right
2. Adjust timer durations
3. Change aura theme
4. Toggle sounds and notifications
5. Enable auto-start options

### Viewing Statistics
Check the bottom of the screen for:
- **Today** - Sessions completed today
- **Focus Time** - Total time spent focusing
- **Streak** - Consecutive days with completed sessions

---

## 🎨 Screenshots

<div align="center">
  <img src="public/product image.png" alt="Default Purple Dreams Theme" width="400">
  <p><em>Default Purple Dreams Theme with Active Timer</em></p>
</div>

---

## 🏗️ Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

---

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite and deploy

### Netlify
1. Build the project: `npm run build`
2. Drag the `dist` folder to [Netlify](https://netlify.com)

### Other Static Hosts
Upload the contents of the `dist/` folder to any static hosting service.

---

## 🎵 Adding Custom Sounds

The application uses three sound files in `public/sounds/`:
- `complete.mp3` - Plays when timer completes
- `running.mp3` - Plays when timer starts
- `pause.mp3` - Plays when timer is paused

To customize:
1. Replace any sound file with your own
2. Keep the same filename
3. Recommended: 1-3 second MP3 files

**Free sound resources:**
- [Freesound.org](https://freesound.org/)
- [Zapsplat.com](https://www.zapsplat.com/)
- [Mixkit.co](https://mixkit.co/free-sound-effects/)

---

## 🗂️ Project Structure

```
Aura-Pomodoro/
├── public/
│   ├── favicon.svg          # App icon
│   ├── logo.svg             # Logo for header
│   ├── product image.png    # Preview image
│   └── sounds/              # Audio files
│       ├── complete.mp3
│       ├── running.mp3
│       └── pause.mp3
├── src/
│   ├── components/          # React components
│   │   ├── AuraBackground.jsx
│   │   ├── Timer.jsx
│   │   ├── Controls.jsx
│   │   ├── Settings.jsx
│   │   ├── Stats.jsx
│   │   └── TaskInput.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useTimer.js
│   │   └── useKeyboardShortcuts.js
│   ├── store/               # Zustand state stores
│   │   ├── timerStore.js
│   │   ├── settingsStore.js
│   │   └── statsStore.js
│   ├── utils/               # Helper functions
│   │   ├── colors.js
│   │   └── notifications.js
│   ├── styles/              # CSS files
│   │   ├── index.css
│   │   └── animations.css
│   ├── App.jsx              # Main component
│   └── main.jsx             # Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Inspired by the Pomodoro Technique® by Francesco Cirillo
- Design inspired by modern glassmorphism trends
- Built with ❤️ using React and Vite

---

## 📞 Contact

Questions or feedback? Feel free to reach out!

---

<div align="center">
  <strong>Made with 💜 by [Your Name]</strong>
  <br>
  <sub>Boost your productivity with beautiful ambient vibes</sub>
</div>
