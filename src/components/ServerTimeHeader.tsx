import { Globe } from "lucide-react";
import { useEffect } from "react";

interface ServerTimeHeaderProps {
  serverTime: Date;
  timezone: string;
  use24Hour: boolean;
}

const ServerTimeHeader = ({ serverTime, timezone, use24Hour }: ServerTimeHeaderProps) => {
  const formattedTime = serverTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !use24Hour,
  });

  const formattedDate = serverTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  // Fade-out effect
  useEffect(() => {
    const header = document.getElementById("fade-header");
    if (!header) return;

    const handleScroll = () => {
      const maxScroll = 100; 
      const opacity = Math.max(1 - window.scrollY / maxScroll, 0);
      header.style.opacity = opacity.toString();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="fade-header"
      className="sticky top-0 w-full py-4 px-6 flex items-center justify-between border-b border-border/30 bg-card/30 backdrop-blur-sm transition-opacity duration-300 z-50"
    >
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Rift Notifier</h1>
        </div>
      </div>

      {/* Center logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <img
          src="https://tinyurl.com/2s3jzp3e"
          alt="Rift Portal Logo"
          className="h-20 w-auto object-contain"
        />
      </div>

      <div className="flex items-center gap-2 text-right">
        <div>
          <p className="text-lg font-digital font-bold text-foreground tracking-wider">
            {formattedTime}
          </p>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/50">
          <Globe className="w-3 h-3 text-accent" />
          <span className="text-xs font-medium text-accent">{timezone}</span>
        </div>
      </div>
    </header>
  );
};

export default ServerTimeHeader;
