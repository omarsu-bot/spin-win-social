import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PlatformCardProps {
  platform: {
    name: string;
    icon: string;
    color: string;
    description: string;
  };
  selected: boolean;
  onClick: (platform: string) => void;
}

export const PlatformCard = ({ platform, selected, onClick }: PlatformCardProps) => {
  return (
    <Card
      className={cn(
        "p-6 cursor-pointer transition-all duration-200 hover:scale-105 shadow-card",
        "border-2 hover:shadow-primary",
        selected ? "border-primary shadow-primary" : "border-border"
      )}
      onClick={() => onClick(platform.name)}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={cn("text-4xl", platform.color)}>
          {platform.icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{platform.name}</h3>
          <p className="text-muted-foreground text-sm">{platform.description}</p>
        </div>
      </div>
    </Card>
  );
};