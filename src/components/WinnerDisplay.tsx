import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Download, Share2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface WinnerDisplayProps {
  winners: string[];
  totalContestants: number;
  onRestart: () => void;
}

export const WinnerDisplay = ({ winners, totalContestants, onRestart }: WinnerDisplayProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [winners]);

  const handleExport = () => {
    const data = winners.map((winner, index) => `${index + 1}. ${winner}`).join("\n");
    const blob = new Blob([`Contest Winners:\n\n${data}\n\nTotal Contestants: ${totalContestants}`], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contest-winners.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const text = `🎉 Contest Winners Announced!\n\n${winners.map((winner, index) => `${index + 1}. ${winner}`).join("\n")}\n\nCongratulations to all winners! 🏆`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(text);
      }
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-2 h-2 confetti-animation",
                i % 3 === 0 ? "bg-accent" : i % 3 === 1 ? "bg-primary" : "bg-secondary"
              )}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <Card className="shadow-celebration gradient-card animate-pulse-celebration">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="w-16 h-16 text-accent animate-float" />
          </div>
          <CardTitle className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            🎉 We Have {winners.length > 1 ? "Winners" : "a Winner"}! 🎉
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            {winners.map((winner, index) => (
              <div key={index} className="flex items-center justify-center space-x-3">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  #{index + 1}
                </Badge>
                <div className="text-xl font-semibold">{winner}</div>
              </div>
            ))}
          </div>

          <div className="text-center text-muted-foreground">
            Selected from {totalContestants} contestants
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="celebration" onClick={handleExport}>
              <Download className="w-4 h-4" />
              Export Results
            </Button>
            <Button variant="secondary" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
              Share Winners
            </Button>
            <Button variant="outline" onClick={onRestart}>
              <RotateCcw className="w-4 h-4" />
              New Contest
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};