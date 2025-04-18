import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

interface UseAIAssistantOptions {
  context?: string;
  initialMessages?: Message[];
}

export default function useAIAssistant(options: UseAIAssistantOptions = {}) {
  const { context = "general", initialMessages = [] } = options;
  
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  
  // Send message mutation
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (content: string) => {
      return await apiRequest("POST", "/api/ai/message", { 
        content,
        context
      });
    },
    onMutate: (content) => {
      // Optimistic update - add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        role: "user"
      };
      
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);
    },
    onSuccess: (data) => {
      setIsTyping(false);
      
      if (data && data.response) {
        // Add assistant message
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          content: data.response,
          role: "assistant"
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      }
    },
    onError: () => {
      setIsTyping(false);
      
      // Add error message from assistant
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "I'm sorry, I couldn't process your request. Please try again later.",
        role: "assistant"
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  });
  
  const resetConversation = () => {
    setMessages([]);
  };
  
  return {
    messages,
    isTyping,
    isPending,
    sendMessage,
    resetConversation
  };
}
