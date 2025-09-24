import { useState } from "react";
import { Hero } from "@/components/Hero";
import { PlatformCard } from "@/components/PlatformCard";
import { ContestSetup, ContestConfig } from "@/components/ContestSetup";
import { SpinWheel } from "@/components/SpinWheel";
import { WinnerDisplay } from "@/components/WinnerDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

type AppStep = "hero" | "platform" | "setup" | "contest" | "results";

const platforms = [
  {
    name: "Facebook",
    icon: FaFacebook,
    color: "text-blue-600",
    description: "Run contests on Facebook posts and get engagement"
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    color: "text-pink-600",
    description: "Pick winners from Instagram post comments"
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    color: "text-black",
    description: "Engage your TikTok audience with fun contests"
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    color: "text-red-600",
    description: "Select winners from YouTube video comments"
  }
];

// Mock data for demo purposes
const generateMockContestants = (count: number = 25) => {
  const names = [
    "Alex Johnson", "Sarah Chen", "Mike Rodriguez", "Emma Wilson", "David Kim",
    "Jessica Taylor", "Ryan O'Connor", "Lisa Zhang", "Chris Anderson", "Maria Garcia",
    "Jason Lee", "Amanda Brown", "Kevin Wu", "Rachel Green", "Tyler Smith",
    "Sophia Martinez", "Brandon Davis", "Olivia Johnson", "Justin Park", "Nicole White",
    "Austin Miller", "Isabella Lopez", "Nathan Kumar", "Zoe Thompson", "Marcus Wright"
  ];
  
  return names.slice(0, count).map((name, index) => `${name}_${index + 1}`);
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>("hero");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [contestConfig, setContestConfig] = useState<ContestConfig | null>(null);
  const [contestants, setContestants] = useState<string[]>([]);
  const [winners, setWinners] = useState<string[]>([]);

  const handleGetStarted = () => {
    setCurrentStep("platform");
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
  };

  const handleStartContest = (config: ContestConfig) => {
    setContestConfig(config);
    // Generate mock contestants for demo
    const mockContestants = generateMockContestants(Math.floor(Math.random() * 20) + 15);
    setContestants(mockContestants);
    setCurrentStep("contest");
  };

  const handleWinnerSelected = (winner: string) => {
    const newWinners = [...winners, winner];
    setWinners(newWinners);
    
    if (newWinners.length >= (contestConfig?.numberOfWinners || 1)) {
      setCurrentStep("results");
    }
  };

  const handleRestart = () => {
    setCurrentStep("hero");
    setSelectedPlatform("");
    setContestConfig(null);
    setContestants([]);
    setWinners([]);
  };

  const handleBack = () => {
    switch (currentStep) {
      case "platform":
        setCurrentStep("hero");
        break;
      case "setup":
        setCurrentStep("platform");
        setSelectedPlatform("");
        break;
      case "contest":
        setCurrentStep("setup");
        setContestants([]);
        break;
      case "results":
        setCurrentStep("contest");
        setWinners([]);
        break;
    }
  };

  if (currentStep === "hero") {
    return <Hero onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen gradient-card">
      {/* Header with Back Button */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-2xl font-bold">Spinwin</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentStep === "platform" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Choose Your Platform</h1>
              <p className="text-xl text-muted-foreground">
                Which social media platform do you want to run your contest on?
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platforms.map((platform) => (
                <PlatformCard
                  key={platform.name}
                  platform={platform}
                  selected={selectedPlatform === platform.name}
                  onClick={handlePlatformSelect}
                />
              ))}
            </div>

            {selectedPlatform && (
              <div className="text-center">
                <Button 
                  variant="hero" 
                  size="lg" 
                  onClick={() => setCurrentStep("setup")}
                  className="text-lg px-8 py-4"
                >
                  Continue with {selectedPlatform}
                </Button>
              </div>
            )}
          </div>
        )}

        {currentStep === "setup" && (
          <div className="space-y-8">
            <ContestSetup 
              selectedPlatform={selectedPlatform} 
              onStartContest={handleStartContest} 
            />
          </div>
        )}

        {currentStep === "contest" && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Ready to Pick Winners!</h1>
              <p className="text-xl text-muted-foreground">
                We found {contestants.length} contestants. Spin the wheel to select your winner{contestConfig?.numberOfWinners && contestConfig.numberOfWinners > 1 ? 's' : ''}!
              </p>
              {winners.length > 0 && (
                <p className="text-lg">
                  Winners selected: {winners.length} of {contestConfig?.numberOfWinners || 1}
                </p>
              )}
            </div>
            
            <SpinWheel 
              contestants={contestants} 
              onWinnerSelected={handleWinnerSelected} 
            />
          </div>
        )}

        {currentStep === "results" && (
          <WinnerDisplay 
            winners={winners} 
            totalContestants={contestants.length}
            onRestart={handleRestart} 
          />
        )}
      </main>
    </div>
  );
};

export default Index;
