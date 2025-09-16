import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Camera, Cloud, TrendingUp } from "lucide-react";
import heroImage from "@assets/generated_images/Kerala_farmer_with_smartphone_8bfe8592.png";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground font-[Poppins]">
                Kerala Farming
                <span className="text-primary block">Assistant</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                AI-powered farming guidance in Malayalam. Boost crop yield, prevent diseases, and access fair market prices.
              </p>
              <p className="text-lg text-muted-foreground font-medium">
                കേരള കർഷകർക്കുള്ള AI സഹായി
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="gap-2" 
                data-testid="button-voice-assistant"
                onClick={() => console.log('Voice assistant activated')}
              >
                <Mic className="w-5 h-5" />
                Voice Assistant
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2"
                data-testid="button-camera-scan"
                onClick={() => console.log('Camera scan activated')}
              >
                <Camera className="w-5 h-5" />
                Scan Disease
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <Card className="p-4 hover-elevate">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <Cloud className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">98%</div>
                    <div className="text-sm text-muted-foreground">Weather Accuracy</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4 hover-elevate">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">25%</div>
                    <div className="text-sm text-muted-foreground">Yield Increase</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right side - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Kerala farmer using smartphone in coconut grove"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}