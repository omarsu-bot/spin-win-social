import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, Trophy, Zap } from "lucide-react";
import heroSpinWheel from "@/assets/hero-spin-wheel.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="min-h-screen gradient-card">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold">Spinwin</span>
          </div>
          <Button variant="outline">Sign In</Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <Badge className="gradient-celebration text-foreground font-semibold px-4 py-2">
            🎉 Fair & Fun Contest Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="gradient-primary bg-clip-text text-transparent">
              Pick Winners
            </span>
            <br />
            From Any Platform
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Run exciting giveaway contests on Facebook, Instagram, TikTok, and YouTube. 
            Let our spin wheel randomly select winners with complete transparency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" onClick={onGetStarted} className="text-lg px-8 py-4">
              Start Your Contest
              <Sparkles className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative mt-12">
            <img 
              src={heroSpinWheel} 
              alt="Spinwin contest platform spin wheel" 
              className="mx-auto rounded-2xl shadow-card max-w-full h-auto animate-float"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <Card className="p-8 text-center shadow-card hover:shadow-primary transition-all duration-200 hover:scale-105">
            <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Multi-Platform Support</h3>
            <p className="text-muted-foreground">
              Connect with Facebook, Instagram, TikTok, and YouTube to run contests on any platform.
            </p>
          </Card>

          <Card className="p-8 text-center shadow-card hover:shadow-primary transition-all duration-200 hover:scale-105">
            <div className="w-16 h-16 gradient-celebration rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Fair Winner Selection</h3>
            <p className="text-muted-foreground">
              Our spinning wheel ensures completely random and transparent winner selection every time.
            </p>
          </Card>

          <Card className="p-8 text-center shadow-card hover:shadow-primary transition-all duration-200 hover:scale-105">
            <div className="w-16 h-16 gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Instant Results</h3>
            <p className="text-muted-foreground">
              Get your contest results immediately with easy export and sharing options.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};