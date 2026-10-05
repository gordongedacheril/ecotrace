import type { AnalysisResult } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const SYSTEM_PROMPT = `You are an expert e-waste environmental hazard analyst aligned with India's E-Waste (Management) Rules 2022 and CPCB Extended Producer Responsibility (EPR) guidelines.

Analyze the provided e-waste item image or text description. Return ONLY valid JSON (no markdown, no code fences) containing:
{
  "device_name": "string - identified device name",
  "device_subtitle": "string - technical subtitle like 'Multilayer' or '65W AC Adapter'",
  "toxicity_level": "High" | "Medium" | "Low",
  "toxicity_score": number between 0-10,
  "cpcb_category": "string - official CPCB equipment category name",
  "cpcb_code": "string - like ITEW1, ITEW2, CEEW1, etc.",
  "heavy_metals": [
    {
      "name": "string - element name",
      "chemical_symbol": "string - like Pb, Hg, Cd",
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
  "solvent_percentage": number
}

Be accurate with real-world e-waste toxicology data. Always include at least Lead, Mercury, Cadmium, and BFRs when applicable.`;

export async function analyzeEWaste(
  input: { image?: string; text?: string },
): Promise<AnalysisResult> {
  if (!GEMINI_API_KEY) {
    // Return mock data when no API key configured
    const { default: sampleData } = await import('../data/sampleAnalysis');
    return sampleData;
  }

  const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];

  if (input.image) {
    // Remove data URL prefix to get raw base64
    const base64Data = input.image.replace(/^data:image\/\w+;base64,/, '');
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Data,
      },
    });
    parts.push({ text: 'Analyze this e-waste item image. Identify the device and provide full hazard analysis.' });
  } else if (input.text) {
    parts.push({ text: `Analyze this e-waste item: "${input.text}". Provide full hazard analysis as if you were examining it.` });
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ parts }],
        generationConfig: {
          temperature: 0.3,
          topP: 0.8,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json',
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) throw new Error('No response from Gemini API');

  const parsed = JSON.parse(text);
  
  const now = new Date();
  return {
    ...parsed,
    sample_id: `#PCB-${Math.floor(1000 + Math.random() * 9000)}`,
    scanned_at: `Today, ${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`,
    image_url: input.image || undefined,
  };
}

export async function analyzeWithFallback(
  input: { image?: string; text?: string },
): Promise<AnalysisResult> {
  try {
    return await analyzeEWaste(input);
  } catch (error) {
    console.warn('Gemini API failed, using sample data:', error);
    const { default: sampleData } = await import('../data/sampleAnalysis');
    return sampleData;
  }
}
