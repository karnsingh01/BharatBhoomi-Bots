// API utilities for Kerala Farming Assistant

export async function detectPest(imageFile: File): Promise<any> {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await fetch('/api/detect-pest', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to analyze image');
  }
  
  return response.json();
}

export async function getMarketPrices(district?: string): Promise<any[]> {
  const url = district 
    ? `/api/market-prices?district=${encodeURIComponent(district)}`
    : '/api/market-prices/latest';
    
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch market prices');
  }
  
  return response.json();
}

export async function getWeatherData(district?: string): Promise<any> {
  const url = district 
    ? `/api/weather?district=${encodeURIComponent(district)}`
    : '/api/weather';
    
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  return response.json();
}

export async function getCropAdvice(cropType: string, issue: string): Promise<{ advice: string }> {
  const response = await fetch('/api/crop-advice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cropType, issue }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to get crop advice');
  }
  
  return response.json();
}

export async function getDetectionHistory(userId: string): Promise<any[]> {
  const response = await fetch(`/api/detections/${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch detection history');
  }
  
  return response.json();
}

export async function checkApiHealth(): Promise<any> {
  const response = await fetch('/api/health');
  
  if (!response.ok) {
    throw new Error('API health check failed');
  }
  
  return response.json();
}