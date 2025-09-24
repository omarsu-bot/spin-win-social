import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SpinWheelProps {
  contestants: string[];
  onWinnerSelected: (winner: string) => void;
}

export const SpinWheel = ({ contestants, onWinnerSelected }: SpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (isSpinning || contestants.length === 0) return;

    setIsSpinning(true);
    
    // Random rotation between 1800-3600 degrees (5-10 full rotations)
    const newRotation = rotation + 1800 + Math.random() * 1800;
    setRotation(newRotation);

    // Select winner after spin completes
    setTimeout(() => {
      const winnerIndex = Math.floor(Math.random() * contestants.length);
      const winner = contestants[winnerIndex];
      onWinnerSelected(winner);
      setIsSpinning(false);
    }, 3000);
  };

  const segmentAngle = 360 / contestants.length;

  return (
    <div className="flex flex-col items-center space-y-8">
      <Card className="p-8 shadow-card">
        <div className="relative">
          <div
            ref={wheelRef}
            className={cn(
              "relative w-80 h-80 rounded-full border-8 border-primary overflow-hidden",
              "spin-wheel"
            )}
            style={{
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(${contestants
                .map((_, index) => {
                  const hue = (index * 360) / contestants.length;
                  return `hsl(${hue} 70% 60%) ${index * segmentAngle}deg ${(index + 1) * segmentAngle}deg`;
                })
                .join(", ")})`
            }}
          >
            {contestants.map((contestant, index) => (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm"
                style={{
                  transform: `rotate(${index * segmentAngle + segmentAngle / 2}deg)`,
                  transformOrigin: "center"
                }}
              >
                <div
                  className="absolute"
                  style={{
                    transform: `translateY(-120px) rotate(-${index * segmentAngle + segmentAngle / 2}deg)`,
                  }}
                >
                  {contestant.length > 15 ? `${contestant.substring(0, 12)}...` : contestant}
                </div>
              </div>
            ))}
          </div>
          
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary"></div>
          </div>
        </div>
      </Card>

      <Button
        variant="hero"
        size="lg"
        onClick={spinWheel}
        disabled={isSpinning || contestants.length === 0}
        className="text-lg px-8 py-4"
      >
        {isSpinning ? "Spinning..." : "Spin to Win!"}
      </Button>
    </div>
  );
};