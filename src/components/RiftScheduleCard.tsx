import { Clock } from "lucide-react";

interface RiftScheduleCardProps {
  nextRiftTime: Date;
  countdown: string;
  isRiftOpen: boolean;
  use24Hour: boolean;
}

const RIFT_HOURS = [2, 5, 8, 11, 14, 17, 20, 23];

const formatTime = (hour: number, use24Hour: boolean) => {
  if (use24Hour) {
    return `${String(hour).padStart(2, '0')}:00`;
  }
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:00 ${period}`;
};

const RiftScheduleCard = ({ nextRiftTime, countdown, isRiftOpen, use24Hour }: RiftScheduleCardProps) => {
  const currentHour = nextRiftTime.getHours();

  return (
    <div className="glass-card p-6 w-full max-w-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-semibold text-foreground">Space-Time Rift Schedule</h2>
      </div>

      {/* Schedule grid */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {RIFT_HOURS.map((hour) => {
          const isNext = hour === currentHour && !isRiftOpen;
          const isNow = isRiftOpen && hour === currentHour;
          
          return (
            <div
              key={hour}
              className={`
                px-2 py-2 rounded-lg text-center text-sm font-digital font-medium transition-all duration-300
                ${isNow
                  ? "bg-accent text-accent-foreground neon-border"
                  : isNext
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-secondary/50 text-muted-foreground"
                }
              `}
            >
              {formatTime(hour, use24Hour)}
            </div>
          );
        })}
      </div>

      {/* Countdown section */}
      <div className="border-t border-border/50 pt-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
          {isRiftOpen ? "Rift Closes In" : "Next Rift Opens In"}
        </p>
        <div className={`text-3xl font-digital font-bold tracking-wider ${isRiftOpen ? "text-accent neon-text" : "text-foreground"}`}>
          {countdown}
        </div>
      </div>
    </div>
  );
};

export default RiftScheduleCard;
