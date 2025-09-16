import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Cloud, 
  Leaf, 
  TrendingUp, 
  Droplets, 
  Gift, 
  MessageCircle,
  TestTube,
  Phone
} from "lucide-react";

interface Feature {
  id: string;
  title: string;
  malayalam: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

export default function FeatureCards() {
  // Feature data - todo: remove mock functionality
  const features: Feature[] = [
    {
      id: "weather",
      title: "Weather Advisory",
      malayalam: "കാലാവസ്ഥ മുന്നറിയിപ്പ്",
      description: "Hyperlocal weather predictions and monsoon alerts for better crop planning.",
      icon: <Cloud className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      id: "pest",
      title: "Disease Detection",
      malayalam: "രോഗ നിർണയം",
      description: "AI-powered pest and disease identification with organic treatment suggestions.",
      icon: <Leaf className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950"
    },
    {
      id: "market",
      title: "Market Intelligence",
      malayalam: "വിപണി വിവരങ്ങൾ",
      description: "Real-time crop prices and best selling opportunities across Kerala markets.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950"
    },
    {
      id: "irrigation",
      title: "Smart Irrigation",
      malayalam: "ബുദ്ധിപരമായ ജലസേചനം",
      description: "Water requirement forecasts and irrigation scheduling based on crop needs.",
      icon: <Droplets className="w-6 h-6" />,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      id: "soil",
      title: "Soil Analysis",
      malayalam: "മണ്ണ് വിശകലനം",
      description: "Soil type analysis and crop-specific fertilizer recommendations for Kerala soils.",
      icon: <TestTube className="w-6 h-6" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950"
    },
    {
      id: "schemes",
      title: "Government Schemes",
      malayalam: "സർക്കാർ പദ്ധതികൾ",
      description: "Personalized notifications for Kerala farming schemes and subsidy applications.",
      icon: <Gift className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950"
    },
    {
      id: "whatsapp",
      title: "WhatsApp Support",
      malayalam: "വാട്സ്ആപ്പ് സഹായം",
      description: "Get farming advice and updates directly through WhatsApp in Malayalam.",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950"
    },
    {
      id: "helpline",
      title: "Expert Helpline",
      malayalam: "വിദഗ്ധ സഹായ ലൈൻ",
      description: "Direct access to agricultural experts and government extension officers.",
      icon: <Phone className="w-6 h-6" />,
      color: "text-primary",
      bgColor: "bg-primary/5"
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    console.log(`Feature clicked: ${featureId}`);
  };

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-[Poppins]">
            Complete Farming Solution
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything Kerala farmers need - from weather alerts to market prices, all in Malayalam
          </p>
          <p className="text-lg text-muted-foreground mt-2 font-medium">
            കേരള കർഷകർക്ക് ആവശ്യമുള്ളതെല്ലാം
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card 
              key={feature.id} 
              className="p-6 hover-elevate cursor-pointer transition-all duration-200"
              onClick={() => handleFeatureClick(feature.id)}
              data-testid={`card-feature-${feature.id}`}
            >
              <div className="space-y-4">
                <div className={`p-3 ${feature.bgColor} rounded-lg w-fit`}>
                  <div className={feature.color}>
                    {feature.icon}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-primary font-medium">{feature.malayalam}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start p-0 h-auto text-primary hover:text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeatureClick(feature.id);
                  }}
                >
                  Learn More →
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Farming?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Join thousands of Kerala farmers already using AI to boost their crop yields and income.
            </p>
            <p className="text-primary font-medium mb-6">
              നിങ്ങളുടെ കൃഷിയെ പരിവർത്തനം ചെയ്യാൻ തയാറാണോ?
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => console.log('Get started clicked')}
                data-testid="button-get-started"
              >
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => console.log('Watch demo clicked')}
                data-testid="button-watch-demo"
              >
                Watch Demo
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}