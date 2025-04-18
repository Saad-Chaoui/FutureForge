import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { motion, AnimatePresence } from "framer-motion";

interface AIAssistantProps {
  section: string;
  onClose: () => void;
}

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

export default function AIAssistant({ section, onClose }: AIAssistantProps) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get section-specific welcome message
  const { data: welcomeMessage } = useQuery({
    queryKey: [`/api/ai/welcome-message/${section}`],
    onSuccess: (data) => {
      if (data && data.message) {
        setMessages([{
          id: "welcome",
          content: data.message,
          role: "assistant"
        }]);
      }
    },
  });
  
  // Send message mutation
  const { mutate: sendMessage } = useMutation({
    mutationFn: async (content: string) => {
      return await apiRequest("POST", "/api/ai/message", { 
        content,
        context: section
      });
    },
    onSuccess: (data) => {
      setIsTyping(false);
      if (data && data.response) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          content: data.response,
          role: "assistant"
        }]);
      }
    },
    onError: () => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: "I'm sorry, I couldn't process your request. Please try again later.",
        role: "assistant"
      }]);
    }
  });
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user"
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Send to API
    sendMessage(inputValue);
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Get icon and colors based on section
  const getSectionTheme = (section: string) => {
    switch(section) {
      case "hero":
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[hsl(var(--neon-cyan))]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          ),
          color: "neon-cyan"
        };
      case "features":
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[hsl(var(--neon-magenta))]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          ),
          color: "neon-magenta"
        };
      case "ai-demo":
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[hsl(var(--neon-violet))]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          ),
          color: "neon-violet"
        };
      case "testimonials":
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[hsl(var(--neon-cyan))]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          ),
          color: "neon-cyan"
        };
      case "contact":
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[hsl(var(--neon-magenta))]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          ),
          color: "neon-magenta"
        };
      default:
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[hsl(var(--neon-cyan))]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          ),
          color: "neon-cyan"
        };
    }
  };

  const theme = getSectionTheme(section);
  
  return (
    <motion.div 
      className="ai-widget fixed bottom-8 right-8 w-80 z-30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <button 
        className="absolute top-2 right-2 text-gray-400 hover:text-white z-10 p-1"
        onClick={onClose}
        aria-label="Close assistant"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="p-4 border-b border-[hsl(var(--dark-300))]">
        <div className="flex items-center mb-2">
          <div className={`w-8 h-8 rounded-full bg-[hsl(var(--${theme.color})_/_0.2)] flex items-center justify-center mr-3`}>
            {theme.icon}
          </div>
          <p className="text-sm font-medium">AI Assistant</p>
        </div>
        <p className="text-xs text-gray-400">
          I can answer questions about this section or help you navigate the site.
        </p>
      </div>
      
      <div className="p-4 max-h-60 overflow-y-auto">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`mb-3 ${message.role === "user" ? "flex justify-end" : "flex"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {message.role === "assistant" && (
                <div className={`w-6 h-6 rounded-full bg-[hsl(var(--${theme.color})_/_0.2)] flex items-center justify-center shrink-0 mr-2`}>
                  {theme.icon}
                </div>
              )}
              <div 
                className={`rounded-lg p-2 text-sm max-w-[85%] ${
                  message.role === "user" 
                    ? `bg-[hsl(var(--${theme.color})_/_0.1)] text-white` 
                    : "bg-[hsl(var(--dark-300))] text-gray-200"
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div 
              className="flex mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={`w-6 h-6 rounded-full bg-[hsl(var(--${theme.color})_/_0.2)] flex items-center justify-center shrink-0 mr-2`}>
                {theme.icon}
              </div>
              <div className="bg-[hsl(var(--dark-300))] rounded-lg p-2 max-w-[85%] flex items-center">
                <div className="dot-pulse"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t border-[hsl(var(--dark-300))]">
        <form onSubmit={handleSubmit} className="flex items-center">
          <Input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-[hsl(var(--dark-300))] text-white border border-[hsl(var(--dark-200))] rounded-l-md text-sm py-1 focus:outline-none focus:border-[hsl(var(--neon-cyan)_/_0.5)]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
          />
          <Button
            type="submit"
            className={`bg-[hsl(var(--${theme.color}))] text-black rounded-r-md p-1 hover:bg-[hsl(var(--${theme.color})_/_0.8)] transition-colors duration-300`}
            disabled={isTyping}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
