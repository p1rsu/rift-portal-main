import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RiftAlertProps {
  isVisible: boolean;
}

const RiftAlert = ({ isVisible }: RiftAlertProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="glass-card rift-open-glow px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-neon-cyan animate-pulse" />
          <div>
            <p className="text-lg font-bold text-foreground neon-text">RIFT IS OPEN!</p>
            <p className="text-xs text-muted-foreground">Space-Time portal is active</p>
          </div>
        </div>
        <Button 
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6"
        >
          Go to Rift
        </Button>
      </div>
    </div>
  );
};

export default RiftAlert;
