import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzePlantImage, getCropAdvice } from "./openai";
import { insertDetectionSchema, insertMarketPriceSchema, insertWeatherSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Pest Detection API
  app.post('/api/detect-pest', upload.single('image'), async (req: MulterRequest, res) => {
    let tempFilePath: string | undefined;
    
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      tempFilePath = req.file.path;

      // Validate file type
      if (!req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({ error: 'Only image files are allowed' });
      }

      // Convert uploaded file to base64
      const imageBuffer = fs.readFileSync(req.file.path);
      const base64Image = imageBuffer.toString('base64');

      // Check if OpenAI API key is configured
      if (!process.env.OPENAI_API_KEY) {
        return res.status(503).json({ 
          error: 'AI analysis service unavailable', 
          details: 'OpenAI API key not configured' 
        });
      }

      // Analyze with OpenAI
      const result = await analyzePlantImage(base64Image);

      // Save to storage (optional - if user is logged in)
      const userId = req.body.userId; // Would come from session in real app
      if (userId) {
        // Don't save imagePath since we're deleting the temp file
        const detection = await storage.saveDetection({
          userId,
          imagePath: `analysis_${Date.now()}.jpg`, // Placeholder path
          disease: result.disease,
          malayalam: result.malayalam,
          confidence: result.confidence,
          severity: result.severity,
          treatment: result.treatment,
          malayalamTreatment: result.malayalamTreatment,
          urgency: result.urgency,
        });
      }

      res.json(result);
    } catch (error) {
      console.error('Pest detection error:', error);
      
      if (error instanceof Error && error.message.includes('API key')) {
        return res.status(503).json({ 
          error: 'AI analysis service unavailable',
          details: 'Configuration error'
        });
      }
      
      res.status(500).json({ 
        error: 'Failed to analyze image',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      // Always clean up temp file
      if (tempFilePath && fs.existsSync(tempFilePath)) {
        try {
          fs.unlinkSync(tempFilePath);
        } catch (cleanupError) {
          console.error('Failed to cleanup temp file:', cleanupError);
        }
      }
    }
  });

  // Get detection history
  app.get('/api/detections/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const detections = await storage.getUserDetections(userId);
      res.json(detections);
    } catch (error) {
      console.error('Get detections error:', error);
      res.status(500).json({ error: 'Failed to fetch detection history' });
    }
  });

  // Market Prices API
  app.get('/api/market-prices', async (req, res) => {
    try {
      const { district } = req.query;
      const prices = await storage.getMarketPrices(district as string);
      res.json(prices);
    } catch (error) {
      console.error('Market prices error:', error);
      res.status(500).json({ error: 'Failed to fetch market prices' });
    }
  });

  app.get('/api/market-prices/latest', async (req, res) => {
    try {
      const prices = await storage.getLatestPrices();
      res.json(prices);
    } catch (error) {
      console.error('Latest prices error:', error);
      res.status(500).json({ error: 'Failed to fetch latest prices' });
    }
  });

  app.post('/api/market-prices', async (req, res) => {
    try {
      const validatedData = insertMarketPriceSchema.parse(req.body);
      const price = await storage.saveMarketPrice(validatedData);
      res.json(price);
    } catch (error) {
      console.error('Save market price error:', error);
      
      if (error instanceof Error && error.name === 'ZodError') {
        return res.status(400).json({ error: 'Invalid market price data', details: error.message });
      }
      
      res.status(500).json({ error: 'Failed to save market price' });
    }
  });

  // Weather API
  app.get('/api/weather', async (req, res) => {
    try {
      const { district } = req.query;
      if (district) {
        const weather = await storage.getWeatherData(district as string);
        res.json(weather);
      } else {
        const weatherList = await storage.getLatestWeather();
        res.json(weatherList);
      }
    } catch (error) {
      console.error('Weather data error:', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  });

  app.post('/api/weather', async (req, res) => {
    try {
      const validatedData = insertWeatherSchema.parse(req.body);
      const weather = await storage.saveWeatherData(validatedData);
      res.json(weather);
    } catch (error) {
      console.error('Save weather error:', error);
      
      if (error instanceof Error && error.name === 'ZodError') {
        return res.status(400).json({ error: 'Invalid weather data', details: error.message });
      }
      
      res.status(500).json({ error: 'Failed to save weather data' });
    }
  });

  // Crop Advice API
  app.post('/api/crop-advice', async (req, res) => {
    try {
      const { cropType, issue } = req.body;
      
      if (!cropType || !issue) {
        return res.status(400).json({ error: 'cropType and issue are required' });
      }

      const advice = await getCropAdvice(cropType, issue);
      res.json({ advice });
    } catch (error) {
      console.error('Crop advice error:', error);
      res.status(500).json({ error: 'Failed to get crop advice' });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      openai: !!process.env.OPENAI_API_KEY
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}