import { 
  type User, 
  type InsertUser, 
  type DetectionHistory, 
  type InsertDetection,
  type MarketPrice,
  type InsertMarketPrice,
  type WeatherData,
  type InsertWeather
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Detection history methods
  saveDetection(detection: InsertDetection): Promise<DetectionHistory>;
  getUserDetections(userId: string): Promise<DetectionHistory[]>;
  getDetection(id: string): Promise<DetectionHistory | undefined>;
  
  // Market price methods
  saveMarketPrice(price: InsertMarketPrice): Promise<MarketPrice>;
  getMarketPrices(district?: string): Promise<MarketPrice[]>;
  getLatestPrices(): Promise<MarketPrice[]>;
  
  // Weather data methods
  saveWeatherData(weather: InsertWeather): Promise<WeatherData>;
  getWeatherData(district: string): Promise<WeatherData | undefined>;
  getLatestWeather(): Promise<WeatherData[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private detections: Map<string, DetectionHistory>;
  private marketPrices: Map<string, MarketPrice>;
  private weatherData: Map<string, WeatherData>;

  constructor() {
    this.users = new Map();
    this.detections = new Map();
    this.marketPrices = new Map();
    this.weatherData = new Map();
    
    // Initialize with some mock market data
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock market prices for Kerala crops
    const mockPrices: InsertMarketPrice[] = [
      {
        cropName: "Rice (Raw)",
        malayalam: "അരി",
        price: 45,
        unit: "kg",
        market: "Alappuzha Krishi Bhavan",
        district: "Alappuzha"
      },
      {
        cropName: "Coconut",
        malayalam: "തേങ്ങ",
        price: 28,
        unit: "piece",
        market: "Kochi Wholesale Market",
        district: "Ernakulam"
      },
      {
        cropName: "Black Pepper",
        malayalam: "കുരുമുളക്",
        price: 580,
        unit: "kg",
        market: "Idukki Spice Market",
        district: "Idukki"
      },
      {
        cropName: "Rubber Sheets",
        malayalam: "റബ്ബർ ഷീറ്റ്",
        price: 165,
        unit: "kg",
        market: "Kottayam Rubber Board",
        district: "Kottayam"
      },
      {
        cropName: "Cardamom",
        malayalam: "ഏലക്ക",
        price: 1240,
        unit: "kg",
        market: "Thekkady Spice Auction",
        district: "Idukki"
      },
      {
        cropName: "Ginger",
        malayalam: "ഇഞ്ചി",
        price: 85,
        unit: "kg",
        market: "Wayanad Market",
        district: "Wayanad"
      }
    ];

    mockPrices.forEach(price => {
      this.saveMarketPrice(price);
    });

    // Mock weather data
    const mockWeather: InsertWeather[] = [
      {
        location: "Kuttanad, Alappuzha",
        district: "Alappuzha",
        temperature: 28,
        humidity: 85,
        rainfall: 15,
        windSpeed: 12,
        condition: "Monsoon Alert",
        advisory: "Heavy rainfall expected. Delay irrigation for rice paddies. Check drainage systems.",
        malayalamAdvisory: "കനത്ത മഴ പ്രതീക്ഷിക്കുന്നു. നെൽവയലുകളിൽ ജലസേചനം നിർത്തുക."
      },
      {
        location: "Idukki Hills",
        district: "Idukki",
        temperature: 22,
        humidity: 90,
        rainfall: 25,
        windSpeed: 8,
        condition: "Heavy Rain",
        advisory: "Perfect conditions for spice cultivation. Monitor for fungal diseases.",
        malayalamAdvisory: "സുഗന്ധവ്യഞ്ജന കൃഷിക്ക് അനുകൂല സാഹചര്യം. കുമിൾ രോഗങ്ങൾക്ക് ജാഗ്രത."
      }
    ];

    mockWeather.forEach(weather => {
      this.saveWeatherData(weather);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Detection methods
  async saveDetection(insertDetection: InsertDetection): Promise<DetectionHistory> {
    const id = randomUUID();
    const detection: DetectionHistory = {
      ...insertDetection,
      userId: insertDetection.userId || null,
      id,
      createdAt: new Date()
    };
    this.detections.set(id, detection);
    return detection;
  }

  async getUserDetections(userId: string): Promise<DetectionHistory[]> {
    return Array.from(this.detections.values())
      .filter(detection => detection.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getDetection(id: string): Promise<DetectionHistory | undefined> {
    return this.detections.get(id);
  }

  // Market price methods
  async saveMarketPrice(insertPrice: InsertMarketPrice): Promise<MarketPrice> {
    const id = randomUUID();
    const price: MarketPrice = {
      ...insertPrice,
      id,
      updatedAt: new Date()
    };
    this.marketPrices.set(id, price);
    return price;
  }

  async getMarketPrices(district?: string): Promise<MarketPrice[]> {
    const prices = Array.from(this.marketPrices.values());
    if (district) {
      return prices.filter(price => price.district === district);
    }
    return prices;
  }

  async getLatestPrices(): Promise<MarketPrice[]> {
    return Array.from(this.marketPrices.values())
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  // Weather methods
  async saveWeatherData(insertWeather: InsertWeather): Promise<WeatherData> {
    const id = randomUUID();
    const weather: WeatherData = {
      ...insertWeather,
      advisory: insertWeather.advisory || null,
      malayalamAdvisory: insertWeather.malayalamAdvisory || null,
      id,
      updatedAt: new Date()
    };
    this.weatherData.set(id, weather);
    return weather;
  }

  async getWeatherData(district: string): Promise<WeatherData | undefined> {
    return Array.from(this.weatherData.values())
      .find(weather => weather.district === district);
  }

  async getLatestWeather(): Promise<WeatherData[]> {
    return Array.from(this.weatherData.values())
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }
}

export const storage = new MemStorage();