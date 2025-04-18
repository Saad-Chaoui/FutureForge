import fetch from "node-fetch";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyBTgh8nnshH9KuEOy7bTBagjfptP1GS_8I";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

// System prompt to define the assistant's behavior
const SYSTEM_PROMPT = `
You are an AI assistant for a company called FutureLabs AI that specializes in cutting-edge AI solutions. 
Your responses should be helpful, concise, and maintain a professional but friendly tone. 
Emphasize the futuristic nature of the company's technology.

Key information about FutureLabs AI:
- Offers AI-powered automation, security, and analytics solutions
- Features include neural integration, predictive analytics, and enterprise security
- Targets businesses looking to transform their operations with AI
- Has a modern, clean, minimalist aesthetic with dark-mode interface
`;

// Create contextual prompts for different sections of the site
const SECTION_CONTEXTS: Record<string, string> = {
  hero: "Focus on introducing the company vision and mission. Mention how FutureLabs AI is revolutionizing business operations.",
  features: "Provide details about specific features like Smart Automation, Advanced Security, and Predictive Analysis. Be ready to explain technical aspects.",
  "ai-demo": "Help users understand how to interact with the AI demo. Suggest example questions they can ask.",
  testimonials: "Discuss customer success stories and satisfaction rates. Mention industries that have benefited most from our solutions.",
  contact: "Assist with contact form questions, demo scheduling, and general inquiries about getting started."
};

/**
 * Handles chat messages using Gemini API
 */
export async function handleGeminiChat(message: string, context: string = "general"): Promise<string> {
  try {
    // Build the prompt with relevant context
    const contextPrompt = SECTION_CONTEXTS[context] || "";
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { 
                text: `${SYSTEM_PROMPT}\n\n${contextPrompt}\n\nUser message: ${message}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Gemini API error:", data);
      return "I'm sorry, I encountered an error processing your request. Please try again later.";
    }
    
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
}

/**
 * Gets section-specific welcome messages for the AI assistant
 */
export async function getGeminiWelcomeMessage(section: string): Promise<string> {
  // Default welcome messages for each section
  const defaultMessages: Record<string, string> = {
    hero: "Welcome! I can help you learn about how FutureLabs AI is revolutionizing business operations. What would you like to know about our platform?",
    features: "Looking for specific features? I can help you find the right solutions for your use case.",
    "ai-demo": "Try different prompts with our AI demo! I can show you how to get the most out of our technology.",
    testimonials: "Want to hear more success stories? I can share case studies and ROI data for your specific industry.",
    contact: "Need quick assistance? I can help you schedule a demo or answer questions about our services."
  };
  
  // Use default message if Gemini API fails
  try {
    const prompt = `
      ${SYSTEM_PROMPT}
      
      Create a short, friendly welcome message (40-60 words) for an AI assistant widget on the "${section}" 
      section of the FutureLabs AI website. The message should offer help relevant to this section.
    `;
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return defaultMessages[section] || defaultMessages.hero;
    }
    
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    return defaultMessages[section] || defaultMessages.hero;
  }
}
