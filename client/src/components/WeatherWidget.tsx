import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Droplets, Wind, Thermometer, CloudRain, Sun } from "lucide-react";
import { getWeatherData } from "@/lib/api";

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
  forecast: Array<{
    day: string;
    condition: string;
    temp: number;
    rain: number;
  }>;
}

interface WeatherWidgetProps {
  data?: WeatherData;
}

export default function WeatherWidget({ data }: WeatherWidgetProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setWeatherData(data);
      setLoading(false);
    } else {
      // Fetch weather data from API
      getWeatherData("Alappuzha")
        .then((result) => {
          let weather;
          if (Array.isArray(result) && result.length > 0) {
            weather = result[0];
          } else if (result && typeof result === 'object') {
            weather = result;
          }
          
          if (weather) {
            setWeatherData({
              location: weather.location,
              temperature: weather.temperature,
              humidity: weather.humidity,
              rainfall: weather.rainfall,
              windSpeed: weather.windSpeed,
              condition: weather.condition,
              forecast: [
                { day: "Today", condition: "Heavy Rain", temp: weather.temperature, rain: 85 },
                { day: "Tomorrow", condition: "Cloudy", temp: weather.temperature + 2, rain: 20 },
                { day: "Day 3", condition: "Sunny", temp: weather.temperature + 4, rain: 5 },
                { day: "Day 4", condition: "Light Rain", temp: weather.temperature + 1, rain: 45 }
              ]
            });
          }
        })
        .catch((error) => {
          console.error('Failed to fetch weather:', error);
          // Fallback to mock data
          setWeatherData({
            location: "Kuttanad, Alappuzha",
            temperature: 28,
            humidity: 85,
            rainfall: 15,
            windSpeed: 12,
            condition: "Monsoon Alert",
            forecast: [
              { day: "Today", condition: "Heavy Rain", temp: 28, rain: 85 },
              { day: "Tomorrow", condition: "Cloudy", temp: 30, rain: 20 },
              { day: "Day 3", condition: "Sunny", temp: 32, rain: 5 },
              { day: "Day 4", condition: "Light Rain", temp: 29, rain: 45 }
            ]
          });
        })
        .finally(() => setLoading(false));
    }
  }, [data]);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-20 bg-muted rounded"></div>
        </div>
      </Card>
    );
  }

  if (!weatherData) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground">Weather data unavailable</p>
      </Card>
    );
  }

  const getWeatherIcon = (condition: string) => {
    if (condition.includes("Rain")) return <CloudRain className="w-5 h-5" />;
    if (condition.includes("Sunny")) return <Sun className="w-5 h-5" />;
    return <Cloud className="w-5 h-5" />;
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Weather Advisory</h3>
          <p className="text-sm text-muted-foreground">{weatherData.location}</p>
        </div>
        <Badge variant="destructive" data-testid="badge-weather-alert">
          {weatherData.condition}
        </Badge>
      </div>

      {/* Current Weather */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-primary" />
          <div>
            <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
            <div className="text-xs text-muted-foreground">Temperature</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-blue-500" />
          <div>
            <div className="text-2xl font-bold">{weatherData.humidity}%</div>
            <div className="text-xs text-muted-foreground">Humidity</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CloudRain className="w-4 h-4 text-blue-600" />
          <div>
            <div className="text-2xl font-bold">{weatherData.rainfall}mm</div>
            <div className="text-xs text-muted-foreground">Rainfall</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-gray-500" />
          <div>
            <div className="text-2xl font-bold">{weatherData.windSpeed}</div>
            <div className="text-xs text-muted-foreground">km/h Wind</div>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="space-y-2">
        <h4 className="font-medium text-foreground">4-Day Forecast</h4>
        <div className="grid grid-cols-4 gap-2">
          {weatherData.forecast.map((day, index) => (
            <Card key={index} className="p-3 text-center hover-elevate">
              <div className="text-xs text-muted-foreground mb-1">{day.day}</div>
              <div className="flex justify-center mb-2">
                {getWeatherIcon(day.condition)}
              </div>
              <div className="text-sm font-medium">{day.temp}°C</div>
              <div className="text-xs text-blue-600">{day.rain}% rain</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Irrigation Advice */}
      <div className="p-4 bg-primary/5 rounded-lg">
        <h4 className="font-medium text-primary mb-2">Irrigation Advice</h4>
        <p className="text-sm text-muted-foreground">
          Heavy rainfall expected. Delay irrigation for rice paddies. Check drainage systems.
        </p>
        <p className="text-sm text-muted-foreground mt-1 font-medium">
          കനത്ത മഴ പ്രതീക്ഷിക്കുന്നു. നെൽവയലുകളിൽ ജലസേചനം നിർത്തുക.
        </p>
      </div>
    </Card>
  );
}