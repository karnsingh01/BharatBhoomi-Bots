import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const detectionHistory = pgTable("detection_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  imagePath: text("image_path").notNull(),
  disease: text("disease").notNull(),
  malayalam: text("malayalam").notNull(),
  confidence: integer("confidence").notNull(),
  severity: text("severity").notNull(),
  treatment: text("treatment").notNull(),
  malayalamTreatment: text("malayalam_treatment").notNull(),
  urgency: text("urgency").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const marketPrices = pgTable("market_prices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  cropName: text("crop_name").notNull(),
  malayalam: text("malayalam").notNull(),
  price: real("price").notNull(),
  unit: text("unit").notNull(),
  market: text("market").notNull(),
  district: text("district").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const weatherData = pgTable("weather_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  location: text("location").notNull(),
  district: text("district").notNull(),
  temperature: real("temperature").notNull(),
  humidity: real("humidity").notNull(),
  rainfall: real("rainfall").notNull(),
  windSpeed: real("wind_speed").notNull(),
  condition: text("condition").notNull(),
  advisory: text("advisory"),
  malayalamAdvisory: text("malayalam_advisory"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDetectionSchema = createInsertSchema(detectionHistory).omit({
  id: true,
  createdAt: true,
});

export const insertMarketPriceSchema = createInsertSchema(marketPrices).omit({
  id: true,
  updatedAt: true,
});

export const insertWeatherSchema = createInsertSchema(weatherData).omit({
  id: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type DetectionHistory = typeof detectionHistory.$inferSelect;
export type InsertDetection = z.infer<typeof insertDetectionSchema>;
export type MarketPrice = typeof marketPrices.$inferSelect;
export type InsertMarketPrice = z.infer<typeof insertMarketPriceSchema>;
export type WeatherData = typeof weatherData.$inferSelect;
export type InsertWeather = z.infer<typeof insertWeatherSchema>;