import HeroSection from "@/components/HeroSection";
import WeatherWidget from "@/components/WeatherWidget";
import PestDetection from "@/components/PestDetection";
import MarketPrices from "@/components/MarketPrices";
import FeatureCards from "@/components/FeatureCards";
import NavigationBar from "@/components/NavigationBar";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <NavigationBar />
      
      {/* Theme Toggle - Floating */}
      <div className="fixed top-4 right-4 z-50 hidden md:block">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Dashboard Widgets */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <WeatherWidget />
          </div>
          <div className="lg:col-span-1">
            <PestDetection />
          </div>
          <div className="lg:col-span-1">
            <MarketPrices />
          </div>
        </div>

        {/* Features Section */}
        <FeatureCards />
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 mb-20 md:mb-0">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Kerala Farming Assistant</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered agricultural guidance for Kerala farmers in Malayalam.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                കേരള കർഷകർക്കുള്ള AI കൃഷി സഹായി
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Weather Predictions</li>
                <li>Disease Detection</li>
                <li>Market Intelligence</li>
                <li>Government Schemes</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>WhatsApp: +91 xxxxx xxxxx</li>
                <li>Helpline: 1800-xxx-xxxx</li>
                <li>Email: support@keralfarm.in</li>
                <li>Malayalam Support Available</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Kerala Farming Assistant. Empowering farmers with AI technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}