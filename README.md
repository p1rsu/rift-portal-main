# Rift-Notifier

A clean, minimalist web application for tracking Space-Time Rift spawns in Aion 2. Built with Vite + React, featuring a futuristic portal/galaxy aesthetic.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?logo=vite)

## Features

### Core Functionality
- **Real-time Server Clock** - Displays current server time (KST or user-selected timezone)
- **Rift Schedule Tracking** - Shows all upcoming Rift spawn times (every 3 hours: 2:00, 5:00, 8:00, 11:00, etc.)
- **Live Countdown Timer** - Real-time countdown to the next Rift opening
- **Active Rift Alerts** - Visual and audio notifications when a Rift portal opens

### Notification System
- **Customizable Pre-Rift Alerts** - Set notifications for 5, 10, 15, or 30 minutes before spawn
- **Browser Notifications** - Enable/disable desktop notifications
- **Custom Alert Sounds** - Choose between default sound or upload custom MP3/YouTube link
- **Visual Portal Effects** - Pulsing, glowing portal animation when Rift is active

### Design Elements
- **Minimalist UI** - Clean, uncluttered interface with essential information only
- **Space Theme** - Deep space colors (navy, purple, black) with neon accents
- **Smooth Animations** - Subtle fade-ins, gentle pulses, and glowing effects
- **Responsive Layout** - Works seamlessly on desktop and mobile devices

## Design Specifications

### Color Palette
```css
Background: #0a0e1a (deep space black)
Primary: #1e2337 (navy)
Secondary: #2d1b4e (deep purple)
Accent: #00d4ff (cyan glow)
Highlight: #b84fff (neon purple)
Text: #e8e9ed (off-white)
```

### Typography
- **Font Family**: Inter, Poppins, or Space Grotesk
- **Style**: Clean sans-serif with generous spacing
- **Hierarchy**: Clear contrast between headers and body text

### Components Style
- **Cards**: Rounded corners (12-16px radius), subtle shadow/glow
- **Buttons**: Rounded, hover states with glow effect
- **Portal Graphic**: Circular, centered, with gradient glow
- **Spacing**: Generous padding and margins for breathing room

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or Bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rift-portal-main.git
cd rift-portal-main
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
# or
yarn build
# or
bun run build
```

The optimized files will be in the `dist/` directory.

## 📋 Project Structure

```
RIFT-PORTAL-MAIN/
├── public/
│   ├── favicon.ico              # App favicon
│   ├── placeholder.svg          # Placeholder assets
│   └── robots.txt               # SEO robots file
├── src/
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   ├── NavLink.tsx          # Navigation link component
│   │   ├── NotificationSettings.tsx  # Alert preferences & settings
│   │   ├── Portal.tsx           # Central portal animation/graphic
│   │   ├── RiftAlert.tsx        # Active "RIFT IS OPEN!" banner
│   │   ├── RiftScheduleCard.tsx # Schedule display & countdown timer
│   │   └── ServerTimeHeader.tsx # Top bar with server time display
│   ├── hooks/
│   │   ├── use-mobile.tsx       # Mobile detection hook
│   │   ├── use-toast.ts         # Toast notification hook
│   │   └── useRiftTimer.ts      # Rift timing & countdown logic
│   ├── lib/
│   │   └── utils.ts             # Utility functions & helpers
│   ├── pages/                   # Application pages/routes
│   ├── App.css                  # Main app styles
│   ├── App.tsx                  # Root component
│   ├── index.css                # Global styles & CSS variables
│   ├── main.tsx                 # App entry point
│   └── vite-env.d.ts            # Vite TypeScript definitions
├── .gitignore
├── bun.lockb                    # Bun lock file
├── components.json              # shadcn/ui components config
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML entry point
├── package-lock.json
├── package.json                 # Dependencies & scripts
├── postcss.config.js            # PostCSS configuration
├── README.md                    # This file
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.app.json            # TypeScript app config
├── tsconfig.json                # TypeScript base config
├── tsconfig.node.json           # TypeScript Node config
└── vite.config.ts               # Vite configuration
```

## 🔧 Configuration

### Rift Schedule
Rifts spawn every 3 hours starting at:
- 02:00 (2 AM)
- 05:00 (5 AM)
- 08:00 (8 AM)
- 11:00 (11 AM)
- 14:00 (2 PM)
- 17:00 (5 PM)
- 20:00 (8 PM)
- 23:00 (11 PM)

### Notification Settings
Users can configure:
- **Enable/Disable Notifications**: Toggle browser notifications on/off
- **Pre-Rift Warning Time**: 5, 10, 15, or 30 minutes before spawn
- **Alert Sound Options**:
  - Default sound (built-in)
  - Custom MP3 upload
  - YouTube link for custom alert

### Browser Permissions
The app requires permission for:
- **Notifications**: To send desktop alerts
- **Audio Autoplay**: For alert sounds (user must interact with page first)

## Technologies Used

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite 5+
- **Styling**: Tailwind CSS with PostCSS
- **UI Components**: shadcn/ui
- **State Management**: React Hooks (useState, useEffect, custom hooks)
- **Notifications**: Web Notifications API
- **Audio**: Web Audio API / HTML5 Audio
- **Time Management**: JavaScript Date object / Intl API
- **Package Manager**: npm / Bun

## Usage

1. **First Visit**: Grant notification permissions when prompted
2. **Check Schedule**: View all upcoming Rift spawn times in the schedule card
3. **Set Alerts**: Toggle notifications on and choose your preferred warning time
4. **Customize Sound**: Select default sound or add your own MP3/YouTube link
5. **Monitor Countdown**: Watch the live countdown to the next Rift
6. **Active Rift**: When a Rift opens, the portal pulses and displays "RIFT IS OPEN!"

## Notification Behavior

### Pre-Rift Warning
- Triggers X minutes before Rift spawn (based on user setting)
- Desktop notification with "Rift opening soon!" message
- Optional custom sound plays

### Active Rift Alert
- Triggers exactly at spawn time
- Portal graphic pulses with bright neon glow
- Banner appears: "RIFT IS OPEN!"
- "Go to Rift" button becomes prominent
- Alert sound plays (if enabled)

## Customization

### Changing Theme Colors
Edit `tailwind.config.ts` or `src/index.css`:
```css
/* In index.css */
:root {
  --bg-primary: #0a0e1a;
  --bg-secondary: #1e2337;
  --accent-cyan: #00d4ff;
  --accent-purple: #b84fff;
  /* Add more custom colors */
}
```

Or update Tailwind theme colors in `tailwind.config.ts`:
```typescript
export default {
  theme: {
    extend: {
      colors: {
        'space-black': '#0a0e1a',
        'space-navy': '#1e2337',
        'neon-cyan': '#00d4ff',
        'neon-purple': '#b84fff',
      }
    }
  }
}
```

### Adding Custom Fonts
1. Place font files in `public/fonts/` or import from Google Fonts
2. Update `tailwind.config.ts` fontFamily
3. Apply in components via className

### Modifying Rift Schedule
Edit `src/hooks/useRiftTimer.ts`:
```typescript
export const RIFT_SPAWN_HOURS = [2, 5, 8, 11, 14, 17, 20, 23];
export const RIFT_INTERVAL_HOURS = 3;
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Aion 2 Space-Time Rift mechanics
- Portal design influenced by sci-fi aesthetics
- Built for the Aion community

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Discord: https.pears

---