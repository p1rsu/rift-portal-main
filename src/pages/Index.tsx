import { useState, useEffect } from "react";
import ServerTimeHeader from "@/components/ServerTimeHeader";
import Portal from "@/components/Portal";
import RiftScheduleCard from "@/components/RiftScheduleCard";
import NotificationSettings from "@/components/NotificationSettings";
import RiftAlert from "@/components/RiftAlert";
import { useRiftTimer } from "@/hooks/useRiftTimer";

const Index = () => {
  const { serverTime, nextRiftTime, countdown, isRiftOpen, timezone } = useRiftTimer();
  
  // Notification settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [preRiftMinutes, setPreRiftMinutes] = useState(10);
  const [soundType, setSoundType] = useState<"default" | "custom">("default");
  const [customSoundUrl, setCustomSoundUrl] = useState("");
  const [use24Hour, setUse24Hour] = useState(true);
  const [volume, setVolume] = useState(50);
  const [developerMode, setDeveloperMode] = useState(false);

  // Request notification permission when enabled
  useEffect(() => {
    if (notificationsEnabled && "Notification" in window) {
      Notification.requestPermission();
    }
  }, [notificationsEnabled]);

  // Play notification sound
  const playNotificationSound = () => {
    if (soundType === "default") {
      // Play default sound using Web Audio API
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      const volumeLevel = volume / 100 * 0.3;
      gainNode.gain.setValueAtTime(volumeLevel, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } else if (soundType === "custom" && customSoundUrl) {
      // Play custom sound
      const audio = new Audio(customSoundUrl);
      audio.volume = volume / 100;
      audio.play().catch((error) => {
        console.error("Error playing custom sound:", error);
      });
    }
  };

  // Test notification handler for developer mode
  const handleTestNotification = () => {
    // Show browser notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Rift Opening Soon!", {
        body: `The Rift will open in ${preRiftMinutes} minute${preRiftMinutes !== 1 ? 's' : ''}!`,
        icon: "/placeholder.svg",
      });
    } else if ("Notification" in window) {
      alert("Please allow notifications first!");
    }

    // Play sound
    playNotificationSound();
  };

  // Test rift open notification handler for developer mode
  const handleTestRiftOpenNotification = () => {
    // Show browser notification
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Rift is Now Open!", {
        body: "The Rift has opened! Enter now!",
        icon: "/placeholder.svg",
      });
    } else if ("Notification" in window) {
      alert("Please allow notifications first!");
    }

    // Play sound
    playNotificationSound();
  };

  // Track previous rift state to detect when it opens
  const [wasRiftOpen, setWasRiftOpen] = useState(false);

  // Trigger notification when rift opens
  useEffect(() => {
    if (notificationsEnabled && isRiftOpen && !wasRiftOpen) {
      // Rift just opened - trigger notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Rift is Now Open!", {
          body: "The Rift has opened! Enter now!",
          icon: "/placeholder.svg",
        });
      }

      // Play sound
      playNotificationSound();
    }

    setWasRiftOpen(isRiftOpen);
  }, [isRiftOpen, notificationsEnabled, wasRiftOpen]);

  // Trigger notification before rift opens
  useEffect(() => {
    if (!notificationsEnabled || isRiftOpen) return;

    const checkNotification = () => {
      const now = new Date();
      const timeUntilRift = nextRiftTime.getTime() - now.getTime();
      const minutesUntilRift = Math.floor(timeUntilRift / 1000 / 60);

      // Trigger notification at the exact pre-rift time
      if (minutesUntilRift === preRiftMinutes && timeUntilRift % 60000 < 1000) {
        handleTestNotification();
      }
    };

    const interval = setInterval(checkNotification, 1000);
    return () => clearInterval(interval);
  }, [notificationsEnabled, isRiftOpen, nextRiftTime, preRiftMinutes, soundType, customSoundUrl, volume]);

  return (
    <div className="min-h-screen flex flex-col">
      <ServerTimeHeader serverTime={serverTime} timezone={timezone} use24Hour={use24Hour} />
      
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 gap-8">
        {/* Portal section */}
        <section className="flex flex-col items-center gap-4 animate-fade-in">
          <Portal isActive={isRiftOpen} />
          
          {isRiftOpen && (
            <div className="text-center animate-fade-in">
              <p className="text-xl font-bold text-accent neon-text">
                RIFT IS OPEN!
              </p>
              <p className="text-sm text-muted-foreground">
                Space-Time portal is active now
              </p>
            </div>
          )}
        </section>

        {/* Schedule and Settings */}
        <section className="w-full max-w-md flex flex-col gap-6">
          <RiftScheduleCard
            nextRiftTime={nextRiftTime}
            countdown={countdown}
            isRiftOpen={isRiftOpen}
            use24Hour={use24Hour}
          />

          <NotificationSettings
            notificationsEnabled={notificationsEnabled}
            setNotificationsEnabled={setNotificationsEnabled}
            preRiftMinutes={preRiftMinutes}
            setPreRiftMinutes={setPreRiftMinutes}
            soundType={soundType}
            setSoundType={setSoundType}
            customSoundUrl={customSoundUrl}
            setCustomSoundUrl={setCustomSoundUrl}
            use24Hour={use24Hour}
            setUse24Hour={setUse24Hour}
            volume={volume}
            setVolume={setVolume}
            developerMode={developerMode}
            setDeveloperMode={setDeveloperMode}
            onTestNotification={handleTestNotification}
            onTestRiftOpenNotification={handleTestRiftOpenNotification}
          />
        </section>
      </main>

      {/* Floating alert when rift is open */}
      <RiftAlert isVisible={isRiftOpen} />
    </div>
  );
};

export default Index;
