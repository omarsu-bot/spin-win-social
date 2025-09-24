import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface ContestSetupProps {
  selectedPlatform: string;
  onStartContest: (config: ContestConfig) => void;
}

export interface ContestConfig {
  postUrl: string;
  numberOfWinners: number;
  minimumMentions: number;
  noDuplicateComments: boolean;
  noDuplicateMentions: boolean;
}

export const ContestSetup = ({ selectedPlatform, onStartContest }: ContestSetupProps) => {
  const [config, setConfig] = useState<ContestConfig>({
    postUrl: "",
    numberOfWinners: 1,
    minimumMentions: 0,
    noDuplicateComments: true,
    noDuplicateMentions: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (config.postUrl.trim()) {
      onStartContest(config);
    }
  };

  const platformPlaceholders = {
    Facebook: "https://facebook.com/post/...",
    Instagram: "https://instagram.com/p/...",
    TikTok: "https://tiktok.com/@user/video/...",
    YouTube: "https://youtube.com/watch?v=..."
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-card">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          Set Up Your {selectedPlatform} Contest
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="postUrl">Post/Video URL</Label>
            <Input
              id="postUrl"
              type="url"
              placeholder={platformPlaceholders[selectedPlatform as keyof typeof platformPlaceholders]}
              value={config.postUrl}
              onChange={(e) => setConfig({ ...config, postUrl: e.target.value })}
              required
            />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="winners">Number of Winners</Label>
              <Input
                id="winners"
                type="number"
                min="1"
                max="50"
                value={config.numberOfWinners}
                onChange={(e) => setConfig({ ...config, numberOfWinners: parseInt(e.target.value) || 1 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mentions">Minimum Mentions Required</Label>
              <Input
                id="mentions"
                type="number"
                min="0"
                max="10"
                value={config.minimumMentions}
                onChange={(e) => setConfig({ ...config, minimumMentions: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Contest Rules</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>No Duplicate Comments</Label>
                <div className="text-sm text-muted-foreground">
                  Exclude multiple comments from the same user
                </div>
              </div>
              <Switch
                checked={config.noDuplicateComments}
                onCheckedChange={(checked) => setConfig({ ...config, noDuplicateComments: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>No Duplicate Mentions</Label>
                <div className="text-sm text-muted-foreground">
                  Each mentioned user can only be counted once per comment
                </div>
              </div>
              <Switch
                checked={config.noDuplicateMentions}
                onCheckedChange={(checked) => setConfig({ ...config, noDuplicateMentions: checked })}
              />
            </div>
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full">
            Start Contest
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};