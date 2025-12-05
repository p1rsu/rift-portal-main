import { cn } from "@/lib/utils";

interface PortalProps {
  isActive: boolean;
}

const Portal = ({ isActive }: PortalProps) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings */}
      <div
        className={cn(
          "absolute w-72 h-72 rounded-full opacity-20 blur-3xl transition-all duration-1000",
          isActive ? "bg-neon-cyan scale-110" : "bg-primary scale-100"
        )}
      />
      <div
        className={cn(
          "absolute w-56 h-56 rounded-full opacity-30 blur-2xl transition-all duration-700",
          isActive ? "bg-neon-pink" : "bg-portal-ring"
        )}
      />

      {/* Portal container */}
      <div
        className={cn(
          "relative w-48 h-48 rounded-full transition-all duration-500",
          isActive ? "animate-portal-active" : "animate-portal-idle"
        )}
      >
        {/* Outer ring */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border-2 transition-colors duration-500",
            isActive ? "border-neon-cyan" : "border-primary/50"
          )}
        />

        {/* Middle ring */}
        <div
          className={cn(
            "absolute inset-3 rounded-full border transition-colors duration-500",
            isActive ? "border-neon-pink/70" : "border-portal-ring/40"
          )}
        />

        {/* Inner portal */}
        <div
          className={cn(
            "absolute inset-6 rounded-full transition-all duration-500",
            isActive
              ? "bg-gradient-to-br from-neon-cyan via-primary to-neon-pink"
              : "bg-gradient-to-br from-primary/80 via-portal-core/60 to-portal-glow/40"
          )}
        >
          {/* Core glow */}
          <div
            className={cn(
              "absolute inset-4 rounded-full blur-sm transition-all duration-500",
              isActive
                ? "bg-neon-cyan/60"
                : "bg-portal-glow/30"
            )}
          />

          {/* Center point */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center",
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full blur-md transition-all duration-500",
                isActive ? "bg-white" : "bg-portal-glow/50"
              )}
            />
          </div>
        </div>

        {/* Rotating particles */}
        {isActive && (
          <>
            <div className="absolute inset-0 rounded-full animate-spin" style={{ animationDuration: '3s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-neon-cyan rounded-full blur-sm" />
            </div>
            <div className="absolute inset-0 rounded-full animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-neon-pink rounded-full blur-sm" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Portal;
