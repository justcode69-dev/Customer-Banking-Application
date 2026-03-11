import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

const getClient = (): GoogleGenAI => {
  const apiKey = process.env.API_KEY || '';
  if (!apiKey) {
    console.error("API Key is missing. Chat features will not work.");
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = async () => {
  try {
    const ai = getClient();
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are Nova, the AI banking assistant for Customer Banking Application. 
        You are helpful, professional, and secure.
        You can answer questions about:
        - Account balances (simulate checking mock data in INR)
        - Loan interest rates (Personal: ~11%, Home: ~8.5%, Car: ~8.85%)
        - Investment options (Fixed Deposits, Nifty 50 Mutual Funds, Sovereign Gold Bonds)
        - How to perform transfers (NEFT, IMPS, UPI, RTGS)
        
        If a user asks for personal account details, remind them this is a demo environment but in a real app, you would verify their identity first.
        Use "Rupees" or "₹" when referring to currency.
        Keep answers concise and friendly.`,
      },
    });
    return true;
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    return false;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }
  
  if (!chatSession) {
    return "I'm having trouble connecting to the bank servers right now. Please try again later.";
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently experiencing high traffic. Please try again in a moment.";
  }
};