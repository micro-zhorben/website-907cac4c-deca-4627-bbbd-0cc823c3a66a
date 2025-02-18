import { Star, ThermometerSun } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CoffeeCardProps {
  coffee: {
    name: string;
    description: string;
    roastLevel: string;
    intensity: number;
    origin: string;
    price: number;
    rating: number;
  };
  onSelect: () => void;
}

export function CoffeeCard({ coffee, onSelect }: CoffeeCardProps) {
  return (
    <Card className="w-full max-w-sm transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{coffee.name}</CardTitle>
            <CardDescription className="mt-1">{coffee.origin}</CardDescription>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-4 w-4 text-accent" />
            {coffee.rating.toFixed(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Typography.P>{coffee.description}</Typography.P>
        
        <div className="flex items-center gap-2">
          <ThermometerSun className="h-4 w-4 text-primary" />
          <Typography.Small>
            {coffee.roastLevel} Roast · {coffee.intensity}% Intensity
          </Typography.Small>
        </div>

        <div className="flex items-center justify-between">
          <Typography.Large className="font-bold">
            ${coffee.price.toFixed(2)}
          </Typography.Large>
          <Button onClick={onSelect} variant="outline" className="text-foreground">
            Select This Coffee
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}