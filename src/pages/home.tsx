import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Typography } from "@/components/ui/typography";
import { CoffeeRecommendationForm } from "@/components/coffee-recommendation-form";
import { CoffeeCard } from "@/components/coffee-card";
import { RecommendationSkeleton } from "@/components/recommendation-skeleton";
import { useToast } from "@/components/ui/use-toast";

interface CoffeeRecommendation {
  name: string;
  description: string;
  roastLevel: string;
  intensity: number;
  origin: string;
  price: number;
  rating: number;
}

const mockRecommendation: CoffeeRecommendation = {
  name: "Ethiopian Yirgacheffe",
  description: "A bright and complex coffee with floral notes, bergamot, and a delicate citrus finish. Perfect for those who appreciate nuanced flavors.",
  roastLevel: "Light",
  intensity: 65,
  origin: "Yirgacheffe, Ethiopia",
  price: 18.99,
  rating: 4.8,
};

export function Home() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<CoffeeRecommendation | null>(null);

  const handleGetRecommendation = async (preferences: any) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setRecommendation(mockRecommendation);
    setIsLoading(false);
  };

  const handleSelectCoffee = () => {
    toast({
      title: "Coffee Selected!",
      description: "Your perfect coffee match has been saved to your preferences.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <header className="container mx-auto flex items-center justify-between py-6">
        <div>
          <Typography.H1 className="text-primary">AI Coffee Recommender</Typography.H1>
          <Typography.Lead className="mt-2">
            Find your perfect coffee match with AI
          </Typography.Lead>
        </div>
        <ModeToggle />
      </header>

      <main className="container mx-auto py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <section className="flex items-center justify-center">
            <CoffeeRecommendationForm onSubmit={handleGetRecommendation} />
          </section>

          <section className="flex items-center justify-center">
            {isLoading ? (
              <RecommendationSkeleton />
            ) : recommendation ? (
              <CoffeeCard coffee={recommendation} onSelect={handleSelectCoffee} />
            ) : (
              <div className="text-center">
                <Typography.H3 className="mb-2">
                  Ready to find your perfect brew?
                </Typography.H3>
                <Typography.Muted>
                  Fill out your preferences and let our AI find the ideal coffee for you.
                </Typography.Muted>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="container mx-auto py-6">
        <Typography.Muted className="text-center">
          Powered by AI · Crafted with ♥ for Coffee Lovers
        </Typography.Muted>
      </footer>
    </div>
  );
}