
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getFamilyGrowthAdvice(familyName: string, xp: number, level: number) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `My SocialVerse family is called "${familyName}". We have ${xp} XP and are at Level ${level}. Give me 3 short, creative gaming-style tips on how we can reach the next reward tier faster. Keep the tone motivational and focused on "SocialVerse" activities like gifting, voice rooms, and games.`,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });
    return response.text || "Keep playing and sharing gifts to grow your family!";
  } catch (error) {
    console.error("Gemini advice error:", error);
    return "The stars are cloudy. Keep gifting to earn more XP!";
  }
}
