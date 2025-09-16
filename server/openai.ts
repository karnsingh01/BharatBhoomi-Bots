import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which should be used for this application
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface PestDetectionResult {
  disease: string;
  malayalam: string;
  confidence: number;
  severity: 'mild' | 'moderate' | 'severe';
  treatment: string;
  malayalamTreatment: string;
  preventionTips: string[];
  urgency: 'low' | 'medium' | 'high';
}

export async function analyzePlantImage(base64Image: string): Promise<PestDetectionResult> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert agricultural pathologist specializing in Kerala's tropical crop diseases and pests. Analyze plant images and provide detailed diagnosis with treatments suitable for Kerala's climate and farming practices.

Respond in JSON format with this structure:
{
  "disease": "Disease/pest name in English",
  "malayalam": "Disease name in Malayalam",
  "confidence": confidence_score_0_to_100,
  "severity": "mild|moderate|severe",
  "treatment": "Detailed treatment in English",
  "malayalamTreatment": "Treatment description in Malayalam",
  "preventionTips": ["prevention tip 1", "prevention tip 2", "prevention tip 3"],
  "urgency": "low|medium|high"
}

Focus on:
- Common Kerala crops: coconut, rice, rubber, pepper, cardamom, ginger, banana
- Organic/eco-friendly treatments when possible
- Government-approved pesticides/fungicides available in Kerala
- Cultural practices suitable for Kerala's monsoon climate
- Prevention methods specific to tropical conditions`
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this plant image for diseases, pests, or health issues. Provide diagnosis with confidence level, severity, and treatment recommendations suitable for Kerala farming conditions."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 1000,
    });

    const result = JSON.parse(response.choices[0].message.content!);
    
    return {
      disease: result.disease || "Unknown condition",
      malayalam: result.malayalam || "അജ്ഞാത അവസ്ഥ",
      confidence: Math.max(0, Math.min(100, result.confidence || 0)),
      severity: ['mild', 'moderate', 'severe'].includes(result.severity) ? result.severity : 'moderate',
      treatment: result.treatment || "Consult local agricultural extension officer",
      malayalamTreatment: result.malayalamTreatment || "പ്രാദേശിക കൃഷി വിപുലീകരണ ഉദ്യോഗസ്ഥനെ സമീപിക്കുക",
      preventionTips: Array.isArray(result.preventionTips) ? result.preventionTips : [],
      urgency: ['low', 'medium', 'high'].includes(result.urgency) ? result.urgency : 'medium'
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to analyze plant image');
  }
}

export async function getCropAdvice(cropType: string, issue: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an agricultural expert specializing in Kerala farming. Provide practical, actionable advice for crop management issues. Include both English and Malayalam translations for key recommendations."
        },
        {
          role: "user",
          content: `I'm growing ${cropType} in Kerala and facing this issue: ${issue}. Please provide specific advice for Kerala's climate and soil conditions.`
        }
      ],
      max_tokens: 500,
    });

    return response.choices[0].message.content || "Please consult your local agricultural extension officer.";
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to get crop advice');
  }
}