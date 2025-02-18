import { useState } from "react";
import { Coffee, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface CoffeeRecommendationFormProps {
  onSubmit: (preferences: CoffeePreferences) => Promise<void>;
}

interface CoffeePreferences {
  roastLevel: string;
  intensity: number;
  type: string;
}

export function CoffeeRecommendationForm({
  onSubmit,
}: CoffeeRecommendationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<CoffeePreferences>({
    roastLevel: "",
    intensity: 50,
    type: "",
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmit(preferences);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coffee className="h-6 w-6 text-primary" />
          <Typography.H2>Coffee Preferences</Typography.H2>
        </CardTitle>
        <CardDescription>
          Tell us your preferences and let AI find your perfect coffee match
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Typography.P>Roast Level</Typography.P>
          <Select
            value={preferences.roastLevel}
            onValueChange={(value) =>
              setPreferences({ ...preferences, roastLevel: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select roast level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light Roast</SelectItem>
              <SelectItem value="medium">Medium Roast</SelectItem>
              <SelectItem value="dark">Dark Roast</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Typography.P>Intensity Preference</Typography.P>
          <Slider
            value={[preferences.intensity]}
            onValueChange={([value]) =>
              setPreferences({ ...preferences, intensity: value })
            }
            max={100}
            step={1}
            className="py-4"
          />
          <Typography.Muted className="text-center">
            {preferences.intensity}% Intensity
          </Typography.Muted>
        </div>

        <div className="space-y-2">
          <Typography.P>Coffee Type</Typography.P>
          <Select
            value={preferences.type}
            onValueChange={(value) =>
              setPreferences({ ...preferences, type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select coffee type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="espresso">Espresso</SelectItem>
              <SelectItem value="filter">Filter Coffee</SelectItem>
              <SelectItem value="coldbrew">Cold Brew</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={isLoading || !preferences.roastLevel || !preferences.type}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting Recommendations...
            </>
          ) : (
            "Get Coffee Recommendations"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}