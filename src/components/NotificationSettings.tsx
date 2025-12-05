import { Bell, Volume2, Clock, Link, Play } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

interface NotificationSettingsProps {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  preRiftMinutes: number;
  setPreRiftMinutes: (minutes: number) => void;
  soundType: "default" | "custom";
  setSoundType: (type: "default" | "custom") => void;
  customSoundUrl: string;
  setCustomSoundUrl: (url: string) => void;
  use24Hour: boolean;
  setUse24Hour: (use24Hour: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  developerMode: boolean;
  setDeveloperMode: (developerMode: boolean) => void;
  onTestNotification: () => void;
  onTestRiftOpenNotification: () => void;
}

const NotificationSettings = ({
  notificationsEnabled,
  setNotificationsEnabled,
  preRiftMinutes,
  setPreRiftMinutes,
  soundType,
  setSoundType,
  customSoundUrl,
  setCustomSoundUrl,
  use24Hour,
  setUse24Hour,
  volume,
  setVolume,
  developerMode,
  setDeveloperMode,
  onTestNotification,
  onTestRiftOpenNotification,
}: NotificationSettingsProps) => {
  const [isPlayingDefault, setIsPlayingDefault] = useState(false);
  const [isPlayingCustom, setIsPlayingCustom] = useState(false);

  // Default notification sound (using a system beep or web audio)
  const playDefaultSound = () => {
    setIsPlayingDefault(true);
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioContext = new AudioContextClass();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    // Apply volume (volume is 0-100, convert to 0-1)
    const volumeLevel = volume / 100 * 0.3;
    gainNode.gain.setValueAtTime(volumeLevel, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);

    setTimeout(() => setIsPlayingDefault(false), 500);
  };

  // Play custom sound
  const playCustomSound = () => {
    if (!customSoundUrl) return;

    // Check if it's a YouTube URL
    const isYouTube = customSoundUrl.includes('youtube.com') || customSoundUrl.includes('youtu.be');

    if (isYouTube) {
      alert("YouTube links cannot be tested directly in the browser. Please use a direct audio file URL (MP3, WAV, OGG) instead. You can use services like Freesound.org, upload to a cloud storage, or use direct links to audio files.");
      return;
    }

    setIsPlayingCustom(true);
    const audio = new Audio(customSoundUrl);

    // Apply volume (volume is 0-100, convert to 0-1)
    audio.volume = volume / 100;

    audio.play().catch((error) => {
      console.error("Error playing custom sound:", error);
      setIsPlayingCustom(false);
      alert("Could not play the custom sound. Please use a direct link to an audio file (MP3, WAV, OGG).");
    });

    audio.onended = () => setIsPlayingCustom(false);
    audio.onerror = () => {
      setIsPlayingCustom(false);
      alert("Error loading custom sound. Please make sure the URL is a direct link to an audio file (MP3, WAV, OGG).");
    };

    // Auto-stop after 5 seconds for long sounds
    setTimeout(() => {
      if (!audio.paused) {
        audio.pause();
        setIsPlayingCustom(false);
      }
    }, 5000);
  };

  return (
    <div
      className="glass-card p-6 w-full max-w-md animate-slide-up"
      style={{ animationDelay: "0.4s" }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-semibold text-foreground">
          Notification Settings
        </h2>
      </div>

      {/* Time format toggle */}
      <div className="flex items-center justify-between py-3 border-b border-border/30">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Time Format</p>
            <p className="text-xs text-muted-foreground">
              {use24Hour ? "24-hour (Military)" : "12-hour (AM/PM)"}
            </p>
          </div>
        </div>
        <Switch
          checked={use24Hour}
          onCheckedChange={setUse24Hour}
          className="data-[state=checked]:bg-accent [&>span]:bg-[hsl(var(--switch-indicator))]"
        />
      </div>

      {/* Enable notifications toggle */}
      <div className="flex items-center justify-between py-3 border-b border-border/30">
        <div>
          <p className="text-sm font-medium text-foreground">
            Enable Notifications
          </p>
          <p className="text-xs text-muted-foreground">
            Get alerts before Rift opens
          </p>
        </div>
        <Switch
          checked={notificationsEnabled}
          onCheckedChange={setNotificationsEnabled}
          className="data-[state=checked]:bg-accent [&>span]:bg-[hsl(var(--switch-indicator))]"
        />
      </div>

      {/* Pre-rift notification timing */}
      <div className="py-4 border-b border-border/30">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-foreground">Pre-Rift Alert</p>
          <span className="text-sm text-accent font-semibold">
            {preRiftMinutes} min
          </span>
        </div>
        <Slider
          value={[preRiftMinutes]}
          onValueChange={(value) => setPreRiftMinutes(value[0])}
          min={5}
          max={30}
          step={1}
          disabled={!notificationsEnabled}
          className="w-full [&_.bg-primary]:bg-accent [&_[role=slider]]:bg-[hsl(var(--silder-indicator))] [&_[role=slider]]:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>5 min</span>
          <span>30 min</span>
        </div>
      </div>

      {/* Volume control */}
      <div className="py-4 border-b border-border/30">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-foreground">Volume</p>
          <span className="text-sm text-accent font-semibold">
            {volume}%
          </span>
        </div>
        <Slider
          value={[volume]}
          onValueChange={(value) => setVolume(value[0])}
          min={0}
          max={100}
          step={1}
          disabled={!notificationsEnabled}
          className="w-full [&_.bg-primary]:bg-accent [&_[role=slider]]:bg-[hsl(var(--silder-indicator))] [&_[role=slider]]:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Sound settings */}
      <div className="py-4">
        <div className="flex items-center gap-2 mb-4">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Alert Sound</p>
        </div>

        <RadioGroup
          value={soundType}
          onValueChange={(value) => setSoundType(value as "default" | "custom")}
          disabled={!notificationsEnabled}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="default"
                id="default-sound"
                className="border-muted-foreground data-[state=checked]:border-accent data-[state=checked]:text-accent"
              />
              <Label
                htmlFor="default-sound"
                className="text-sm text-foreground cursor-pointer"
              >
                Use default sound
              </Label>
            </div>
            <button
              type="button"
              onClick={playDefaultSound}
              disabled={!notificationsEnabled || isPlayingDefault}
              className="p-2 rounded-md text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Test sound"
            >
              <Play className={`w-4 h-4 ${isPlayingDefault ? 'animate-pulse text-accent' : ''}`} />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value="custom"
                id="custom-sound"
                className="border-muted-foreground data-[state=checked]:border-accent data-[state=checked]:text-accent"
              />
              <Label
                htmlFor="custom-sound"
                className="text-sm text-foreground cursor-pointer"
              >
                Custom sound
              </Label>
            </div>

            {soundType === "custom" && notificationsEnabled && (
              <div className="ml-6 mt-2">
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Paste direct audio file URL (MP3, WAV, OGG)..."
                    value={customSoundUrl}
                    onChange={(e) => setCustomSoundUrl(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/30"
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">
                    Supports direct MP3/audio URLs
                  </p>
                  <button
                    type="button"
                    onClick={playCustomSound}
                    disabled={!customSoundUrl || isPlayingCustom}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Test sound"
                  >
                    <Play
                      className={`w-4 h-4 ${
                        isPlayingCustom ? "animate-pulse text-accent" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </RadioGroup>
      </div>

      {/* Developer Mode */}
      {/* <div className="pt-4 mt-4 border-t border-border/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-foreground">Developer Mode</p>
            <p className="text-xs text-muted-foreground">
              Enable testing features
            </p>
          </div>
          <Switch
            checked={developerMode}
            onCheckedChange={setDeveloperMode}
            className="data-[state=checked]:bg-accent [&>span]:bg-[hsl(var(--switch-indicator))]"
          />
        </div>

        {developerMode && (
          <div className="space-y-3 animate-fade-in">
            <button
              type="button"
              onClick={onTestNotification}
              disabled={!notificationsEnabled}
              className="w-full py-2 px-4 rounded-md bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 hover:border-accent/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              Test Pre-Rift Notification
            </button>
            <button
              type="button"
              onClick={onTestRiftOpenNotification}
              disabled={!notificationsEnabled}
              className="w-full py-2 px-4 rounded-md bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 hover:border-accent/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              Test Rift Open Notification
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Test notifications with current settings
            </p>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default NotificationSettings;
