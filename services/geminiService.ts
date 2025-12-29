
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getDailySparks = async (interests: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Interests: ${interests.join(', ')}. Generate 3 super catchy, short "content sparks" (ideas for a 15-second clip or a single photo) that someone could post to their community. Make them sound exciting and very Gen Z. Output JSON.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              emoji: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return [
      { title: "Desk Setup Tour", description: "Show off your aesthetic workspace vibe.", emoji: "💻" },
      { title: "Bug Fix Dance", description: "Celebrate that one line of code that finally worked.", emoji: "💃" }
    ];
  }
};

export const generateCatchyCaption = async (draft: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Transform this boring update into a viral-style short caption with high energy and emojis: "${draft}"`,
    });
    return response.text;
  } catch (error) {
    return draft;
  }
};

export const getCommunityVibeDescription = async (communityName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Describe the current "vibe" and "trending topic" for a community called ${communityName} in exactly one catchy sentence.`,
    });
    return response.text;
  } catch (error) {
    return "The energy is high and the builds are legendary! 🔥";
  }
};

export interface ResearchResult {
  text: string;
  sources: { title: string; uri: string }[];
}

export const performDeepResearch = async (topic: string): Promise<ResearchResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Perform a deep research on the following topic for a high-tech community: "${topic}". Provide a detailed, insightful summary and mention key upcoming trends. Use Google Search to get real-time info.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No research findings found.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks
      .filter((c: any) => c.web)
      .map((c: any) => ({
        title: c.web.title || 'Source',
        uri: c.web.uri,
      }));

    return { text, sources };
  } catch (error) {
    console.error("Research failed:", error);
    return {
      text: "Research pipeline experienced a glitch. The vibe was too strong for the servers.",
      sources: []
    };
  }
};

export const getBackendInsight = async (activeUsers: number) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Given ${activeUsers} active users on a GKE-backed social network, provide a short, tech-heavy "System Optimization Log" message. Mention scaling, pods, or latency. Make it sound like a hacker command center.`,
    });
    return response.text;
  } catch {
    return "Pods optimized. Scaling cluster to handle peak vibe intensity.";
  }
};
