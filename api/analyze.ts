import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are an expert e-waste environmental hazard analyst aligned with India's E-Waste (Management) Rules 2022 and CPCB Extended Producer Responsibility (EPR) guidelines.

Analyze the provided e-waste item image or text description. 
IMPORTANT: Return ONLY valid JSON (no markdown, no code fences, just raw JSON).

Your response must strictly match this schema:
{
  "device_name": "string - identified device name (e.g., 'Samsung Galaxy S10 PCB' or 'Alkaline Battery')",
  "device_subtitle": "string - technical subtitle like 'Multilayer' or '65W AC Adapter'",
  "detected_item_description": "string - a brief friendly 1-2 sentence description explaining exactly what you see in the image and its general state.",
  "toxicity_level": "High" | "Medium" | "Low",
  "toxicity_score": number between 0-10,
  "cpcb_category": "string - official CPCB equipment category name",
  "cpcb_code": "string - like ITEW1, ITEW2, CEEW1, etc.",
  "heavy_metals": [
    {
      "name": "string - element name",
      "chemical_symbol": "string - like Pb, Hg, Cd, Br",
      "atomic_number": number,
      "amount_per_unit": "string - approximate amount per unit",
      "source_component": "string - where found in the device",
      "health_impact": "string - health/environmental impact",
      "risk_level": "High Risk" | "Severe" | "Hazard" | "Moderate" | "Low",
      "icon": "string - material symbols icon name"
    }
  ],
  "urban_mining_yield": {
    "gold_grams": "string - estimated grams per 1000 units",
    "copper_kg": "string - estimated kg per 1000 units",
    "silver_kg": "string - estimated kg per 1000 units",
    "cobalt_kg": "string - estimated kg per 1000 units"
  },
  "disposal_advisory": "string - formal advisory about safe disposal",
  "heavy_metal_percentage": number,
  "bfr_percentage": number,
  "solvent_percentage": number,
  "is_consumer_item": "boolean - true if the item is a complete sold consumer product (e.g. whole laptop, phone), false if component/scrap",
  "brand_model": "string - specific brand and model if identifiable, otherwise null",
  "estimated_resale_value_inr": "number - estimated secondhand resale value in INR if it's an identifiable consumer item, otherwise null"
}

Always include at least Lead, Mercury, Cadmium, and BFRs when applicable. If it is a whole consumer device with a recognized brand/model, provide a realistic estimated resale value.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Setup CORS if needed for local testing outside Vercel Dev
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    // Fallback parsing just in case Vercel missed the application/json header
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid JSON body' });
      }
    }

    const { image, text } = body || {};
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'Configuration Error', details: 'GEMINI_API_KEY is not configured in Vercel Environment Variables' });
    }

    // Dynamically fetch available models for this specific API key to avoid 404s
    const modelsReq = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const modelsData = await modelsReq.json();
    
    if (!modelsReq.ok) {
      throw new Error(`Failed to fetch models: ${modelsData.error?.message || 'Unknown error'}`);
    }

    const availableModels = modelsData.models
      .filter((m: any) => m.supportedGenerationMethods?.includes("generateContent"))
      .map((m: any) => m.name.replace('models/', ''));

    // Priority list of vision-capable models (prioritizing stable latest and 3.x series)
    const preferredModels = [
      'gemini-3.8-flash',
      'gemini-3.7-flash',
      'gemini-3.6-flash',
      'gemini-3.5-flash',
      'gemini-3.1-pro-preview',
      'gemini-3.1-flash-image',
      'gemini-3.1-flash-lite',
      'gemini-3-pro-image',
      'gemini-3-flash-preview',
      'gemini-flash-latest',
      'gemini-2.5-flash-image',
      'gemini-2.5-flash',
      'gemini-pro-latest'
    ];
    
    const candidateModels = preferredModels.filter(pm => availableModels.includes(pm));
    
    if (candidateModels.length === 0) {
      throw new Error("No compatible vision models found for this API key. Available models: " + availableModels.join(', '));
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    let parsed: any = null;
    let lastError: any = null;
    let finalModelUsed = '';

    for (const selectedModel of candidateModels) {
      try {
        finalModelUsed = selectedModel;
        const isLegacyVision = selectedModel.includes('pro-vision');
        
        const modelOptions: any = { model: selectedModel };
        // Legacy models don't support systemInstruction
        if (!isLegacyVision) {
          modelOptions.systemInstruction = SYSTEM_PROMPT;
        }
        const model = genAI.getGenerativeModel(modelOptions);
        
        let parts: any[] = [];
        
        if (image) {
          // Robust base64 extraction
          const matches = image.match(/^data:(image\/\w+);base64,(.+)$/);
          let base64Data = image;
          let mimeType = 'image/jpeg';
          
          if (matches && matches.length === 3) {
            mimeType = matches[1];
            base64Data = matches[2];
          } else {
            base64Data = image.replace(/^data:image\/\w+;base64,/, '');
          }
          
          const promptText = isLegacyVision 
            ? `${SYSTEM_PROMPT}\n\nAnalyze this e-waste item image and identify exactly what it is. Follow the JSON schema strictly.`
            : 'Analyze this e-waste item image and identify exactly what it is. Follow the JSON schema strictly.';

          parts.push({ inlineData: { data: base64Data, mimeType } });
          parts.push({ text: promptText });
        } else if (text) {
          const promptText = isLegacyVision 
            ? `${SYSTEM_PROMPT}\n\nAnalyze this e-waste item: "${text}". Follow the JSON schema strictly.`
            : `Analyze this e-waste item: "${text}". Follow the JSON schema strictly.`;
          parts.push({ text: promptText });
        } else {
          return res.status(400).json({ error: 'Bad Request', details: 'No image or text provided' });
        }

        const generationConfig: any = { temperature: 0.2 };
        // Legacy models don't support responseMimeType
        if (!isLegacyVision) {
          generationConfig.responseMimeType = 'application/json';
        }

        const result = await model.generateContent({
          contents: [{ role: 'user', parts }],
          generationConfig
        });

        let responseText = result.response.text();
        // Clean up markdown blocks if the model ignored responseMimeType
        responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        parsed = JSON.parse(responseText);
        break; // Success! Break out of the fallback loop.
      } catch (err: any) {
        console.warn(`Model ${selectedModel} failed:`, err.message);
        lastError = err;
        // Continue to the next fallback model in candidateModels
      }
    }

    if (!parsed) {
      throw new Error(`All available models failed. Last error from ${finalModelUsed}: ${lastError?.message || 'Unknown error'}`);
    }
    
    parsed.sample_id = `#PCB-${Math.floor(1000 + Math.random() * 9000)}`;
    parsed.scanned_at = `Today, ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    parsed.image_url = image;

    res.status(200).json(parsed);
  } catch (error: any) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ 
      error: 'Failed to analyze item',
      details: error.message || String(error)
    });
  }
}
