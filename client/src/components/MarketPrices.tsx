import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, IndianRupee, MapPin, Clock } from "lucide-react";
import marketImage from "@assets/generated_images/Kerala_vegetable_market_prices_1534c02e.png";

interface CropPrice {
  name: string;
  malayalam: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  market: string;
  lastUpdated: string;
}

interface MarketPricesProps {
  prices?: CropPrice[];
}

export default function MarketPrices({ prices }: MarketPricesProps) {
  // Mock data - todo: remove mock functionality
  const cropPrices: CropPrice[] = prices || [
    {
      name: "Rice (Raw)",
      malayalam: "അരി",
      currentPrice: 45,
      previousPrice: 42,
      unit: "kg",
      trend: "up",
      market: "Alappuzha Krishi Bhavan",
      lastUpdated: "2 hours ago"
    },
    {
      name: "Coconut",
      malayalam: "തേങ്ങ",
      currentPrice: 28,
      previousPrice: 30,
      unit: "piece",
      trend: "down",
      market: "Kochi Wholesale Market",
      lastUpdated: "1 hour ago"
    },
    {
      name: "Black Pepper",
      malayalam: "കുരുമുളക്",
      currentPrice: 580,
      previousPrice: 575,
      unit: "kg",
      trend: "up",
      market: "Idukki Spice Market",
      lastUpdated: "30 min ago"
    },
    {
      name: "Rubber Sheets",
      malayalam: "റബ്ബർ ഷീറ്റ്",
      currentPrice: 165,
      previousPrice: 165,
      unit: "kg",
      trend: "stable",
      market: "Kottayam Rubber Board",
      lastUpdated: "1 hour ago"
    },
    {
      name: "Cardamom",
      malayalam: "ഏലക്ക",
      currentPrice: 1240,
      previousPrice: 1200,
      unit: "kg",
      trend: "up",
      market: "Thekkady Spice Auction",
      lastUpdated: "45 min ago"
    },
    {
      name: "Ginger",
      malayalam: "ഇഞ്ചി",
      currentPrice: 85,
      previousPrice: 90,
      unit: "kg",
      trend: "down",
      market: "Wayanad Market",
      lastUpdated: "1.5 hours ago"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 border-2 border-gray-400 rounded-full" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriceChange = (current: number, previous: number) => {
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(1);
    return { change, percentage };
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-md">
            <IndianRupee className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Market Prices</h3>
            <p className="text-sm text-muted-foreground">Real-time crop prices across Kerala</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => console.log('Refresh prices')}
          data-testid="button-refresh-prices"
        >
          <Clock className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Market Image */}
      <div className="relative rounded-lg overflow-hidden">
        <img 
          src={marketImage} 
          alt="Kerala vegetable market"
          className="w-full h-32 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-3 text-white">
          <p className="text-sm font-medium">Live from Kerala Markets</p>
        </div>
      </div>

      {/* Price Grid */}
      <div className="grid gap-4">
        {cropPrices.map((crop, index) => (
          <Card key={index} className="p-4 hover-elevate">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground">{crop.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {crop.malayalam}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{crop.market}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Clock className="w-3 h-3" />
                  <span>Updated {crop.lastUpdated}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-bold text-foreground">
                    ₹{crop.currentPrice}
                  </span>
                  <span className="text-sm text-muted-foreground">/{crop.unit}</span>
                </div>
                
                <div className="flex items-center gap-1 justify-end">
                  {getTrendIcon(crop.trend)}
                  {crop.trend !== 'stable' && (
                    <span className={`text-sm font-medium ${getTrendColor(crop.trend)}`}>
                      ₹{Math.abs(getPriceChange(crop.currentPrice, crop.previousPrice).change)}
                      ({getPriceChange(crop.currentPrice, crop.previousPrice).percentage}%)
                    </span>
                  )}
                  {crop.trend === 'stable' && (
                    <span className="text-sm text-gray-600">No change</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Price Alerts */}
      <div className="p-4 bg-accent/10 rounded-lg">
        <h4 className="font-medium text-foreground mb-2">Price Alert Suggestions</h4>
        <p className="text-sm text-muted-foreground mb-2">
          Cardamom prices up 3.3% - consider selling if you have stock.
        </p>
        <p className="text-sm text-muted-foreground">
          ഏലക്കയുടെ വില 3.3% വർധിച്ചു - സ്റ്റോക്ക് ഉണ്ടെങ്കിൽ വിൽക്കുന്നത് പരിഗണിക്കുക.
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-3"
          onClick={() => console.log('Set price alert')}
          data-testid="button-set-alert"
        >
          Set Price Alert
        </Button>
      </div>
    </Card>
  );
}