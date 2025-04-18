import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { handleGeminiChat, getGeminiWelcomeMessage } from "./services/gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  
  // AI Chat API
  app.get("/api/chat/history", (req, res) => {
    // Start with sample messages for demonstration
    const initialMessages = [
      {
        id: "1",
        role: "assistant",
        content: "Hello! I'm your AI assistant. I can help you learn about our technology, answer questions, or assist with tasks. What would you like to know today?"
      }
    ];
    
    res.json(initialMessages);
  });
  
  app.post("/api/chat/message", async (req, res) => {
    try {
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ message: "Message content is required" });
      }
      
      // Process with Gemini
      const response = await handleGeminiChat(content);
      
      res.json({
        id: Date.now().toString(),
        role: "assistant",
        content: response
      });
    } catch (error) {
      console.error("Error in chat message:", error);
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });
  
  // AI Assistant API
  app.get("/api/ai/welcome-message/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const message = await getGeminiWelcomeMessage(section);
      
      res.json({ message });
    } catch (error) {
      console.error("Error getting welcome message:", error);
      res.status(500).json({ message: "Failed to get welcome message" });
    }
  });
  
  app.post("/api/ai/message", async (req, res) => {
    try {
      const { content, context } = req.body;
      
      if (!content) {
        return res.status(400).json({ message: "Message content is required" });
      }
      
      // Process with Gemini
      const response = await handleGeminiChat(content, context);
      
      res.json({ response });
    } catch (error) {
      console.error("Error processing AI message:", error);
      res.status(500).json({ message: "Failed to process AI message" });
    }
  });
  
  // Recommendations API
  app.get("/api/recommendations", (req, res) => {
    // Simulated recommendations based on visitor behavior
    const recommendations = [
      {
        id: "1",
        type: "new",
        title: "Neural Integration Guide",
        description: "Learn how to integrate our neural networks with your existing systems"
      },
      {
        id: "2",
        type: "popular",
        title: "Machine Learning Masterclass",
        description: "A comprehensive guide to our ML algorithms and applications"
      },
      {
        id: "3",
        type: "trending",
        title: "Automation Workflow Templates",
        description: "Ready-to-use templates to jumpstart your automation journey"
      }
    ];
    
    res.json(recommendations);
  });
  
  // Contact form submission
  app.post("/api/contact", (req, res) => {
    try {
      const { name, email, company, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ message: "Name, email and message are required" });
      }
      
      // Normally we would store this or send an email
      console.log("Contact form submission:", { name, email, company, message });
      
      res.json({ success: true, message: "Message received" });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ message: "Failed to process contact form" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
